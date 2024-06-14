/* eslint-disable max-len */
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

type TransitionOptions = {
    shallow?: boolean;
    locale?: string | false;
    scroll?: boolean;
};

const urlSearchParams = queryString.parse(typeof window !== 'undefined' ? window.location.search : '');

/**
 * @description `useCustomRouter` differs from `useRouter(next/router)`
 * by the absence of `push` function overloading, function `push` has one parameter interface
 * @implements when redirecting, save url searchs params of page
 */
export const useCustomRouter = () => {
    const router = useRouter();

    /**
     * Performs a `pushState` with arguments
     * @param url options of the route
     * @param as masks `url` for the browser
     * @param options object you can define `shallow` and other options
     */
    const push = (url: UrlObject, as?: string, options?: TransitionOptions): Promise<boolean> => {
        let query = { ...urlSearchParams };

        if (typeof url.query === 'object') {
            query = Object.assign(query, url.query);
        } else if (typeof url.query === 'string') {
            query = Object.assign(query, queryString.parse(url.query));

            return router.push(
                {
                    ...url,
                    query,
                },
                as,
                options
            );
        }

        return router.push(
            {
                ...url,
                query,
            },
            as,
            options
        );
    };

    return {
        ...router,
        urlSearchParams,
        push,
    };
};
