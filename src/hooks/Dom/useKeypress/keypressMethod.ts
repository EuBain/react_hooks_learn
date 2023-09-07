import { isFunction, isNumber, isString } from "@/utils";
import { aliasKeyCodeMap } from "@/utils/constant"
import { GenArr, KeyFilter, KeyPredicate, KeyType } from "@/utils/hooksType";


/**修饰键 */
export const modifierKey:Record<string, ((K: KeyboardEvent) => boolean) | undefined> = {
    ctrl: (event: KeyboardEvent) => event.ctrlKey,
    shift: (event: KeyboardEvent) => event.shiftKey,
    alt: (event: KeyboardEvent) => event.altKey,
    meta: (event: KeyboardEvent) => {
        if (event.type === 'keyup') {
            return aliasKeyCodeMap.meta.includes(event.keyCode);
        }
        return event.metaKey;
    } 
}

/**判断合法的按键类型 */
export function isValidKeyType(value: unknown): value is string | number {
    return isString(value) || isNumber(value);
}

/** 根据event计算激活键数量
 * 
 * @param event 
 */
export function countKeyByEvent(event: KeyboardEvent) {
    const countOfModifier = Object.keys(modifierKey).reduce((total,key) => {
        if (modifierKey[key]?.(event)) {
            return total + 1;
        }
        return total;
    }, 0)
    return [16, 17, 18, 91, 92].includes(event.keyCode) ? countOfModifier : countOfModifier + 1;
}


/**
 * 判断按键是否激活
 * @param event 键盘事件
 * @param keyFilter 当前键
 * @param exactMatch 
 * @returns string ｜ number ｜ boolean
 */
export function genFilterKey(event: KeyboardEvent, keyFilter: KeyType, exactMatch: boolean) {
    if (!event.key) {
        return false;
    }

    if (isNumber(keyFilter)) {
        return event.keyCode === keyFilter ? keyFilter : false;
    }

    const genArr = keyFilter.split('.')  ;
    let genLen = 0;

    for (const key  of genArr) {
        const genModifier = modifierKey[key];

        const aliasKeyCode: number | number[] = aliasKeyCodeMap[key.toLowerCase() as GenArr ];

        if ((genModifier && genModifier(event)) || (aliasKeyCode && aliasKeyCode === event.keyCode)) {
            genLen++ ;
        }
    }

    if (exactMatch) {
        return genLen === genArr.length && countKeyByEvent(event) === genArr.length ? keyFilter : false;
    }
    return genLen === genArr.length ? keyFilter : false;
}

/**
 * 键盘输入预处理方法
 * @param keyFilter 当前键
 * @param exactMatch 
 * @returns 
 */
export function genKeyFormatter(keyFilter: KeyFilter, exactMatch: boolean): KeyPredicate {
    if (isFunction(keyFilter)) {
        return keyFilter;
    }

    if (isVailidKeyType(keyFilter)) {
        return (event: KeyboardEvent) => genFilterKey(event, keyFilter, exactMatch);
    }

    if (Array.isArray(keyFilter)) {
        return (event: KeyboardEvent) => keyFilter.find((item) => genFilterKey(event, item, exactMatch))
    }
    return () => Boolean(keyFilter);
}


