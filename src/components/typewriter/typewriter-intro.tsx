"use client";

import { useTypewriterSequence } from "./typewriter-sequence";
import type { TypewriterPhrase } from "@/types/content";

function getFontClass(fontRole: TypewriterPhrase["fontRole"]) {
  return fontRole === "zh-display" ? "type-zh-heading" : "type-en-heading";
}

export function TypewriterIntro() {
  const { phrases, greetingIndex, greetingText } = useTypewriterSequence();
  const currentPhrase = phrases[greetingIndex];

  return (
    <span className="typewriter">
      <span className="sr-only">
        {phrases.map((phrase) => phrase.text).join("；")}
      </span>
      <span className="typewriter-animated" aria-hidden="true">
        <span className="typewriter-reserve">
          {phrases.map((phrase) => (
            <span
              className={getFontClass(phrase.fontRole)}
              key={`${phrase.language}-${phrase.text}`}
              lang={phrase.language}
            >
              {phrase.text}
              <span className="typewriter-cursor-reserve">▌</span>
            </span>
          ))}
        </span>
        <span
          className={`typewriter-output ${getFontClass(currentPhrase.fontRole)}`}
          lang={currentPhrase.language}
        >
          {greetingText}
          <span className="typewriter-cursor">▌</span>
        </span>
      </span>
    </span>
  );
}
