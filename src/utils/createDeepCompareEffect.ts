import { DependencyList, useEffect, useLayoutEffect, useRef } from "react";
import { depsEquel } from ".";
import { CreateUpdateEffect } from "./hooksType";

export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
    const ref = useRef<DependencyList>();
    const singleRef = useRef<number>(0);

    if (deps === undefined || !depsEquel(deps, ref.current)) {
        ref.current = deps;
        singleRef.current += 1;
    }

    hook(effect, [singleRef.current]);
}