import { useCallback, useRef } from "react";

export default function useDebouncedCallback(func: (...args: any[]) => void, wait: number) {
  const timeout = useRef(-1);

  return useCallback(
    (...args: any) => {
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