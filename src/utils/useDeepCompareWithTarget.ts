import { DependencyList, EffectCallback, useRef } from "react";
import { BasicTarget } from "./domTargets";
import { depsEquel } from ".";
import useEffectWithTarget from "./useEffectWithTarget";


const useDeepCompareEffectWithTarget = (
    effect: EffectCallback,
    deps: DependencyList,
    target: BasicTarget<any> | BasicTarget<any>[],
) => {
    const ref = useRef<DependencyList>();
    const signalRef = useRef<number>(0);

    if (!depsEquel(deps, ref.current)) {
        ref.current = deps;
        signalRef.current += 1;
    }

    useEffectWithTarget(effect, [signalRef.current], target);
}

export default useDeepCompareEffectWithTarget;