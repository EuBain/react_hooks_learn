
# Advanced 高级hooks

1. useCreation
    
    useMemo和useRef的替代品，useMemo不能保证被memo的值一定不会被重新计算，React可能会释放屏幕外组件的内存。useRef在用于复杂的常量创建容易出现潜在的性能隐患，需要实例化常量时，每次重新渲染都会执行实例化的过程，即使这个实例被创建后就立即被丢弃掉

2. useUnmount
    卸载时触发的Hooks

3. useUnmountedRef
    用于判断当前组件是否已经卸载的Hooks,返回boolean
