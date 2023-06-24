



import React, { MutableRefObject, useState } from 'react'
import useEventListener from '../useEventListener';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

type BasicTarget<T extends TargetType = Element> =
|TargetValue<T>
|MutableRefObject<TargetValue<T>>

interface Options {
    onEnter?: () => void,
    onLeave?: () => void,
    onChange?: (isHover: boolean) => void,
}
const useHover = (target: BasicTarget, option?: Options): boolean => {

    const { onEnter, onLeave, onChange } = option || {}
    const [isHover, setIsHover] = useState<boolean>(false)

    useEventListener(
        'mouseenter',
        () => {
            onEnter?.();
            onChange?.(true);
            setIsHover(true);
        },
        target
    );

    useEventListener(
        'mouseleave',
        () => {
            onLeave?.();
            onChange?.(false);
            setIsHover(false);
        },
        target
    )

    return isHover
}

export default useHover