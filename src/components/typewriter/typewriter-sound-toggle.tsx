"use client";

import { useTypewriterSequence } from "./typewriter-sequence";

export function TypewriterSoundToggle() {
  const { soundEnabled, toggleSound } = useTypewriterSequence();

  return (
    <button
      className="sound-toggle"
      type="button"
      onClick={toggleSound}
      aria-label={soundEnabled ? "关闭打字机音效" : "开启打字机音效"}
      aria-pressed={soundEnabled}
    >
      <span className="sound-toggle-label">Sound</span>
      <span className="sound-toggle-track" aria-hidden="true">
        <span className="sound-toggle-knob" />
      </span>
      <span className="sound-toggle-state" aria-hidden="true">
        {soundEnabled ? "On" : "Off"}
      </span>
    </button>
  );
}
