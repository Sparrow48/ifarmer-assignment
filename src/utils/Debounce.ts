/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay = 1000
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeout) clearTimeout(timeout);
    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        const ret = fn(...args);
        resolve(ret);
      }, delay);
    });
  };
};
