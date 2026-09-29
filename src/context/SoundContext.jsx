import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "portfolio-sound";
const SoundContext = createContext(null);

const TONES = {
  hover: { freq: 660, type: "sine", vol: 0.025, dur: 0.09 },
  click: { freq: 440, type: "sine", vol: 0.045, dur: 0.13 },
  toggle: { freq: 880, type: "sine", vol: 0.045, dur: 0.16 },
};

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      return true;
    }
  });
  const audioRef = useRef(null);

  // Tiny synthesized blips, so no audio files are needed.
  // Browsers only allow sound after the first user interaction.
  const beep = useCallback((freq, type, vol, dur) => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioRef.current) audioRef.current = new AC();
      const ctx = audioRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(Math.max(vol, 0.0002), now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(g).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    } catch {
      /* audio unavailable */
    }
  }, []);

  // play("hover" | "click" | "toggle")  -> used by Navbar, Hero, CustomCursor
  const play = useCallback(
    (kind = "click") => {
      if (!enabled) return;
      const t = TONES[kind] || TONES.click;
      beep(t.freq, t.type, t.vol, t.dur);
    },
    [enabled, beep]
  );

  // playSynth(freq, waveType, volume, seconds) -> used by Projects, Contact, Footer, CaseStudyModal
  const playSynth = useCallback(
    (freq = 440, type = "sine", vol = 0.05, dur = 0.15) => {
      if (enabled) beep(freq, type, vol, dur);
    },
    [enabled, beep]
  );

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      /* ignore */
    }
    if (next) beep(TONES.toggle.freq, TONES.toggle.type, TONES.toggle.vol, TONES.toggle.dur);
  }, [enabled, beep]);

  const value = useMemo(
    () => ({ enabled, toggle, play, playSynth }),
    [enabled, toggle, play, playSynth]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

function useSoundContext() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("Sound hooks must be used inside <SoundProvider>");
  return ctx;
}

// This file intentionally exports both the provider component and its hooks.
// eslint-disable-next-line react-refresh/only-export-components
export const useSound = useSoundContext;
// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = useSoundContext;
