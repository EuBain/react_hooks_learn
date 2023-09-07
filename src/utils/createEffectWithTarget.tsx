import { DependencyList, EffectCallback, useEffect, useLayoutEffect, useRef } from "react";
import { BasicTarget, getTargetElement } from "./domTargets";
import { depsAreSame } from ".";
import useUnmount from "@/hooks/LifeCycle/useUnmount";



/** 用于创建useEffectWithTarget的高阶函数
 * 
 * @param useEffectType useEffect或useLayoutEffect
 * @returns 
 */
const createEffectWithTarget = (useEffectType: typeof useEffect | typeof useLayoutEffect) => {

    const useEffectWithTarget = (
        effect: EffectCallback,
        deps: DependencyList,
        target: BasicTarget<any> | BasicTarget<any>[],
    ) => {
        const hasInitRef = useRef(false);

        // 用来保存最新的元素
        const lastElementRef = useRef<(Element | null)[]>([]);
        // 用来保存最新的依赖项
        const lastDepsRef = useRef<DependencyList>([]);

        const unLoadRef = useRef<any>();

        // 副作用
        useEffectType(() => {
            const targets = Array.isArray(target) ? target : [target]; 
            // 拿到target数组
            const els = targets.map((item) => getTargetElement(item))
        
            if (!hasInitRef. current) {
                hasInitRef. current = true;
                lastElementRef.current = els;
                lastDepsRef.current = deps;

                unLoadRef.current = effect();
                return;
            }

            if (
                els.length !== lastElementRef.current.length ||
                // 判断Target是否相同
                !depsAreSame(els, lastElementRef.current) ||
                // 判断依赖项是否相同
                !depsAreSame(deps, lastDepsRef.current)
            ) {
                unLoadRef.current?.();

                lastElementRef.current = els;
                lastDepsRef.current = deps;
                unLoadRef.current = effect();
            }
        });
        
        useUnmount(() => {
            unLoadRef.current?.();
            // for react-refresh
            hasInitRef.current = false;
          });
    }
    return useEffectWithTarget;
}

export default createEffectWithTarget