import { isFunction } from "@/utils";
import { PickFunction, noop } from "@/utils/hooksType";
import { useMemo, useRef } from "react";


const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

function useMemoizedFn<T extends noop>(fn: T) {
    if (isDev) {
        if (!isFunction(fn)) {
            console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
        }
    }

    const fnRef = useRef<T>(fn)

//     why not write `fnRef.current = fn`?
//    https://github.com/alibaba/hooks/issues/728
    fnRef.current = useMemo(() => fn, [fn])

    const memoizedFn = useRef<PickFunction<T>>();
    if (!memoizedFn.current) {
        /** 返回出的函数使用闭包保证地址不发生变化，函数内部返回的通过apply执行，跟随入参的变化
         * 
         * @param this 
         * @param args 
         * @returns 
         */
        memoizedFn.current = function (this, ...args) {
            return fnRef.current.apply(this, args);
        };
    }

    return memoizedFn.current as T;
}

export default useMemoizedFn;