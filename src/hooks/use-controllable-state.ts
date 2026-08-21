"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Controlled/uncontrolled state pattern: controlled when `value` is provided,
 * uncontrolled (with `defaultValue`) otherwise. `onChange` fires in both modes.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : internal;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const controlledRef = useRef(controlled);
  controlledRef.current = controlled;

  const set = useCallback((next: T) => {
    if (!controlledRef.current) setInternal(next);
    onChangeRef.current?.(next);
  }, []);

  return [current, set];
}
