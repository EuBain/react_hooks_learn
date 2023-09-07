import { ParseOptions, StringifyOptions, parse, stringify } from "querystring";
import rc from 'react-router-dom'
import useUpdate from "@/hooks/Effect/useUpdate";
import { useMemo, useRef } from "react";
import useMemoizedFn from "@/hooks/Advanced/useMemoizedFn";

export interface Options {
    navigateMode?: 'push' | 'replace',
    parseOptions?: ParseOptions,
    stringifyOptions?: StringifyOptions,
}

type UrlState = Record<string, any>;

const baseParseConfig: ParseOptions = {
    parseNumebrs: false,
    parseBooleans: false,
}

const baseStringifyConfig: StringifyOptions = {
    skipNull: false,
    skipEmptyString: false,
}


const useUrlState = <S extends UrlState = UrlState>(
    initialState?: S | (() => S),
    options?: Options,
) => {
    type State = Partial<{ [key in keyof S]: any}>;

    const { navigateMode = 'push', parseOptions, stringifyOptions} = options || {}

    const mergedParseOptions = {...baseParseConfig, ...parseOptions};

    const mergeStringifyOptions = {...baseStringifyConfig, ...stringifyOptions}

    const location = rc.useLocation()

   //@ts-expect-error 
    const history = rc.useHistory?.()

    const navigate = rc.useNavigate?.()

    const update =useUpdate();

    const initialStateRef = useRef(
        typeof initialState === 'function' ? (initialState as () => S)() :
        initialState || {},
    );

    const queryFromUrl = useMemo(() => {
        return parse(location.search,mergedParseOptions);
    }, [location.search]);

    const targetQuery: State = useMemo(
        () => ({
            ...initialStateRef.current,
            ...queryFromUrl,
        }),
        [queryFromUrl],
    );

    const setState = (s: React.SetStateAction<State>) => {
        const newQuery = typeof s === 'function' ? s(targetQuery) : s;
   

        update();
        if (history) {
            history[navigateMode](
                {
                    hash: location.hash,
                    search: stringify({...queryFromUrl, ...newQuery},
                        mergeStringifyOptions) || '?'
                },
                location.state,
            );
        }
        if (navigate) {
            navigate(
                {
                    hash: location.hash,
                    search: stringify({...queryFromUrl, ...newQuery},
                        mergeStringifyOptions) || '?',
                },
                {
                    replace: navigateMode === 'replace',
                    state: location.state,
                }
            );
        }
    };

    return [targetQuery, useMemoizedFn(setState)] as const;

};

export default useUrlState