import useCreation from "../useCreation";
import useLastest from "../useLastest";
import useUpdate from "../../Effcet/useUpdate";



//proxy和reflect响应式监听
const observer = <T extends Record<string, any>>(
    initialVal: T,
    cb: () => void,
): T => {
    const proxy = new Proxy<T>(initialVal, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            return typeof res === "object"
            ? observer(res, cb)
            : Reflect.get(target, key);
        },
        set(target, key, val) {
            const ret = Reflect.set(target, key, val);
            cb();
            return ret;
        }
    });

    return proxy;
}

//响应式state

/** useReactive 使用proxy监听的状态，当值被修改时会触发useReducer强制刷新页面
 * 
 * @param initialState 初始值
 * @returns 返回响应式的State
 */
const useReactive = <T extends Record<string, any>>(initialState: T): T => {
    const ref = useLastest<T>(initialState);
    const update = useUpdate();

    const state = useCreation(() => {
        return observer(ref.current, () => {
            update();
        });
    }, [])

    return state;
}

export default useReactive;