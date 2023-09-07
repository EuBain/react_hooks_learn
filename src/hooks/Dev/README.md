
# Dev 开发hooks

1. useTrackedEffect
    
    追踪哪个依赖项变化触发了useEffect的执行，与useEffect用法基本相同，只是回调函数多了三个参数，changes发生变化的deps的index，previousDeps上一次的依赖项，currentDeps当前的依赖项

2. useWhyDidYouUpdate
    
    帮助开发者排查那个属性改变导致了组件的rerender，可能导致重新渲染的属性包括传入的props或当前组件的state等

