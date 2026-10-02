"use client";

import { useTypewriterSequence } from "./typewriter-sequence";

type TypewriterAboutProps = {
  label: string;
};

function renderLines(lines: readonly string[], showCursor = false) {
  return lines.map((line, index) => (
    <p key={`${index}-${line.slice(0, 24)}`}>
      {line}
      {showCursor && index === lines.length - 1 ? (
        <span className="typewriter-cursor">▌</span>
      ) : null}
    </p>
  ));
}

export function TypewriterAbout({ label }: TypewriterAboutProps) {
  const { aboutLines, visibleAboutLines, aboutStarted, isComplete } =
    useTypewriterSequence();

  return (
    <section className="intro" aria-labelledby="intro-title">
      <p className="section-label">{label}</p>
      <h1 id="intro-title" className="sr-only">
        About Claudia Xu
      </h1>

      <div className="typewriter-about type-en-body" lang="en">
        <div className="typewriter-about-reserve" aria-hidden="true">
          {aboutLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="typewriter-about-output" aria-hidden="true">
          {aboutStarted ? renderLines(visibleAboutLines, !isComplete) : null}
        </div>
        <div className="sr-only">{renderLines(aboutLines)}</div>
      </div>
    </section>
  );
}
