import { DependencyList, useEffect, useRef } from "react";

type Effect<T extends DependencyList> = (
    changes?: number[],
    previousDeps?: T,
    currentDeps?: T,
) => void | (() => void);

const diffTwoDeps = (deps1?: DependencyList, deps2?: DependencyList) => {
    return deps1
    //旧依赖项存在时，浅比较两个依赖项的子项，再把不相同的去掉
    ? deps1
        .map((_ele, idx) => (!Object.is(deps1[idx],deps2?.[idx]) ? idx : -1))
        .filter((ele) => ele >= 0)
    : deps2
    //只存在新依赖项时，直接返回新依赖项的下数组
    ? deps2.map((_ele, idx) => idx)
    : [];
}

const useTrackedEffect = <T extends DependencyList>(effect: Effect<T>, deps?: [...T]) => {
    const previousDepsRef = useRef<T>();

    useEffect(() => {
        const changes = diffTwoDeps(previousDepsRef.current, deps);
        const previousDeps = previousDepsRef.current;
        previousDepsRef.current = deps;

        //卸载时触发，每次依赖性更新时都会触发
        return effect(changes, previousDeps, deps);
    }, deps)
};

export default useTrackedEffect;