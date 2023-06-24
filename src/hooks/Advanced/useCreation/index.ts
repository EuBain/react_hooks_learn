import { depsAreSame } from "@/utils";
import { DependencyList, useRef } from "react";

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

    if (current.initialized === false || !depsAreSame(current.deps, deps)) {
        current.deps = deps;
        current.obj = fn();
        current.initialized = true;
    };

    return current.obj as T
};

export default useCreation;