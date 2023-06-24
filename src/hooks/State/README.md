# State 状态hooks

1. useSafeState
    
    使用了useUnmountRef来判断组件是否卸载，作为执行setState的条件，组件卸载后异步回调内的setState不再执行，避免因组件卸载后状态更新导致内存泄漏
