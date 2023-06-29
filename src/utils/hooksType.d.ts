import { useEffect, useLayoutEffect } from "react";
import { aliasKeyCodeMap } from "./constant";


type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => ReturnType<T>;


interface ThrottleOptions {
    wait?: number,
    leading?: boolean,
    trailing?: boolean,
}
interface DebounceOptions {
    wait?: number,
    leading?: boolean,
    trailing?: boolean,
    maxWait?: number,
}

type EffectHookType = typeof useEffect | typeof useLayoutEffect


interface Handle {
    id: number | NodeJS.Timer
}

type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

type Position = { left: number, top: number };

type Size = { width: number, height: number };

type ScrollListenController = (val: Position) => boolean

type GenArr =  keyof typeof aliasKeyCodeMap;

// 键盘事件类型
type KeyType = number | string;
type KeyPredicate = (event: KeyboardEvent) => KeyType | boolean | undefined;
type KeyFilter = KeyType | KeyType[] | ((event: KeyboardEvent) => boolean);
type KeyEvent = 'keydown' | 'keyup';