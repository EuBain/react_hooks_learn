import useLastest from "@/hooks/Advanced/useLastest";
import { BasicTarget, getTargetElement } from "@/utils/domTargets";
import { KeyEvent, KeyFilter, KeyType } from "@/utils/hooksType";
import useDeepCompareEffectWithTarget from "@/utils/useDeepCompareWithTarget";
import { genKeyFormatter, isValidKeyType } from "./keypressMethod";


type Target = BasicTarget<HTMLElement | Document | Window>;

type Options = {
    events?: KeyEvent[];
    target?: Target;
    exactMatch?: boolean;
    useCapture?: boolean;
  };
  
const defaultEvents: KeyEvent[] = ['keydown'];

function useKeyPress(
    keyFilter: KeyFilter,
    eventHandler: (event: KeyboardEvent, key: KeyType) => void,
    option?: Options,
) {
    const { events = defaultEvents, target, exactMatch = false, useCapture = false } = option || {};
    const eventHandlerRef = useLastest(eventHandler);
    const keyFilterRef = useLastest(keyFilter);

    useDeepCompareEffectWithTarget(
        () => {
            const el = getTargetElement(target, window);
            if (!el) {
                return;
            }

            const callbackHandler = (event: KeyboardEvent) => {
                const genGuard = genKeyFormatter(keyFilterRef.current, exactMatch);
                const keyGuard = genGuard(event);
                const firedKey = isValidKeyType(keyGuard) ? keyGuard : event.key;

                if (keyGuard) {
                    return eventHandlerRef.current?.(event, firedKey)
                }
            };

            for (const eventName of events) {
                el?.addEventListener?.(eventName, callbackHandler as (T: Event) => void, useCapture)
            }
            return () => {
                for (const eventName of events) {
                    el?.removeEventListener?.(eventName, callbackHandler as (T: Event) => void, useCapture)
                }
            }
        },
        [events],
        target
    )
}

export default useKeyPress;