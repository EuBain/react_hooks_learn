
import { BasicTarget, getTargetElement } from '@/utils/domTargets';
import useEffectWithTarget from '@/utils/useEffectWithTarget';
import useLastest from '@hooks/Advanced/useLastest'
import React, { useEffect } from 'react'

type Target = BasicTarget<HTMLElement | Element | Window | Document>;

type Option<T extends Target = Target> = {
    target?: T,
    capture?: boolean,
    once?: boolean,
    passive?: boolean,
}


/** useEventListener事件监听hooks
 * 
 * @param event  事件类型
 * @param handler  事件处理函数
 * @param target  挂载事件监听的DOM节点
 */
const useEventListener = (
    event: string,
    handler: (...e: any) => void,
    options: Option = {},
) => {
    const handlerRef = useLastest(handler)

    // 相较于useEffect，未使用useEffect的依赖项，每次数据变化都会触发函数重新，在自定义hooks中手动传入依赖项，自行进行对比事件监听是否需要重新创建
    useEffectWithTarget(
        () => {
            // 获取要绑定的DOM
            const targetElement = getTargetElement(options?.target, window);
            if (!targetElement?.addEventListener) {
                return;
            }

            // 保存事件监听函数
            const eventListener = (event: Event) => {
                return handlerRef.current(event);
            }

            // 绑定事件监听
            targetElement.addEventListener(event, eventListener, {
                capture: options.capture,
                once: options.once,
                passive: options.passive,
            });

            // 卸载时移除事件监听
            return () => {
                targetElement.removeEventListener(event, eventListener, {
                    capture: options.capture,   
                });
            };
        },
        [event, options.capture, options.once, options.passive],
        options.target,
    )

    // useEffect(() => {

    //     // 传入的target支持useRef和DOM节点
    //     let targetElement: any;
    //     if (!target) {
    //         targetElement = window;
    //     } else if ("current" in target) {
    //         targetElement = target.current;
    //     } else {
    //         targetElement = target;
    //     };

    //     if (!targetElement?.addEventListener) return

    //     const useEventListener = (event: Event) => {
    //         return handlerRef.current(event)
    //     };
    //     targetElement.addEventListener(event, useEventListener);
    //     return () => {
    //         targetElement.removeEventListener(event, useEventListener);
    //     } ;
    // }, [event, target])
}

export default useEventListener