export function assertIsNotNil<T>(val: T): asserts val is NonNullable<T> {
  if (typeof val !== 'undefined' && val === null) {
    throw new Error(`Expect value to be a not null and defined`);
  }
}
