import { useEffect, useRef } from "react";


/** useUnmountedRef 获取当前组件是否卸载
 * 
 */
const useUnmountedRef = (): {readonly current: boolean} => {
    const unmountedRef = useRef<boolean>(false)
    useEffect(() => {
        unmountedRef.current = false;
        return () => {
            unmountedRef.current = true;
        }
    },[])
    return unmountedRef;
}

export default useUnmountedRef;