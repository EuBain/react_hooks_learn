import { DependencyList, useEffect, useLayoutEffect, useRef } from "react";
import { CreateUpdateEffect } from "./hooksType";
import { depsEquel } from ".";

export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
    const ref = useRef<DependencyList>();
    const singleRef = useRef<number>(0);

    if (deps === undefined || !depsEquel(deps, ref.current)) {
        ref.current = deps;
        singleRef.current += 1;
    }

    hook(effect, [singleRef.current]);
}