import { ThrottleOptions } from "@/utils/hooksType";
import { DependencyList, EffectCallback, useEffect, useState } from "react";
import useThrottleFn from "../useThrottleFn/ index";
import useUpdateEffect from "../useUpdateEffect";



function useThrottleEffect(
    effect: EffectCallback,
    deps?: DependencyList,
    options?: ThrottleOptions,
) {
    const [flag, setFlag] = useState({});

    const { run } = useThrottleFn(() => {
        setFlag({});
    }, options);

    useEffect(() => {
        return run();
    }, deps);

    useUpdateEffect(effect, [flag])
}

export default useThrottleEffect;