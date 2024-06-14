import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SlimLineLoader } from '@/shared/ui';

export const PageLoader = () => {
    const { events } = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleRouteChangeStart = () => setIsLoading(true);
        const handleRouteChangeComplete = () => setIsLoading(false);

        events.on('routeChangeStart', handleRouteChangeStart);
        events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            events.off('routeChangeStart', handleRouteChangeStart);
            events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [events]);

    return <SlimLineLoader height={4} isLoading={isLoading} />;
};
