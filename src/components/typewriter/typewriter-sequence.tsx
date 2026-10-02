"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { TypewriterSoundEngine } from "@/lib/audio/typewriter-sound";
import type { TypewriterPhrase } from "@/types/content";

type GreetingState = {
  phase: "typing" | "deleting" | "switching";
  phraseIndex: number;
  characterCount: number;
};

type AboutState = {
  started: boolean;
  phase: "idle" | "typing" | "carriage-return" | "complete";
  lineIndex: number;
  characterCount: number;
};

type TypewriterSequenceValue = {
  phrases: readonly [TypewriterPhrase, ...TypewriterPhrase[]];
  aboutLines: readonly string[];
  visibleAboutLines: readonly string[];
  greetingIndex: number;
  greetingText: string;
  aboutStarted: boolean;
  isComplete: boolean;
  prefersReducedMotion: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
};

type TypewriterSequenceProps = {
  phrases: readonly [TypewriterPhrase, ...TypewriterPhrase[]];
  aboutLines: readonly string[];
  children: ReactNode;
};

const GREETING_TYPING_MS = 110;
const GREETING_DELETING_MS = 65;
const GREETING_HOLD_MS = 1750;
const LANGUAGE_PAUSE_MS = 400;
const ABOUT_TYPING_MS = 36;
const SILENT_CARRIAGE_RETURN_MS = 500;
const TIMING_VARIATION = [-13, 7, 16, -6, 4, 11, -9] as const;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const PUNCTUATION = new Set([
  ",",
  ".",
  "!",
  "?",
  ":",
  ";",
  "，",
  "。",
  "！",
  "？",
  "：",
  "；",
]);

const TypewriterSequenceContext = createContext<TypewriterSequenceValue | null>(
  null,
);

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function variableDelay(base: number, index: number) {
  return base + TIMING_VARIATION[index % TIMING_VARIATION.length];
}

function aboutDelay(character: string, index: number) {
  if (PUNCTUATION.has(character)) {
    return variableDelay(ABOUT_TYPING_MS, index) + 115;
  }
  if (character === " ") return 24;
  return variableDelay(ABOUT_TYPING_MS, index);
}

export function TypewriterSequence({
  phrases,
  aboutLines,
  children,
}: TypewriterSequenceProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [greeting, setGreeting] = useState<GreetingState>({
    phase: "typing",
    phraseIndex: 0,
    characterCount: 0,
  });
  const [about, setAbout] = useState<AboutState>({
    started: false,
    phase: "idle",
    lineIndex: 0,
    characterCount: 0,
  });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEngine = useRef<TypewriterSoundEngine | null>(null);
  const currentPhrase = phrases[greeting.phraseIndex];
  const currentAboutLine = aboutLines[about.lineIndex] ?? "";

  const toggleSound = useCallback(() => {
    setSoundEnabled((enabled) => {
      const nextEnabled = !enabled;

      if (nextEnabled) {
        soundEngine.current ??= new TypewriterSoundEngine();
        void soundEngine.current.enable();
      } else {
        soundEngine.current?.disable();
      }

      return nextEnabled;
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || about.phase === "carriage-return") return;

    let delay = 0;
    let advance: () => void;

    switch (greeting.phase) {
      case "typing": {
        if (greeting.characterCount < currentPhrase.text.length) {
          const nextCharacter = currentPhrase.text[greeting.characterCount];
          delay = variableDelay(GREETING_TYPING_MS, greeting.characterCount);
          if (PUNCTUATION.has(nextCharacter)) delay += 90;
          advance = () =>
            setGreeting((current) => ({
              ...current,
              characterCount: current.characterCount + 1,
            }));
        } else {
          delay = GREETING_HOLD_MS;
          advance = () => {
            if (greeting.phraseIndex === phrases.length - 1) {
              setAbout((current) =>
                current.started
                  ? current
                  : { ...current, started: true, phase: "typing" },
              );
            }
            setGreeting((current) => ({ ...current, phase: "deleting" }));
          };
        }
        break;
      }
      case "deleting":
        if (greeting.characterCount > 0) {
          delay = variableDelay(GREETING_DELETING_MS, greeting.characterCount);
          advance = () =>
            setGreeting((current) => ({
              ...current,
              characterCount: current.characterCount - 1,
            }));
        } else {
          delay = LANGUAGE_PAUSE_MS;
          advance = () =>
            setGreeting((current) => ({ ...current, phase: "switching" }));
        }
        break;
      case "switching":
        advance = () =>
          setGreeting((current) => ({
            phase: "typing",
            phraseIndex: (current.phraseIndex + 1) % phrases.length,
            characterCount: 0,
          }));
        break;
    }

    const timeout = window.setTimeout(advance, delay);
    return () => window.clearTimeout(timeout);
  }, [about.phase, currentPhrase.text, greeting, phrases.length, prefersReducedMotion]);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      !about.started ||
      about.phase !== "typing"
    ) {
      return;
    }

    if (about.characterCount >= currentAboutLine.length) {
      const timeout = window.setTimeout(() => {
        setAbout((current) => ({
          ...current,
          phase:
            current.lineIndex >= aboutLines.length - 1
              ? "complete"
              : "carriage-return",
        }));
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    const nextCharacter = currentAboutLine[about.characterCount];
    const timeout = window.setTimeout(() => {
      setAbout((current) => ({
        ...current,
        characterCount: current.characterCount + 1,
      }));
    }, aboutDelay(nextCharacter, about.characterCount));

    return () => window.clearTimeout(timeout);
  }, [about, aboutLines.length, currentAboutLine, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || about.phase !== "carriage-return") return;

    const advanceLine = () =>
      setAbout((current) => ({
        ...current,
        phase: "typing",
        lineIndex: current.lineIndex + 1,
        characterCount: 0,
      }));

    if (soundEnabled && soundEngine.current) {
      return soundEngine.current.playCarriageReturn(advanceLine);
    }

    const timeout = window.setTimeout(advanceLine, SILENT_CARRIAGE_RETURN_MS);
    return () => window.clearTimeout(timeout);
  }, [about.phase, prefersReducedMotion, soundEnabled]);

  useEffect(() => {
    const engine = soundEngine.current;
    if (!engine) return;

    if (!soundEnabled || prefersReducedMotion || about.phase === "carriage-return") {
      engine.pauseTyping();
      return;
    }

    const greetingIsTyping =
      greeting.phase === "typing" &&
      greeting.characterCount < currentPhrase.text.length;
    const aboutIsTyping =
      about.started &&
      about.phase === "typing" &&
      about.characterCount < currentAboutLine.length;
    const visualTyping = greetingIsTyping || aboutIsTyping;

    if (visualTyping) engine.startTyping();
    else engine.pauseTyping();
  }, [
    about.characterCount,
    about.phase,
    about.started,
    currentAboutLine.length,
    currentPhrase.text.length,
    greeting.characterCount,
    greeting.phase,
    prefersReducedMotion,
    soundEnabled,
  ]);

  useEffect(() => {
    return () => soundEngine.current?.destroy();
  }, []);

  const visibleAboutLines = useMemo(() => {
    if (prefersReducedMotion || about.phase === "complete") return aboutLines;
    if (!about.started) return [];

    return [
      ...aboutLines.slice(0, about.lineIndex),
      currentAboutLine.slice(0, about.characterCount),
    ];
  }, [about, aboutLines, currentAboutLine, prefersReducedMotion]);

  const value = useMemo<TypewriterSequenceValue>(
    () => ({
      phrases,
      aboutLines,
      visibleAboutLines,
      greetingIndex: prefersReducedMotion
        ? phrases.length - 1
        : greeting.phraseIndex,
      greetingText: prefersReducedMotion
        ? phrases[phrases.length - 1].text
        : currentPhrase.text.slice(0, greeting.characterCount),
      aboutStarted: prefersReducedMotion || about.started,
      isComplete: prefersReducedMotion || about.phase === "complete",
      prefersReducedMotion,
      soundEnabled,
      toggleSound,
    }),
    [
      about.phase,
      about.started,
      aboutLines,
      currentPhrase.text,
      greeting,
      phrases,
      prefersReducedMotion,
      soundEnabled,
      toggleSound,
      visibleAboutLines,
    ],
  );

  return (
    <TypewriterSequenceContext.Provider value={value}>
      {children}
    </TypewriterSequenceContext.Provider>
  );
}

export function useTypewriterSequence() {
  const context = useContext(TypewriterSequenceContext);
  if (!context) {
    throw new Error("Typewriter components must be inside TypewriterSequence.");
  }
  return context;
}
