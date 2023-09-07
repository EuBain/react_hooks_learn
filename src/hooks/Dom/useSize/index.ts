import useRafState from "@/hooks/State/useRafState";
import { BasicTarget, getTargetElement } from "@/utils/domTargets";
import { Size } from "@/utils/hooksType";
import useIsomorphicLayoutEffectWithTarget from "@/utils/useIsomorphicLayoutEffectWithTarget";


function useSize(target: BasicTarget): Size | undefined {
    const [state, setState] = useRafState<Size | undefined>(
        () => {
            const el = getTargetElement(target);
            return el ? { width: el.clientWidth, height: el.clientHeight} : undefined;
        },
    )

    useIsomorphicLayoutEffectWithTarget(
        () => {
            const el = getTargetElement(target);

            if (!el) {
                return;
            }

            const resizeObserver = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    const {clientWidth, clientHeight } = entry.target;
                    setState({ width: clientWidth, height: clientHeight });
                });
            });
            resizeObserver.observe(el);
            return () => {
                resizeObserver.disconnect();
            }
        },
        [],
        target,
    )

    return state;
}

export default useSize;