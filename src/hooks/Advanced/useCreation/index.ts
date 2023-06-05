import { DependencyList, useRef } from "react";




//用来判断依赖项是否相等，浅比较
const depAreSame = (
    oldDeps: DependencyList,
    newDeps: DependencyList,
): boolean => {
    if(oldDeps === newDeps) return true;

    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i], newDeps[i])) return false;
    }

    return true;
}


/**useCreation 增强useMemo和useRef,避免useMemo拿不到最新值的情况
 * 
 * @param fn 需要缓存的回调函数中的值
 * @param deps 依赖项
 * @returns 回调函数中缓存的值
 */
const useCreation = <T>(fn: () => T, deps: DependencyList) => {
    const { current } = useRef({
        deps,
        obj: undefined as undefined | T,
        initialized: false,
    });

    if (current.initialized === false || !depAreSame(current.deps, deps)) {
        current.deps = deps;
        current.obj = fn();
        current.initialized = true;
    };

    return current.obj as T
};

export default useCreation;