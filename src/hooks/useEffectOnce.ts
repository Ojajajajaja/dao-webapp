import { useEffect, useRef } from 'react';

/**
 * Custom hook that ensures an effect only runs once per set of dependencies even in StrictMode
 * This is useful for preventing duplicate API calls in development mode
 * 
 * @param effect The effect callback to run
 * @param deps The dependency array for the effect
 */
export const useEffectOnce = (
  effect: React.EffectCallback,
  deps: React.DependencyList = []
) => {
  const effectRan = useRef(false);
  const depsRef = useRef(deps);
  
  // Check if dependencies have changed
  const depsChanged = deps.length > 0 && JSON.stringify(deps) !== JSON.stringify(depsRef.current);
  
  useEffect(() => {
    // Reset the flag if dependencies change
    if (depsChanged) {
      effectRan.current = false;
      depsRef.current = deps;
    }
    
    // Only run effect once in development for each set of dependencies
    if (effectRan.current === true && process.env.NODE_ENV === 'development' && !depsChanged) {
      return;
    }
    
    effectRan.current = true;
    
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}; 