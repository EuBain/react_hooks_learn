import { useEffect, useRef } from "react";

export type Iprops = Record<string, any>;

export default function useWhyDidYouUpdate(componentName: string, props: Iprops) {
    const prevProps = useRef<Iprops>({});

    useEffect(() => {
        if(prevProps.current) {
            const allkeys = Object.keys({...prevProps.current, ...props});
            const changeProps: Iprops = {};

            allkeys.forEach((key) => {
                if (!Object.is(prevProps.current[key], props[key])) {
                    changeProps[key] = { 
                        from: prevProps.current[key],
                        to: props[key],
                    };
                }
            });
            
            if (Object.keys(changeProps).length) {
                console.log('[why-did-you-update]',componentName, changeProps);
            }
        }
        
        prevProps.current = props;
    })

}