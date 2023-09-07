import useMemoizedFn from "@/hooks/Advanced/useMemoizedFn"
import { isNumber } from "@/utils";
import { useCallback, useEffect, useRef } from "react";




const useTimeout = (fn:() => void, delay?:number) => {
    // 缓存函数
    const timerCallback = useMemoizedFn(fn);

    const timerRef = useRef<NodeJS.Timer | null>(null);

    const clear = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
    }, [])

    useEffect(() => {
        if (!isNumber(delay) || delay < 0) {
            return;
        }
        timerRef.current = setTimeout(timerCallback, delay);
        return clear;
    }, [delay])

    return clear
};

export default useTimeout;