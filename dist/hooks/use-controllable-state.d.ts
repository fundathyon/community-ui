/**
 * Controlled/uncontrolled state pattern: controlled when `value` is provided,
 * uncontrolled (with `defaultValue`) otherwise. `onChange` fires in both modes.
 */
export declare function useControllableState<T>({ value, defaultValue, onChange, }: {
    value?: T;
    defaultValue: T;
    onChange?: (value: T) => void;
}): [T, (next: T) => void];
