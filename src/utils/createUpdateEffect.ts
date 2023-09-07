import { useRef } from "react";
import { EffectHookType } from "./hooksType";



export const createUpdateEffect: (hook: EffectHookType) => EffectHookType = 
(hook) => (effect, deps) => {
    const isMounted = useRef(false);

    hook(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    hook(() => {
        if(!isMounted.current) {
            isMounted.current = true;
        } else {
            return effect();
        }
    }, deps);
};

export default createUpdateEffect;