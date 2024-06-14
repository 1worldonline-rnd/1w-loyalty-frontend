export type PropsWithClassName<T = {}> = T & {
    className?: string;
};

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type NoNullable<T> = { [P in keyof T]: Exclude<T[P], null> };

export type Falsy = null | undefined | false | 0 | -0 | 0n | '';

export type Truthy<T> = T extends Falsy ? never : T;

/**
 * @description
 * Constructs a type by picking all properties from Type and properties Keys set to not required.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
