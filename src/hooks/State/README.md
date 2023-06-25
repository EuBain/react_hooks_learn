# State 状态hooks

1. useSafeState
    
    使用了useUnmountRef来判断组件是否卸载，作为执行setState的条件，组件卸载后异步回调内的setState不再执行，避免因组件卸载后状态更新导致内存泄漏

2. useThrottle

    用来处理节流值的hook

3. useDebounce

    用来处理防抖值的hook

4. useSetState

    管理Object类型state的hook，用法与class组件的this.setState基本一致