import { useEffect, useState, useCallback } from 'react';
import { audioProcessor } from '../audio/AudioProcessor';

interface AudioProcessorState {
  isInitialized: boolean;
  isProcessing: boolean;
  vuLevel: number;
  error: string | null;
}

export function useAudioProcessor() {
  const [state, setState] = useState<AudioProcessorState>({
    isInitialized: false,
    isProcessing: false,
    vuLevel: 0,
    error: null
  });

  // Initialize audio processor
  useEffect(() => {
    const init = async () => {
      try {
        await audioProcessor.initialize();
        setState(prev => ({ ...prev, isInitialized: true }));
        console.log('🎵 Audio Processor initialized');
      } catch (err) {
        setState(prev => ({ 
          ...prev, 
          error: err instanceof Error ? err.message : 'Failed to initialize audio'
        }));
        console.error('❌ Audio Processor initialization failed:', err);
      }
    };

    init();

    // VU meter update loop
    const vuInterval = setInterval(() => {
      const level = audioProcessor.getVUMeterLevel();
      setState(prev => ({ ...prev, vuLevel: level }));
    }, 50); // 20Hz update rate

    return () => {
      clearInterval(vuInterval);
      audioProcessor.dispose();
    };
  }, []);

  // Parameter control functions
  const setDrive = useCallback((value: number) => {
    audioProcessor.setDrive(value);
  }, []);

  const setTone = useCallback((value: number) => {
    audioProcessor.setTone(value);
  }, []);

  const setBitDepth = useCallback((bits: number) => {
    audioProcessor.setBitDepth(bits);
  }, []);

  const setResampleRate = useCallback((rate: number) => {
    audioProcessor.setResampleRate(rate);
  }, []);

  const setWow = useCallback((amount: number) => {
    audioProcessor.setWow(amount);
  }, []);

  const setFlutter = useCallback((amount: number) => {
    audioProcessor.setFlutter(amount);
  }, []);

  const setLowPass = useCallback((frequency: number) => {
    audioProcessor.setLowPass(frequency);
  }, []);

  const setOutputGainDb = useCallback((db: number) => {
    audioProcessor.setOutputGainDb(db);
  }, []);

  const setClipperMode = useCallback((mode: 'soft' | 'medium' | 'hard') => {
    audioProcessor.setClipperMode(mode);
  }, []);

  const setClipperEnabled = useCallback((enabled: boolean) => {
    audioProcessor.setClipperEnabled(enabled);
  }, []);

  const setClipperThreshold = useCallback((threshold: number) => {
    audioProcessor.setClipperThreshold(threshold);
  }, []);

  const setAntiAliasEnabled = useCallback((enabled: boolean) => {
    audioProcessor.setAntiAliasEnabled(enabled);
  }, []);

  // Process audio buffer
  const processBuffer = useCallback((buffer: Float32Array): Float32Array => {
    return audioProcessor.processBuffer(buffer);
  }, []);

  return {
    ...state,
    setDrive,
    setTone,
    setBitDepth,
    setResampleRate,
    setWow,
    setFlutter,
  setLowPass,
  setOutputGainDb,
    setClipperMode,
    setClipperEnabled,
    setClipperThreshold,
    setAntiAliasEnabled,
    processBuffer,
    audioContext: audioProcessor.getAudioContext(),
    inputNode: audioProcessor.getInputNode(),
    outputNode: audioProcessor.getOutputNode()
  };
}
