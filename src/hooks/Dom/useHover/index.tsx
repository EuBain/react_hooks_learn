



import React, { MutableRefObject, useState } from 'react'
import useEventListener from '../useEventListener';
import useBoolean from '@/hooks/State/useBoolean';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

type BasicTarget<T extends TargetType = Element> =
|TargetValue<T>
|MutableRefObject<TargetValue<T>>

interface Options {
    onEnter?: () => void,
    onLeave?: () => void,
    onChange?: (isHovering: boolean) => void,
}
const useHover = (target: BasicTarget, options?: Options): boolean => {

    const { onEnter, onLeave, onChange } = options || {}

    const [state, { setTrue, setFalse}] = useBoolean(false)

    useEventListener(
        'mouseenter',
        () => {
            onEnter?.();
            setTrue();
            onChange?.(true);
        },
        {
            target,
        }
    );

    useEventListener(
        'mouseleave',
        () => {
            onLeave?.();
            setFalse();
            onChange?.(false);
        },
        {
            target,
        }
    )

    return state
}

export default useHover