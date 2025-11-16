"use client";
import { useEffect, useRef, useState } from 'react';

function createTanpuraContext(): { start: () => void; stop: () => void } {
  let audioCtx: AudioContext | null = null;
  let gain: GainNode | null = null;
  let oscillators: OscillatorNode[] = [];

  const start = () => {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    gain = audioCtx.createGain();
    gain.gain.value = 0.05; // gentle volume
    gain.connect(audioCtx.destination);

    // A very simple tanpura-like drone: tonic (Sa), fifth (Pa), octave (Sa')
    const base = 220; // A3 as base tonic ~ Sa-ish; not exact to any raga
    const freqs = [base, base * 1.5, base * 2];

    oscillators = freqs.map((f, idx) => {
      const osc = audioCtx!.createOscillator();
      const oGain = audioCtx!.createGain();
      oGain.gain.value = [0.7, 0.6, 0.5][idx] * 0.2;
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.connect(oGain).connect(gain!);
      osc.start();
      return osc;
    });
  };

  const stop = () => {
    oscillators.forEach(o => {
      try { o.stop(); o.disconnect(); } catch {}
    });
    oscillators = [];
    if (gain) { try { gain.disconnect(); } catch {} gain = null; }
    if (audioCtx) { try { audioCtx.close(); } catch {} audioCtx = null; }
  };

  return { start, stop };
}

export function Tanpura() {
  const apiRef = useRef<ReturnType<typeof createTanpuraContext> | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    apiRef.current = createTanpuraContext();
    return () => { apiRef.current?.stop(); };
  }, []);

  useEffect(() => {
    if (!apiRef.current) return;
    if (on) apiRef.current.start(); else apiRef.current.stop();
  }, [on]);

  return (
    <div className="flex items-center gap-3">
      <button className="button-primary" onClick={() => setOn(v => !v)}>
        {on ? 'Turn off' : 'Turn on'} Tanpura
      </button>
      <span className="text-white/70 text-sm">A, fifth and octave sine blend</span>
    </div>
  );
}
