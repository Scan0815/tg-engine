// Use globalThis to ensure singleton works across different bundles
const AUDIO_MANAGER_KEY = '__TG_ENGINE_AUDIO_MANAGER__';

interface GlobalWithAudioManager {
  [AUDIO_MANAGER_KEY]?: AudioManager;
}

export type AudioEventType = 'play' | 'stop' | 'ended' | 'error';

export interface AudioEvent {
  type: AudioEventType;
  key: string;
  audio?: HTMLAudioElement;
  error?: Error;
}

export type AudioEventCallback = (event: AudioEvent) => void;

export class AudioManager {
  private audioPools: Map<string, HTMLAudioElement[]>;
  private eventListeners: Map<AudioEventType, Set<AudioEventCallback>>;

  private constructor() {
    this.audioPools = new Map();
    this.eventListeners = new Map();
  }

  /**
   * Subscribe to audio events
   * @param eventType - The type of event to listen for
   * @param callback - The callback to execute when the event fires
   */
  public on(eventType: AudioEventType, callback: AudioEventCallback): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType)!.add(callback);
  }

  /**
   * Unsubscribe from audio events
   * @param eventType - The type of event to stop listening for
   * @param callback - The callback to remove
   */
  public off(eventType: AudioEventType, callback: AudioEventCallback): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  private emit(event: AudioEvent): void {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }
  }

  // Singleton-Instanz
  public static getInstance(): AudioManager {
    const global = globalThis as GlobalWithAudioManager;
    if (!global[AUDIO_MANAGER_KEY]) {
      global[AUDIO_MANAGER_KEY] = new AudioManager();
    }
    return global[AUDIO_MANAGER_KEY];
  }

  /**
   * Add audio to pool
   * @param key - Unique identifier for the sound
   * @param src - Audio source URL
   * @param poolSize - Number of audio instances in the pool
   * @param loop - Whether the audio should loop
   */
  public addAudio(key: string, src: string, poolSize: number = 5, loop: boolean = false): void {
    if (!this.audioPools.has(key)) {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < poolSize; i++) {
        const audio = new Audio(src);
        audio.loop = loop;
        audio.addEventListener('ended', () => {
          this.emit({ type: 'ended', key, audio });
        });
        pool.push(audio);
      }
      this.audioPools.set(key, pool);
    }
  }

  /**
   * Play audio
   * @param key - The sound key
   * @returns Promise that resolves when audio starts playing
   */
  public playAudio(key: string): Promise<void> {
    const pool = this.audioPools.get(key);
    if (pool) {
      const audio = pool.find((a) => a.paused || a.ended);
      if (audio) {
        audio.currentTime = 0;
        return audio.play()
          .then(() => {
            this.emit({ type: 'play', key, audio });
          })
          .catch((e) => {
            const error = e instanceof Error ? e : new Error(String(e));
            this.emit({ type: 'error', key, audio, error });
            throw error;
          });
      } else {
        const error = new Error(`No available audio instance in pool for key: ${key}`);
        this.emit({ type: 'error', key, error });
        return Promise.reject(error);
      }
    }
    const error = new Error(`Audio pool not found for key: ${key}`);
    this.emit({ type: 'error', key, error });
    return Promise.reject(error);
  }

  /**
   * Stop audio
   * @param key - The sound key
   */
  public stopAudio(key: string): void {
    const pool = this.audioPools.get(key);
    if (pool) {
      pool.forEach((audio) => {
        const wasPlaying = !audio.paused;
        audio.pause();
        audio.currentTime = 0;
        if (wasPlaying) {
          this.emit({ type: 'stop', key, audio });
        }
      });
    }
  }

  /**
   * Set volume
   * @param key - The sound key
   * @param volume - Volume level (between 0 and 1)
   */
  public setVolume(key: string, volume: number): void {
    const pool = this.audioPools.get(key);
    if (pool) {
      pool.forEach((audio) => {
        audio.volume = Math.max(0, Math.min(1, volume));
      });
    }
  }

  /**
   * Remove audio pool
   * @param key - The sound key
   */
  public removeAudio(key: string): void {
    const pool = this.audioPools.get(key);
    if (pool) {
      pool.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    }
    this.audioPools.delete(key);
  }

  /**
   * Check if an audio key is currently playing
   * @param key - The sound key
   * @returns true if any audio instance is playing
   */
  public isPlaying(key: string): boolean {
    const pool = this.audioPools.get(key);
    if (pool) {
      return pool.some((audio) => !audio.paused && !audio.ended);
    }
    return false;
  }
}
