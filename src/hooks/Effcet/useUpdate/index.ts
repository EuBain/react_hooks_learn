import { useReducer } from "react";

/** useUpdate 通过useReducer内部数据变化触发页面重新渲染
 * 
 * @returns 暴露出修改状态的方法，也就触发组件重渲染的方法
 */
const useUpdate = (): (() => void) => {
    const [, update] = useReducer((num: number): number => num + 1, 0)
    return update;
};

export default useUpdate;