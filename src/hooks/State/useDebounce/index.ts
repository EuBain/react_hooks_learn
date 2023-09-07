import useDebounceFn from "@/hooks/Effect/useDebounceFn";
import { DebounceOptions } from "@/utils/hooksType";
import { useEffect, useState } from "react";


function useDebounce<T>(value: T, options?: DebounceOptions) {
    const [debounced, setDebounced] = useState(value);
    const { run } = useDebounceFn(() => {
        setDebounced(value);
    }, options);

    useEffect(() => {
        run()
    }, [value])

    return debounced;
}

export default useDebounce;