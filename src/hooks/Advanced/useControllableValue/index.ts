import useUpdate from "@/hooks/Effect/useUpdate";
import { isFunction } from "mobx/dist/internal";
import { SetStateAction, useMemo, useRef } from "react";
import useMemoizedFn from "../useMemoizedFn";


type Props = Record<string, any>;

export interface Options <T> {
    defaultValue?: T;
    defaultValuePropName?: string;
    valuePropName?: string;
    trigger?: string;
}


function useControllableValue<T = any>(props: Props = {}, options: Options<T> = {}) {
    const {
        defaultValue,
        defaultValuePropName = 'defaultValue',
        valuePropName = 'value',
        trigger = 'onChange',
    } = options;


    const value = props[valuePropName] as T

    // 判断外部是否传入用来控制值的props，没有就不受外部控制影响
    const isControlled = props.hasOwnProperty(valuePropName);

    const initialValue = useMemo(() => {
        if (isControlled) {
            return value;
        }
        if (props.hasOwnProperty(defaultValuePropName)) {
            return props[defaultValuePropName];
        }
        return defaultValue;
    }, [])

    const stateRef = useRef(initialValue);
    if (isControlled) {
        stateRef.current = value;
    }

    const update = useUpdate();

    function setState(v: SetStateAction<T>, ...args:any[]) {
        const r  = isFunction(v) ? v(stateRef.current) : v;

        // 
        if (!isControlled) {
            stateRef.current = r;
            update();
        }

        if (props[trigger]) {
            props[trigger] (r, ...args);
        }
    }

    return [stateRef.current, useMemoizedFn(setState)] as const;

}

export default useControllableValue;