// Use globalThis to ensure singleton works across different bundles
const INPUT_MANAGER_KEY = '__TG_ENGINE_INPUT_MANAGER__';

interface GlobalWithInputManager {
  [INPUT_MANAGER_KEY]?: InputManager;
}

export type InputEventType = 'keydown' | 'keyup' | 'mousedown' | 'mouseup' | 'mousemove' | 'touchstart' | 'touchend' | 'touchmove';

export interface InputEventData {
  type: InputEventType;
  key?: string;
  button?: number;
  x?: number;
  y?: number;
  deltaX?: number;
  deltaY?: number;
  touches?: { x: number; y: number; id: number }[];
}

export type InputEventCallback = (event: InputEventData) => void;

export interface MouseState {
  x: number;
  y: number;
  buttons: Set<number>;
  isDragging: boolean;
}

export interface TouchState {
  touches: Map<number, { x: number; y: number }>;
  isActive: boolean;
}

export class InputManager {
  private pressedKeys: Set<string> = new Set();
  private mouseState: MouseState = {
    x: 0,
    y: 0,
    buttons: new Set(),
    isDragging: false,
  };
  private touchState: TouchState = {
    touches: new Map(),
    isActive: false,
  };
  private eventListeners: Map<InputEventType, Set<InputEventCallback>> = new Map();
  private isAttached: boolean = false;

  private constructor() {}

  public static getInstance(): InputManager {
    const global = globalThis as GlobalWithInputManager;
    if (!global[INPUT_MANAGER_KEY]) {
      global[INPUT_MANAGER_KEY] = new InputManager();
    }
    return global[INPUT_MANAGER_KEY];
  }

  /**
   * Attach global event listeners for input tracking
   * Call this once when your game starts
   */
  public attach(): void {
    if (this.isAttached) return;

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    window.addEventListener('touchend', this.handleTouchEnd, { passive: true });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: true });

    this.isAttached = true;
  }

  /**
   * Detach global event listeners
   * Call this when cleaning up
   */
  public detach(): void {
    if (!this.isAttached) return;

    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('touchmove', this.handleTouchMove);

    this.isAttached = false;
  }

  /**
   * Subscribe to input events
   */
  public on(eventType: InputEventType, callback: InputEventCallback): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType)!.add(callback);
  }

  /**
   * Unsubscribe from input events
   */
  public off(eventType: InputEventType, callback: InputEventCallback): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  private emit(event: InputEventData): void {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }
  }

  // Key state methods
  /**
   * Check if a key is currently pressed
   */
  public isKeyDown(key: string): boolean {
    return this.pressedKeys.has(key);
  }

  /**
   * Check if any of the provided keys is currently pressed
   */
  public isAnyKeyDown(keys: string[]): boolean {
    return keys.some(key => this.pressedKeys.has(key));
  }

  /**
   * Check if all of the provided keys are currently pressed
   */
  public areAllKeysDown(keys: string[]): boolean {
    return keys.every(key => this.pressedKeys.has(key));
  }

  /**
   * Get all currently pressed keys
   */
  public getPressedKeys(): string[] {
    return Array.from(this.pressedKeys);
  }

  // Mouse state methods
  /**
   * Get current mouse position
   */
  public getMousePosition(): { x: number; y: number } {
    return { x: this.mouseState.x, y: this.mouseState.y };
  }

  /**
   * Check if a mouse button is pressed (0 = left, 1 = middle, 2 = right)
   */
  public isMouseButtonDown(button: number): boolean {
    return this.mouseState.buttons.has(button);
  }

  /**
   * Check if mouse is currently dragging
   */
  public isMouseDragging(): boolean {
    return this.mouseState.isDragging;
  }

  // Touch state methods
  /**
   * Check if there are active touches
   */
  public isTouching(): boolean {
    return this.touchState.isActive;
  }

  /**
   * Get all active touch points
   */
  public getTouches(): { x: number; y: number; id: number }[] {
    const touches: { x: number; y: number; id: number }[] = [];
    this.touchState.touches.forEach((pos, id) => {
      touches.push({ x: pos.x, y: pos.y, id });
    });
    return touches;
  }

  /**
   * Get touch count
   */
  public getTouchCount(): number {
    return this.touchState.touches.size;
  }

  // Event handlers
  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.pressedKeys.has(event.code)) {
      this.pressedKeys.add(event.code);
      this.emit({ type: 'keydown', key: event.code });
    }
  };

  private handleKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.code);
    this.emit({ type: 'keyup', key: event.code });
  };

  private handleMouseDown = (event: MouseEvent): void => {
    this.mouseState.buttons.add(event.button);
    this.mouseState.isDragging = true;
    this.mouseState.x = event.clientX;
    this.mouseState.y = event.clientY;
    this.emit({
      type: 'mousedown',
      button: event.button,
      x: event.clientX,
      y: event.clientY,
    });
  };

  private handleMouseUp = (event: MouseEvent): void => {
    this.mouseState.buttons.delete(event.button);
    if (this.mouseState.buttons.size === 0) {
      this.mouseState.isDragging = false;
    }
    this.emit({
      type: 'mouseup',
      button: event.button,
      x: event.clientX,
      y: event.clientY,
    });
  };

  private handleMouseMove = (event: MouseEvent): void => {
    const deltaX = event.clientX - this.mouseState.x;
    const deltaY = event.clientY - this.mouseState.y;
    this.mouseState.x = event.clientX;
    this.mouseState.y = event.clientY;
    this.emit({
      type: 'mousemove',
      x: event.clientX,
      y: event.clientY,
      deltaX,
      deltaY,
    });
  };

  private handleTouchStart = (event: TouchEvent): void => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      this.touchState.touches.set(touch.identifier, {
        x: touch.clientX,
        y: touch.clientY,
      });
    }
    this.touchState.isActive = this.touchState.touches.size > 0;
    this.emit({
      type: 'touchstart',
      touches: this.getTouches(),
    });
  };

  private handleTouchEnd = (event: TouchEvent): void => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      this.touchState.touches.delete(touch.identifier);
    }
    this.touchState.isActive = this.touchState.touches.size > 0;
    this.emit({
      type: 'touchend',
      touches: this.getTouches(),
    });
  };

  private handleTouchMove = (event: TouchEvent): void => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      this.touchState.touches.set(touch.identifier, {
        x: touch.clientX,
        y: touch.clientY,
      });
    }
    this.emit({
      type: 'touchmove',
      touches: this.getTouches(),
    });
  };

  /**
   * Reset all input state (useful when window loses focus)
   */
  public reset(): void {
    this.pressedKeys.clear();
    this.mouseState.buttons.clear();
    this.mouseState.isDragging = false;
    this.touchState.touches.clear();
    this.touchState.isActive = false;
  }
}
