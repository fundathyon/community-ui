"use client";
import { useCallback, useRef, useState } from "react";
/**
 * Controlled/uncontrolled state pattern: controlled when `value` is provided,
 * uncontrolled (with `defaultValue`) otherwise. `onChange` fires in both modes.
 */
export function useControllableState({ value, defaultValue, onChange, }) {
    const [internal, setInternal] = useState(defaultValue);
    const controlled = value !== undefined;
    const current = controlled ? value : internal;
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    const controlledRef = useRef(controlled);
    controlledRef.current = controlled;
    const set = useCallback((next) => {
        if (!controlledRef.current)
            setInternal(next);
        onChangeRef.current?.(next);
    }, []);
    return [current, set];
}
