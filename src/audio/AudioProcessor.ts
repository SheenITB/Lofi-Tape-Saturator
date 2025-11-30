/**
 * LOFI TAPE - Complete DSP Chain
 * Signal Flow: INPUT → DRIVE → TONE → MPC → RESAMPLER → WOW → FLUTTER → LOW PASS → OUTPUT GAIN → CLIPPER → OUTPUT
 */

export class AudioProcessor {
  private sampleRate: number;
  // Neve 1073 Drive Stage
  private driveAmount: number = 0;
  
  // Studer A800 Tone Stage
  private toneAmount: number = 0;
  private toneFilter: BiquadFilterNode | null = null;
  
  // MPC Bit Reduction
  private bitDepth: number = 16;
  
  // Resampler (Frequency Reduction)
  private resampleRate: number = 1.0;
  
  // Wow & Flutter
  private wowAmount: number = 0;
  private flutterAmount: number = 0;
  private wowPhase: number = 0;
  private flutterPhase: number = 0;
  
  // Low Pass Filter
  private lowPassCutoff: number = 20000;
  private lowPassFilter: BiquadFilterNode | null = null;
  
  // Output gain (post-LPF)
  private outputGainLinear: number = 1.0;
  
  // Larva Gold Clipper (3 modes)
  private clipperMode: 'soft' | 'medium' | 'hard' = 'soft';
  private clipperThreshold: number = 0.8;
  private clipperEnabled: boolean = false;

  // Anti-alias smoothing
  private antiAliasEnabled: boolean = false;
  private antiAliasState: number = 0;
  
  // Audio Context
  private audioContext: AudioContext | null = null;
  private inputNode: GainNode | null = null;
  private outputNode: GainNode | null = null;
  
  // VU Meter feedback (reads DRIVE output)
  private vuMeterLevel: number = 0;
  
  constructor(sampleRate: number = 44100) {
    this.sampleRate = sampleRate;
  }

  /**
   * Initialize Audio Context and nodes
   */
  async initialize(): Promise<void> {
    this.audioContext = new AudioContext({ sampleRate: this.sampleRate });
    
    this.inputNode = this.audioContext.createGain();
    this.outputNode = this.audioContext.createGain();
    
    // Create filters
    this.toneFilter = this.audioContext.createBiquadFilter();
    this.toneFilter.type = 'lowshelf';
    this.toneFilter.frequency.value = 1000;
    
    this.lowPassFilter = this.audioContext.createBiquadFilter();
    this.lowPassFilter.type = 'lowpass';
    this.lowPassFilter.frequency.value = this.lowPassCutoff;
    this.lowPassFilter.Q.value = 0.707;
  }

  /**
   * STAGE 1: DRIVE - Neve 1073 Style Saturation
   * Warm, harmonic-rich saturation with transformer modeling
   */
  private processDrive(input: Float32Array): Float32Array {
    const output = new Float32Array(input.length) as Float32Array;
    const drive = 1 + (this.driveAmount * 9); // 1x to 10x gain
    
    for (let i = 0; i < input.length; i++) {
      let sample = input[i] * drive;
      
      // Neve 1073 transformer saturation curve
      // Soft knee compression with harmonic generation
      if (Math.abs(sample) > 0.7) {
        const sign = Math.sign(sample);
        const abs = Math.abs(sample);
        // Smooth saturation curve
        sample = sign * (0.7 + (abs - 0.7) * 0.3 * Math.tanh((abs - 0.7) * 3));
      }
      
      // Add subtle even harmonics (transformer character)
      sample += Math.sin(sample * Math.PI) * 0.05 * this.driveAmount;
      
      output[i] = sample;
      
      // Update VU meter (reads DRIVE output only)
      this.vuMeterLevel = Math.max(this.vuMeterLevel * 0.95, Math.abs(sample));
    }
    
    return output;
  }

  /**
   * STAGE 2: TONE - Studer A800 Tape Character
   * Tape saturation with frequency-dependent compression
   */
  private processTone(input: Float32Array): Float32Array {
    const output = new Float32Array(input.length) as Float32Array;
    const tapeAmount = this.toneAmount;
    
    for (let i = 0; i < input.length; i++) {
      let sample = input[i];
      
      // Studer A800 tape saturation
      // Gentle compression with warmth
      const tapeGain = 1 + (tapeAmount * 0.5);
      sample *= tapeGain;
      
      // Soft tape saturation curve
      if (Math.abs(sample) > 0.5) {
        const sign = Math.sign(sample);
        const abs = Math.abs(sample);
        // Tape-style soft clipping
        sample = sign * (0.5 + (abs - 0.5) * Math.tanh((abs - 0.5) * 2));
      }
      
      // Add tape-style high frequency roll-off simulation
      if (i > 0) {
        sample = sample * 0.7 + output[i - 1] * 0.3 * tapeAmount;
      }
      
      output[i] = sample;
    }
    
    return output;
  }

  /**
   * STAGE 3: MPC - Bit Reduction
   * Lo-fi digital quantization for vintage sampler sound
   */
  private processBitReduction(input: Float32Array): Float32Array {
    const output = new Float32Array(input.length) as Float32Array;
    const levels = Math.pow(2, this.bitDepth);
    const step = 2.0 / levels;
    
    for (let i = 0; i < input.length; i++) {
      // Quantize to bit depth
      const quantized = Math.round(input[i] / step) * step;
      output[i] = Math.max(-1, Math.min(1, quantized));
    }
    
    return output;
  }

  /**
   * STAGE 4: RESAMPLER - Frequency Reduction
   * Sample rate reduction for lo-fi digital artifacts
   */
  private processResampler(input: Float32Array): Float32Array {
    const output = new Float32Array(input.length) as Float32Array;
    const downsampleFactor = 1.0 / this.resampleRate;
    
    let holdSample = 0;
    let sampleCounter = 0;
    
    for (let i = 0; i < input.length; i++) {
      sampleCounter += downsampleFactor;
      
      if (sampleCounter >= 1.0) {
        holdSample = input[i];
        sampleCounter -= 1.0;
      }
      
      output[i] = holdSample;
    }
    
    return output;
  }

  /**
   * STAGE 5: WOW - Slow pitch variations (tape speed fluctuations)
   * Low frequency modulation simulating tape motor instability
   */
  private processWow(input: Float32Array): Float32Array {
    const output = new Float32Array(input.length) as Float32Array;
    const wowFreq = 0.5; // Hz - slow variation
    const wowDepth = this.wowAmount * 0.002; // Max 0.2% pitch variation
    
    for (let i = 0; i < input.length; i++) {
      // Generate LFO for wow
      this.wowPhase += (2 * Math.PI * wowFreq) / this.sampleRate;
      if (this.wowPhase > 2 * Math.PI) this.wowPhase -= 2 * Math.PI;
      
      const modulation = Math.sin(this.wowPhase) * wowDepth;
      const readPos = i * (1 + modulation);
      const readIndex = Math.floor(readPos);
      
      if (readIndex >= 0 && readIndex < input.length - 1) {
        // Linear interpolation
        const frac = readPos - readIndex;
        output[i] = input[readIndex] * (1 - frac) + input[readIndex + 1] * frac;
      } else {
        output[i] = input[i];
      }
    }
    
    return output;
  }

  /**
   * STAGE 6: FLUTTER - Fast pitch variations
   * High frequency modulation simulating tape head/capstan irregularities
   */
  private processFlutter(input: Float32Array): Float32Array {
    const output = new Float32Array(input.length) as Float32Array;
    const flutterFreq = 8; // Hz - fast variation
    const flutterDepth = this.flutterAmount * 0.001; // Max 0.1% pitch variation
    
    for (let i = 0; i < input.length; i++) {
      // Generate LFO for flutter
      this.flutterPhase += (2 * Math.PI * flutterFreq) / this.sampleRate;
      if (this.flutterPhase > 2 * Math.PI) this.flutterPhase -= 2 * Math.PI;
      
      const modulation = Math.sin(this.flutterPhase) * flutterDepth;
      const readPos = i * (1 + modulation);
      const readIndex = Math.floor(readPos);
      
      if (readIndex >= 0 && readIndex < input.length - 1) {
        const frac = readPos - readIndex;
        output[i] = input[readIndex] * (1 - frac) + input[readIndex + 1] * frac;
      } else {
        output[i] = input[i];
      }
    }
    
    return output;
  }

  /**
   * STAGE 7: LOW PASS FILTER
   * Frequency-dependent filtering for tone shaping
   */
  private processLowPass(input: Float32Array): Float32Array {
    // This would ideally use the Web Audio API BiquadFilter
    // For now, simple one-pole filter implementation
    const output = new Float32Array(input.length) as Float32Array;
    const cutoffNorm = this.lowPassCutoff / (this.sampleRate / 2);
    const a = Math.exp(-2 * Math.PI * cutoffNorm);
    
    output[0] = input[0] * (1 - a);
    
    for (let i = 1; i < input.length; i++) {
      output[i] = input[i] * (1 - a) + output[i - 1] * a;
    }
    
    return output;
  }

  /**
   * STAGE 8: OUTPUT GAIN
   * Post-filter gain staging before clipper
   */
  private processOutputGain(input: Float32Array): Float32Array {
    const output = new Float32Array(input.length) as Float32Array;
    const gain = this.outputGainLinear;

    for (let i = 0; i < input.length; i++) {
      output[i] = input[i] * gain;
    }

    return output;
  }

  /**
   * STAGE 9: CLIPPER - Larva Gold Style (3 modes)
   * Final stage clipping/limiting with three different characters
   */
  private processClipper(input: Float32Array): Float32Array {
    const output = new Float32Array(input.length) as Float32Array;
    const threshold = this.clipperThreshold;
    
    for (let i = 0; i < input.length; i++) {
      let sample = input[i];
      if (!this.clipperEnabled) {
        output[i] = sample;
        continue;
      }
      const abs = Math.abs(sample);
      const sign = Math.sign(sample);
      
      if (abs > threshold) {
        switch (this.clipperMode) {
          case 'soft':
            // Soft knee compression
            sample = sign * (threshold + (abs - threshold) * Math.tanh((abs - threshold) * 2) * 0.5);
            break;
            
          case 'medium':
            // Medium saturation
            sample = sign * (threshold + (abs - threshold) * Math.tanh((abs - threshold) * 4) * 0.3);
            break;
            
          case 'hard':
            // Hard clipping
            sample = sign * Math.min(abs, threshold * 1.1);
            break;
        }
      }
      
      output[i] = sample;
    }
    
    return output;
  }

  /**
   * MASTER PROCESS - Full DSP Chain
   * Processes audio through all stages in order
   */
  processBuffer(inputBuffer: Float32Array): Float32Array {
  let buffer = new Float32Array(inputBuffer);
    
    // SIGNAL CHAIN
    // @ts-ignore - TypeScript strict buffer typing
    buffer = this.processDrive(buffer);        // STAGE 1: Neve 1073 Drive
    // @ts-ignore
    buffer = this.processTone(buffer);         // STAGE 2: Studer A800 Tone
    // @ts-ignore
    buffer = this.processBitReduction(buffer); // STAGE 3: MPC Bit Reduction
    // @ts-ignore
    buffer = this.processResampler(buffer);    // STAGE 4: Resampler
    // @ts-ignore
    buffer = this.processWow(buffer);          // STAGE 5: Wow
    // @ts-ignore
    buffer = this.processFlutter(buffer);      // STAGE 6: Flutter
    // @ts-ignore
  buffer = this.processLowPass(buffer);      // STAGE 7: Low Pass
  // @ts-ignore
  buffer = this.processOutputGain(buffer);   // STAGE 8: Output Gain
    // @ts-ignore
    buffer = this.processClipper(buffer);      // STAGE 9: Clipper

    if (this.antiAliasEnabled) {
      // One-pole smoothing to tame high-frequency folding when downsampling
      const filtered = new Float32Array(buffer.length);
      const cutoff = Math.min(12000, (this.sampleRate * 0.45));
      const alpha = Math.exp((-2 * Math.PI * cutoff) / this.sampleRate);
      let state = this.antiAliasState;
      for (let i = 0; i < buffer.length; i++) {
        state = alpha * state + (1 - alpha) * buffer[i];
        filtered[i] = state;
      }
      this.antiAliasState = state;
      buffer.set(filtered);
    } else if (buffer.length > 0) {
      this.antiAliasState = buffer[buffer.length - 1];
    }
    
    return buffer;
  }

  // === PARAMETER SETTERS ===
  
  setDrive(value: number): void {
    this.driveAmount = Math.max(0, Math.min(1, value));
  }
  
  setTone(value: number): void {
    this.toneAmount = Math.max(0, Math.min(1, value));
  }
  
  setBitDepth(bits: number): void {
    this.bitDepth = Math.max(4, Math.min(16, bits));
  }
  
  setResampleRate(rate: number): void {
    this.resampleRate = Math.max(0.1, Math.min(1, rate));
  }
  
  setWow(amount: number): void {
    this.wowAmount = Math.max(0, Math.min(1, amount));
  }
  
  setFlutter(amount: number): void {
    this.flutterAmount = Math.max(0, Math.min(1, amount));
  }
  
  setLowPass(frequency: number): void {
    this.lowPassCutoff = Math.max(200, Math.min(20000, frequency));
    if (this.lowPassFilter) {
      this.lowPassFilter.frequency.value = this.lowPassCutoff;
    }
  }
  
  setOutputGainDb(db: number): void {
    const clampedDb = Math.max(-24, Math.min(12, db));
    this.outputGainLinear = Math.pow(10, clampedDb / 20);
  }
  
  setClipperMode(mode: 'soft' | 'medium' | 'hard'): void {
    this.clipperMode = mode;
  }
  
  setClipperThreshold(threshold: number): void {
    this.clipperThreshold = Math.max(0.1, Math.min(1, threshold));
  }

  setClipperEnabled(enabled: boolean): void {
    this.clipperEnabled = enabled;
  }

  setAntiAliasEnabled(enabled: boolean): void {
    this.antiAliasEnabled = enabled;
    if (!enabled) {
      this.antiAliasState = 0;
    }
  }
  
  // === GETTERS ===
  
  getVUMeterLevel(): number {
    return this.vuMeterLevel;
  }
  
  getAudioContext(): AudioContext | null {
    return this.audioContext;
  }
  
  getInputNode(): GainNode | null {
    return this.inputNode;
  }
  
  getOutputNode(): GainNode | null {
    return this.outputNode;
  }
  
  // === CLEANUP ===
  
  dispose(): void {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Export singleton instance
export const audioProcessor = new AudioProcessor();
