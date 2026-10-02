const TYPING_AUDIO_SRC = "/sounds/typewriter/typewriter-typing-loop.wav";
const CARRIAGE_RETURN_AUDIO_SRC =
  "/sounds/typewriter/typewriter-carriage-return.wav";

const TYPING_VOLUME = 0.14;
const CARRIAGE_RETURN_VOLUME = 0.2;

export class TypewriterSoundEngine {
  private typingAudio: HTMLAudioElement | null = null;
  private carriageReturnAudio: HTMLAudioElement | null = null;
  private enabled = false;

  async enable() {
    this.enabled = true;
    this.ensureAudioElements();
  }

  disable() {
    this.enabled = false;
    this.pauseTyping();
    this.stopCarriageReturn();
  }

  startTyping() {
    if (!this.enabled) return;

    this.ensureAudioElements();
    this.stopCarriageReturn();
    void this.typingAudio?.play().catch(() => {
      // The visual animation remains usable if the browser declines playback.
    });
  }

  pauseTyping() {
    this.typingAudio?.pause();
  }

  playCarriageReturn(onEnded: () => void) {
    if (!this.enabled) {
      onEnded();
      return () => undefined;
    }

    this.ensureAudioElements();
    this.pauseTyping();

    const audio = this.carriageReturnAudio;
    if (!audio) {
      onEnded();
      return () => undefined;
    }

    audio.currentTime = 0;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      audio.removeEventListener("ended", finish);
      onEnded();
    };

    audio.addEventListener("ended", finish, { once: true });
    void audio.play().catch(finish);

    return () => {
      finished = true;
      audio.removeEventListener("ended", finish);
    };
  }

  stopCarriageReturn() {
    if (!this.carriageReturnAudio) return;
    this.carriageReturnAudio.pause();
    this.carriageReturnAudio.currentTime = 0;
  }

  destroy() {
    this.disable();
    this.typingAudio?.removeAttribute("src");
    this.carriageReturnAudio?.removeAttribute("src");
    this.typingAudio?.load();
    this.carriageReturnAudio?.load();
    this.typingAudio = null;
    this.carriageReturnAudio = null;
  }

  private ensureAudioElements() {
    if (this.typingAudio && this.carriageReturnAudio) return;

    this.typingAudio = new Audio(TYPING_AUDIO_SRC);
    this.typingAudio.loop = true;
    this.typingAudio.preload = "auto";
    this.typingAudio.volume = TYPING_VOLUME;

    this.carriageReturnAudio = new Audio(CARRIAGE_RETURN_AUDIO_SRC);
    this.carriageReturnAudio.preload = "auto";
    this.carriageReturnAudio.volume = CARRIAGE_RETURN_VOLUME;
  }
}
