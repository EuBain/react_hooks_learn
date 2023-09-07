import { useEffect, useRef } from "react";

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
    private subscriptions = new Set<Subscription<T>>();

    // 发布，发布时自定触发其他已经订阅过的函数执行
    emit = (val: T) => {
        for (const subscription of this.subscriptions) {
            subscription(val);
        }
    };

    // 订阅 会在组件创建时自动订阅，销毁时自动取消订阅
    useSubscription = (callback: Subscription<T>) => {
        const callbackRef = useRef<Subscription<T>>();
        callbackRef.current = callback;

        useEffect(() => {
            function subscription(val: T) {
                if (callbackRef.current) {
                    callbackRef.current(val);
                }
            }
            this.subscriptions.add(subscription);
            return () => {
                this.subscriptions.delete(subscription)
            }
        }, [])
    }
}

/** 创建的EventEmitter通过props或者context传递给其他组件
 * 
 * @returns 返回使用ref保存的EventEmitter实例，多次渲染时每次的产生的实例不会发生变化
 */
export default function useEvemtEmitter<T = void>() {
    const ref = useRef<EventEmitter<T>>();
    if (!ref.current) {
        ref.current = new EventEmitter()
    };
    return ref.current
}