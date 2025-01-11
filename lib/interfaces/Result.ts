export type Result<T, E> =
    | { ok: T, err?: never }
    | { ok?: never, err: E }