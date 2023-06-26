import useUpdateEffect from "@/hooks/Effect/useUpdateEffect";
import { isFunction, keyBy } from "lodash";
import { useState } from "react";
import { isUnd } from ".";
import useMemoizedFn from "@/hooks/Advanced/useMemoizedFn";

export interface IFuncUpdate<T> {
    (previousState?: T): T;
}


export interface Options<T> {
    serializer?: (value: T) => string,
    deserializer?: (value: string) => T,
    defaultValue?: T | IFuncUpdate<T>,
    onError?: (error: unknown) => void,
}

function createUseStorageState(getStorage: () => Storage | undefined) {
    function useStorageState<T>(key: string, options: Options<T> = {}){
        let storage: Storage | undefined;
        const {
            onError = (e) => {
                console.log(e);
            },
        } = options;

        try {
            storage = getStorage();
        } catch (err) {
            onError(err);
        }

        const serializer = (value: T) => {
            if (options?.serializer) {
                return options.serializer(value);
            }
            return JSON?.stringify(value);
        }

        const deserializer = (value: string): T => {
            if (options?.deserializer) {
                return options?.deserializer(value)
            }
            return JSON.parse(value);
        } 

        function getStoredValue() {
            try {
                const raw = storage?.getItem(key);
                if (raw) {
                    return deserializer(raw)
                }
            } catch (e) {
                onError(e);
            }
            
            if (isFunction(options?.defaultValue)) {
                return options?.defaultValue();
            }

            return options?.defaultValue;
        }

        const [state, setState] = useState(() => getStoredValue());

        useUpdateEffect(() => {
            setState(getStoredValue());
        }, [key])

        const updateState = (value?: T | IFuncUpdate<T>) => {
            const currentState = isFunction(value) ? value(state) : value;
            setState(currentState);

            if (isUnd(currentState)) {
                storage?.removeItem(key);
            } else {
                try {
                    storage?.setItem(key, serializer(currentState));
                } catch (e) {
                    console.log(e);
                }
            }
        };

        return [state, useMemoizedFn(updateState)] as const;

    }
    return useStorageState;
}


export default createUseStorageState;