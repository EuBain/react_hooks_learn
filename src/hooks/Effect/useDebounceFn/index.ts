import useLastest from "@/hooks/Advanced/useLastest";
import { isDev, isFunction } from "@/utils";
import { DebounceOptions, noop } from "@/utils/hooksType";
import { useMemo } from "react";
import { debounce } from "lodash";
import useUnmount from "@/hooks/LifeCycle/useUnmount";


function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
    if (isDev && !isFunction(fn)) {
          console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
    }

    const fnRef = useLastest(fn);

    const wait = options?.wait ?? 1000;

    const debounced = useMemo(
        () => debounce(
            (...args: Parameters<T>): ReturenType<T> => {
                return fnRef.current(...args);
            },
            wait,
            options,
        ) ,
        []
    );

    useUnmount(() => {
        debounced.cancel();
    });

    return {
        run: debounced,
        cancel: debounced.cancel,
        flush: debounced.flush,
    };
}

export default useDebounceFn;