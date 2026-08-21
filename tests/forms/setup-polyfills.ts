/**
 * jsdom lacks a constructible `PointerEvent`; Base UI dispatches one when a
 * non-native button (checkbox, switch, select item…) is activated with the
 * keyboard. Import this file FIRST in any forms test that interacts with
 * Base UI controls.
 */
if (typeof window !== "undefined" && typeof window.PointerEvent !== "function") {
  class PointerEventPolyfill extends MouseEvent {
    readonly pointerId: number;
    readonly pointerType: string;
    readonly isPrimary: boolean;
    readonly width: number;
    readonly height: number;
    readonly pressure: number;

    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 0;
      this.pointerType = init.pointerType ?? "";
      this.isPrimary = init.isPrimary ?? false;
      this.width = init.width ?? 1;
      this.height = init.height ?? 1;
      this.pressure = init.pressure ?? 0;
    }
  }
  (window as unknown as { PointerEvent: unknown }).PointerEvent = PointerEventPolyfill;
}

export {};
