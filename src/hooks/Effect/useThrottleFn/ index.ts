import useLastest from "@/hooks/Advanced/useLastest";

import { isDev, isFunction } from "@/utils";
import { useMemo } from "react";
import { throttle } from 'lodash'
import useUnmount from "@/hooks/LifeCycle/useUnmount";
import { ThrottleOptions, noop } from "@/utils/hooksType";


function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
    if (isDev && !isFunction(fn)) {
        console.error(`useThrottleFn expected parameter is a function, got ${typeof fn}`);
    }

    const fnRef = useLastest(fn);

    const wait = options?.wait ?? 1000;

    const throttled = useMemo(() => 
    // lodash的throttle返回值
        throttle(
            (...args: Parameters<T>): ReturnType<T> => {
                return fnRef.current(...args);
            },
            wait,
            options,
        ),
        []
    );

    useUnmount(() => {
        throttled.cancel();
    })

    return {
        run: throttled,
        cancel: throttled.cancel,
        flush: throttled.flush,
    };
}

export default useThrottleFn;