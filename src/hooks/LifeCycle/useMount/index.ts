import { useEffect } from "react";


/** useMount 只在组件初始化执行
 * @fn 需要执行的函数
 */
const useMount = (fn: () => void): void => {
    useEffect(() => {
        fn?.()
    }, [])
};

export default useMount;