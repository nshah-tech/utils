/**
 * Type representing a successful result with data of type T.
 * @template T
 * @property {T} data - The successful data.
 * @property {null} error - Always null for success.
 */
export type Success<T> = {
  data: T;
  error: null;
};

/**
 * Type representing a failed result with an error of type E.
 * @template E
 * @property {null} data - Always null for failure.
 * @property {E} error - The error information.
 */
export type Failure<E> = {
  data: null;
  error: E;
};

/**
 * Discriminated union type for operation results.
 * @template T, E
 * @typedef {Success<T> | Failure<E>} Result
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Executes a promise and captures its result in a Result object.
 * @template T, E
 * @param {Promise<T>} promise - The promise to execute.
 * @returns {Promise<Result<T, E>>} A promise that resolves to a Result object.
 * @example
 * const { data, error } = await tryCatch(fetchData());
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

/**
 * Executes a function (sync or async) and captures its result in a Result object.
 * @template T, E
 * @param {() => T | Promise<T>} fn - The function to execute.
 * @returns {Promise<Result<T, E>>} A promise that resolves to a Result object.
 * @example
 * const { data, error } = await tryCatchFn(() => doSomething());
 */
export async function tryCatchFn<T, E = Error>(
  fn: () => T | Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
