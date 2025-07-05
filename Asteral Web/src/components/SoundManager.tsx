import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { useAppContext } from '../contexts/AppContext';

const SoundManager: React.FC = () => {
  const { soundEnabled } = useAppContext();
  const [ambientMusic, setAmbientMusic] = useState<Howl | null>(null);

  useEffect(() => {
    let music: Howl | null = null;

    if (soundEnabled) {
      // Create ambient space music using Web Audio API generated tones
      // This creates a peaceful, cosmic ambient soundtrack
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a more pleasant ambient space music
      music = new Howl({
        src: [createAmbientSpaceMusic()],
        loop: true,
        volume: 0.3, // Lower default volume
        autoplay: true,
        html5: true,
        fade: true
      });

      music.play();
      setAmbientMusic(music);
    }

    return () => {
      if (music) {
        music.fade(music.volume(), 0, 1000); // Fade out over 1 second
        setTimeout(() => {
          music.stop();
          music.unload();
        }, 1000);
      }
    };
  }, [soundEnabled]);

  // Generate a pleasant ambient space music data URL
  const createAmbientSpaceMusic = (): string => {
    // Create a simple, pleasant ambient tone sequence
    const sampleRate = 44100;
    const duration = 30; // 30 seconds loop
    const samples = sampleRate * duration;
    const buffer = new ArrayBuffer(44 + samples * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples * 2, true);
    
    // Generate pleasant ambient tones
    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      
      // Create layered ambient tones with slow modulation
      const freq1 = 110; // Low A
      const freq2 = 165; // Low E
      const freq3 = 220; // A above
      
      // Slow modulation for ethereal effect
      const mod = Math.sin(t * 0.1) * 0.3 + 0.7;
      
      // Layer multiple sine waves with different frequencies
      const wave1 = Math.sin(2 * Math.PI * freq1 * t) * 0.15;
      const wave2 = Math.sin(2 * Math.PI * freq2 * t) * 0.1;
      const wave3 = Math.sin(2 * Math.PI * freq3 * t) * 0.08;
      
      // Add some gentle harmonics
      const harmonic = Math.sin(2 * Math.PI * freq1 * 2 * t) * 0.05;
      
      // Combine waves with modulation
      const sample = (wave1 + wave2 + wave3 + harmonic) * mod * 0.3;
      
      // Apply gentle fade in/out at loop points
      const fadeLength = sampleRate * 2; // 2 second fade
      let fadeMultiplier = 1;
      if (i < fadeLength) {
        fadeMultiplier = i / fadeLength;
      } else if (i > samples - fadeLength) {
        fadeMultiplier = (samples - i) / fadeLength;
      }
      
      const finalSample = sample * fadeMultiplier;
      const intSample = Math.max(-32767, Math.min(32767, finalSample * 32767));
      view.setInt16(44 + i * 2, intSample, true);
    }
    
    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  };

  return null;
};

export default SoundManager;