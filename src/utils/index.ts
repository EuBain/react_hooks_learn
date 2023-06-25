import { DependencyList } from "react";

/** 判断对象，且不为null
 * 
 * @param value 
 * @returns boolean
 */
export const isObject = (value: unknown): value is Record<any, any> => 
    value !== null && typeof value === 'object';

/** 判断函数
 * 
 * @param value 
 * @returns boolean
 */
export const isFunction = (value: unknown): value is (...arg: any) => any => 
    typeof value === 'function'

/** 判断字符串
 * 
 * @param value 
 * @returns boolean
 */
export const isString = (value: unknown): value is string => typeof value === 'string'

/** 判断数字
 * 
 * @param value 
 * @returns boolean
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number'

/** 判断布尔值
 * 
 * @param value 
 * @returns boolean
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

/** 判断undefined
 * 
 * @param value 
 * @returns boolean
 */
export const isUnd = (value: unknown): value is undefined => typeof value === 'undefined'

/**
 * 判断是否是浏览器window
 */
export const isBrowser = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

export const isDev = process.env.NODE_ENV === 'deleopment' || process.env.NODE_ENV === 'test'

/** 使用Object.is对新旧依赖项浅比较
 * 
 * @param oldDeps 旧的参数
 * @param deps 新的参数
 * @returns boolean
 */
export function depsAreSame(
    oldDeps: DependencyList,
    deps: DependencyList
    ): boolean {
    if (oldDeps === deps) return true;

    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(oldDeps[i],deps[i])) return false;
    }

    return true;
  }

