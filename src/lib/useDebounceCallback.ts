import { useCallback, useRef } from "react";

export default function useDebouncedCallback(func: (...args: any[]) => void, wait: number) {
  const timeout = useRef();

  return useCallback(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
};