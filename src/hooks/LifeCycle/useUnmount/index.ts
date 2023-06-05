import { useEffect } from "react";
import useLastest from "../../Advanced/useLastest"


/** useUnmount 只在组件卸载时执行
 * @fn 在卸载时执行的函数
 */
const useUnmount = (fn: () => void): void => {
    //需要额外对函数存储，确保是最新的函数
    const fnRef = useLastest(fn);
    useEffect(() => {
        return () => fnRef.current?.();
    }, [])
};

export default useUnmount;