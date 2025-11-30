/**
 * AudioInputDemo - Test component for DSP processing
 * Allows testing with microphone input or audio file
 */

import React, { useState, useRef, useEffect } from 'react';
import { audioProcessor } from '../audio/AudioProcessor';

export const AudioInputDemo: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [inputSource, setInputSource] = useState<'mic' | 'file'>('mic');
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorNodeRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startMicrophoneInput = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });
      streamRef.current = stream;

      // Get or create audio context
      const ctx = audioProcessor.getAudioContext();
      if (!ctx) {
        throw new Error('Audio context not initialized');
      }
      audioContextRef.current = ctx;

      // Create source from microphone
      const source = ctx.createMediaStreamSource(stream);
      sourceNodeRef.current = source;

      // Create script processor for real-time DSP
      const processor = ctx.createScriptProcessor(512, 1, 1);
      processorNodeRef.current = processor;

      processor.onaudioprocess = (e) => {
        const inputBuffer = e.inputBuffer.getChannelData(0);
        const outputBuffer = e.outputBuffer.getChannelData(0);

        // Process through DSP chain
        const processed = audioProcessor.processBuffer(inputBuffer);
        outputBuffer.set(processed);
      };

      // Connect: mic → processor → destination
      source.connect(processor);
      processor.connect(ctx.destination);

      setIsRecording(true);
      setError(null);
      console.log('🎤 Microphone input started - DSP chain active');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to access microphone');
      console.error('❌ Microphone error:', err);
    }
  };

  const stopMicrophoneInput = () => {
    // Disconnect audio nodes
    if (processorNodeRef.current) {
      processorNodeRef.current.disconnect();
      processorNodeRef.current = null;
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    
    // Stop microphone stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
    console.log('🎤 Microphone input stopped');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const ctx = audioProcessor.getAudioContext();
      if (!ctx) throw new Error('Audio context not initialized');

      // Read file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

      // Create buffer source
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;

      // Create script processor
      const processor = ctx.createScriptProcessor(512, 1, 1);
      let sampleIndex = 0;

      processor.onaudioprocess = (e) => {
        const outputBuffer = e.outputBuffer.getChannelData(0);
        const channelData = audioBuffer.getChannelData(0);

        // Get chunk from audio file
        const chunk = channelData.slice(sampleIndex, sampleIndex + 512);
        sampleIndex += 512;

        if (chunk.length > 0) {
          // Process through DSP chain
          const processed = audioProcessor.processBuffer(chunk);
          outputBuffer.set(processed);
        }

        // Stop when file ends
        if (sampleIndex >= channelData.length) {
          processor.disconnect();
          setIsRecording(false);
        }
      };

      source.connect(processor);
      processor.connect(ctx.destination);
      source.start();

      setIsRecording(true);
      console.log('📁 Audio file loaded and processing started');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audio file');
      console.error('❌ File load error:', err);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isRecording) {
        stopMicrophoneInput();
      }
    };
  }, [isRecording]);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      border: '2px solid #3a2510',
      borderRadius: '8px',
      padding: '15px',
      zIndex: 1000,
      minWidth: '220px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
    }}>
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: '11px',
        color: '#cda768',
        fontWeight: 'bold',
        marginBottom: '12px',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        🎛️ DSP Test Panel
      </div>

      {/* Input Source Toggle */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '12px'
      }}>
        <button
          onClick={() => setInputSource('mic')}
          style={{
            flex: 1,
            padding: '6px',
            background: inputSource === 'mic' ? '#cda768' : '#2d2318',
            color: inputSource === 'mic' ? '#1a1612' : '#8a7a68',
            border: '1px solid #3a2510',
            borderRadius: '4px',
            fontSize: '9px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          🎤 MICROPHONE
        </button>
        <button
          onClick={() => setInputSource('file')}
          style={{
            flex: 1,
            padding: '6px',
            background: inputSource === 'file' ? '#cda768' : '#2d2318',
            color: inputSource === 'file' ? '#1a1612' : '#8a7a68',
            border: '1px solid #3a2510',
            borderRadius: '4px',
            fontSize: '9px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          📁 FILE
        </button>
      </div>

      {/* Controls */}
      {inputSource === 'mic' ? (
        <button
          onClick={isRecording ? stopMicrophoneInput : startMicrophoneInput}
          style={{
            width: '100%',
            padding: '10px',
            background: isRecording 
              ? 'linear-gradient(145deg, #dd1100, #ff3300)' 
              : 'linear-gradient(145deg, #2d5a2d, #3d7a3d)',
            color: '#fff',
            border: '1px solid #0a0805',
            borderRadius: '5px',
            fontSize: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            letterSpacing: '1px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
            transition: 'all 0.2s'
          }}
        >
          {isRecording ? '⏹ STOP RECORDING' : '⏺ START RECORDING'}
        </button>
      ) : (
        <label style={{
          display: 'block',
          width: '100%',
          padding: '10px',
          background: 'linear-gradient(145deg, #3d5a7a, #4d6a8a)',
          color: '#fff',
          border: '1px solid #0a0805',
          borderRadius: '5px',
          fontSize: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
          cursor: 'pointer',
          letterSpacing: '1px',
          boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
          transition: 'all 0.2s'
        }}>
          📂 LOAD AUDIO FILE
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      )}

      {/* Status */}
      <div style={{
        marginTop: '12px',
        padding: '8px',
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '4px',
        fontSize: '8px',
        color: '#8a7a68',
        fontFamily: 'monospace'
      }}>
        {error ? (
          <span style={{ color: '#ff3300' }}>❌ {error}</span>
        ) : isRecording ? (
          <span style={{ color: '#3d7a3d' }}>● Processing audio through DSP chain...</span>
        ) : (
          <span>○ Ready to process audio</span>
        )}
      </div>

      {/* Info */}
      <div style={{
        marginTop: '10px',
        fontSize: '7px',
        color: '#5a4a3a',
        fontStyle: 'italic',
        lineHeight: '1.4'
      }}>
        Signal Chain: INPUT → DRIVE → TONE → MPC → RESAMPLER → WOW → FLUTTER → LOWPASS → DRY/WET → CLIPPER → OUTPUT
      </div>
    </div>
  );
};
