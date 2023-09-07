import { useMemo, useState } from "react";

export interface Actions<T> {
    setLeft: () => void;
    setRight: () => void;
    set: (value: T) => void;
    toggle: () => void;
  }

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];
  
/** 两个状态之间切换
 * 
 * @param defaultValue 默认状态
 * @param reverseValue  另一个状态
 * @returns 
 */
function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?:R) {
    const [state, setState] = useState<D | R>(defaultValue);

    const actions = useMemo(() => {
        // 设置一个反状态
        const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

        const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue))
        const set = (value: D | R) => setState(value);
        const setLeft = () => setState(defaultValue);
        const setRight = () => setState(reverseValueOrigin);

        return {
            toggle,
            set,
            setLeft,
            setRight,
        }
    }, [])
    
    return [state, actions];
}

export default useToggle;