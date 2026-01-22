// Use globalThis to ensure singleton works across different bundles
const AUDIO_MANAGER_KEY = '__TG_ENGINE_AUDIO_MANAGER__';

export class AudioManager {
  private audioPools: Map<string, HTMLAudioElement[]>;

  private constructor() {
    this.audioPools = new Map();
  }

  // Singleton-Instanz
  public static getInstance(): AudioManager {
    if (!(globalThis as any)[AUDIO_MANAGER_KEY]) {
      (globalThis as any)[AUDIO_MANAGER_KEY] = new AudioManager();
    }
    return (globalThis as any)[AUDIO_MANAGER_KEY];
  }

  /**
   * Audio mit Pool hinzufügen
   * @param key - Eindeutiger Schlüssel für den Sound
   * @param src - Audioquelle
   * @param poolSize - Anzahl der Audio-Instanzen im Pool
   * @param loop - Ob die Audio-Instanzen wiederholt werden sollen
   */
  public addAudio(key: string, src: string, poolSize: number = 5, loop: boolean = false): void {
    if (!this.audioPools.has(key)) {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < poolSize; i++) {
        const audio = new Audio(src);
        audio.loop = loop;
        pool.push(audio);
      }
      this.audioPools.set(key, pool);
    }
  }

  /**
   * Audio abspielen
   * @param key - Der Schlüssel des Sounds
   */
  public playAudio(key: string): void {
    const pool = this.audioPools.get(key);
    if (pool) {
      const audio = pool.find((a) => a.paused || a.ended);
      if (audio) {
        audio.currentTime = 0; // Zurück zum Anfang
        audio.play().catch((e) => console.error(`Error playing audio: ${e.message}`));
      } else {
        console.warn(`No available audio instance in pool for key: ${key}`);
      }
    }
  }

  /**
   * Audio stoppen
   * @param key - Der Schlüssel des Sounds
   */
  public stopAudio(key: string): void {
    const pool = this.audioPools.get(key);
    if (pool) {
      pool.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0; // Zurück zum Anfang
      });
    }
  }

  /**
   * Lautstärke setzen
   * @param key - Der Schlüssel des Sounds
   * @param volume - Lautstärke (zwischen 0 und 1)
   */
  public setVolume(key: string, volume: number): void {
    const pool = this.audioPools.get(key);
    if (pool) {
      pool.forEach((audio) => {
        audio.volume = Math.max(0, Math.min(1, volume)); // Lautstärke zwischen 0 und 1
      });
    }
  }

  /**
   * Audio-Pool entfernen
   * @param key - Der Schlüssel des Sounds
   */
  public removeAudio(key: string): void {
    this.audioPools.delete(key);
  }
}
