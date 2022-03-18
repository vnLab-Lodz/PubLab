import { useEffect } from 'react';

export default function useUnmountEffect(
  effect: () => void,
  deps: any[] = []
): void {
  useEffect(() => effect, deps);
}
