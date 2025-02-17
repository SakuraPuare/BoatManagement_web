type NestedKeyOf<T> = 
    T extends object 
        ? { [K in keyof T]-?: K extends string | number 
            ? `${K}` | `${K}.${NestedKeyOf<T[K]>}` 
            : never 
        }[keyof T] 
    : '';

  
export type NestedValue<T, K extends NestedKeyOf<T>> = 
K extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
        ? NestedValue<T[Key], Rest>
        : never
    : K extends keyof T
        ? T[K]
        : never;
