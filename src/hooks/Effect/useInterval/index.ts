import useMemoizedFn from "@/hooks/Advanced/useMemoizedFn"
import { isNumber } from "@/utils";
import { useCallback, useEffect, useRef } from "react";


const useInterval = (fn: () => void, delay?: number, options: {immediate?: boolean} = {}) => {

    const timerCallback = useMemoizedFn(fn);
    const timerRef = useRef<NodeJS.Timer | null>(null);
    
    const clear = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
    }, [])

    useEffect(() => {
        if (!isNumber(delay) || delay < 0) {
            return;
        }
        // 开始前立即执行一次
        if (options.immediate) {
            timerCallback();
        }
        timerRef.current = setInterval(timerCallback, delay);
        return clear;
    }, [[delay, options.immediate]])
}

export default useInterval;