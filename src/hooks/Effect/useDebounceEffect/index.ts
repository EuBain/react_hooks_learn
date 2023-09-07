import { DebounceOptions } from "@/utils/hooksType";
import { DependencyList, EffectCallback, useEffect, useState } from "react";
import useDebounceFn from "../useDebounceFn";
import useUpdateEffect from "../useUpdateEffect";


function useDebounceEffect(
    effect: EffectCallback,
    deps?: DependencyList,
    options?: DebounceOptions,
) {
    const [flag,setFlag] = useState({});

    const { run } = useDebounceFn(() => {
        setFlag({});
    }, options);

    useEffect(() => {
        return run();
    }, deps);

    useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;