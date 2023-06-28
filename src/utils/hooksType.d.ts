import { useEffect, useLayoutEffect } from "react";


export declare type noop = (this: any, ...args: any[]) => any;

export declare type PickFunction<T extends noop> = (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => ReturnType<T>;


export declare interface ThrottleOptions {
    wait?: number,
    leading?: boolean,
    trailing?: boolean,
}
export declare interface DebounceOptions {
    wait?: number,
    leading?: boolean,
    trailing?: boolean,
    maxWait?: number,
}

export declare type EffectHookType = typeof useEffect | typeof useLayoutEffect


export declare interface Handle {
    id: number | NodeJS.Timer
}

type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;