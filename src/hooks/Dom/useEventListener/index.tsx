



import useLastest from '@hooks/Advanced/useLastest'
import React, { useEffect } from 'react'

/** useEventListener事件监听hooks
 * 
 * @param event  事件类型
 * @param handler  事件处理函数
 * @param target  挂载事件监听的DOM节点
 */
const useEventListener = (
    event: string,
    handler: (...e: any) => void,
    target?: any,
) => {
    const handlerRef = useLastest(handler)

    useEffect(() => {

        // 传入的target支持useRef和DOM节点
        let targetElement: any;
        if (!target) {
            targetElement = window;
        } else if ("current" in target) {
            targetElement = target.current;
        } else {
            targetElement = target;
        };

        if (!targetElement?.addEventListener) return

        const useEventListener = (event: Event) => {
            return handlerRef.current(event)
        };
        targetElement.addEventListener(event, useEventListener);
        return () => {
            targetElement.removeEventListener(event, useEventListener);
        } ;
    }, [event, target])
}

export default useEventListener