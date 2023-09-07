
# Advanced 高级hooks

1. useCreation
    
    useMemo和useRef的替代品，useMemo不能保证被memo的值一定不会被重新计算，React可能会释放屏幕外组件的内存。useRef在用于复杂的常量创建容易出现潜在的性能隐患，需要实例化常量时，每次重新渲染都会执行实例化的过程，即使这个实例被创建后就立即被丢弃掉

2. useLatest

    返回当前最新值的hook，可以避免闭包问题

3. useMemoizedFn

    持久化function的hook，可以完全代替useCallback，优点在于可以省略第二个参数deps依赖项,并保证地址永不变化（使用闭包）

4. useReactive

    使用Proxy和Reflect对数据进行监听，数据发生变化时使用useState触发视图更新，完成响应式，不需要写useState

5. useEventEmitter

    事件通信hook，适合距离较远的组件之间的进行事件通知，或是在多个组件之间共享事件通知

6. useControllableValue

    帮助管理状态能同时被外部控制及自己管理的hook

7. useIsomorphicLayoutEffect

    ssr模式下使用useLayoutEffect会出现警告，在非浏览器环境返回useEffect，浏览器环境返回useEffect