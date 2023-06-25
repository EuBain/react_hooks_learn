import { DebounceOptions } from "@/utils/hooksType";
import { DependencyList, EffectCallback, useEffect, useState } from "react";
import useDebounceFn from "../useDebounceFn";


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

    useUpdateEffect
}