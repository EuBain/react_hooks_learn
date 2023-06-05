import { Dispatch, SetStateAction, useCallback, useState } from "react"
import useUnmountedRef from "../../LifeCycle/useUnmountedRef";


/** useSafeState 通过useUnmountedRef判断组件是否卸载，作为更新state时的判断条件，避免组件卸载后更新状态导致内存泄漏
 * 
 * @param initialState state初始值
 */
//函数重载，定义类型
function useSafeState<S>(
    initialState: S | (() => S)
  ): [S, Dispatch<SetStateAction<S>>];
function useSafeState<S = undefined>(): [
    S | undefined,
    Dispatch<SetStateAction<S | undefined>>
  ];
//函数实体
function useSafeState <S>(
    initalState?: S | (() => S)
    ) {
        const unmountedRef = useUnmountedRef();
        const [state, setState] = useState(initalState);
        const setCurrentState = useCallback((currentState: any) => {
            if(unmountedRef.current) return;
            setState(currentState)
        },[]);

        return [state, setCurrentState] as const;
};

export default useSafeState;