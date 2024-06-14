import { useEffect } from 'react';
import { useCustomRouter } from '@/shared/hooks';
import { Route } from '@/shared/constants';

/**
 * @description to implement localization on the 404 page, we make a redirect to a custom page
 * @link https://nextjs.org/docs/messages/404-get-initial-props
 * @implements localization on the 404 page
 */
const NotFound = () => {
    const { push, asPath } = useCustomRouter();

    useEffect(() => {
        if (asPath.startsWith('/loyalty')) {
            const url = new URL(window.location.href);
            const pathname = url.pathname.replace('/loyalty', '');

            push({ pathname });
        } else {
            push({ pathname: Route.notFound }, asPath);
        }
    }, [asPath, push]);

    return null;
};

export default NotFound;
