import useThrottleFn from "@/hooks/Effect/useThrottleFn/ index";
import { ThrottleOptions } from "@/utils/hooksType";
import { useEffect, useState } from "react";


function useThrottle<T>(value: T, options?: ThrottleOptions) {
    const [throttled, setThrottled] = useState(value);

    const {run} = useThrottleFn(() => {
        setThrottled(value);
    }, options);

    useEffect(() => {
        run();
    }, [value])

    return throttled;
}

export default useThrottle;