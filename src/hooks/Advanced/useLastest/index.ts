import { useRef } from "react"

/** useLastest 永远返回最新的值，可以避免闭包问题
 * @value 需要保存的最新的数据
 */

const useLastest = <T>(value: T): { 
    readonly current: T 
} => {
    const valueRef = useRef(value)
    valueRef.current = value
    return  valueRef
};

export default useLastest;