import useMemoizedFn from "@/hooks/Advanced/useMemoizedFn";
import { Dispatch, SetStateAction, useState } from "react";

type ResetState =  () => void;

const useResetState = <S>(
    initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, ResetState] => {

    const [state, setState] = useState(initialState);

    const resetState = useMemoizedFn(() => {
        setState(initialState);
    });

    return [state, setState, resetState];
}

export default useResetState;