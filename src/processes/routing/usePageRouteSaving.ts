import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCustomRouter } from '@/shared/hooks';
import { isAvailableLocalStorage } from '@/shared/lib/isAvailableLocalStorage';

export const useRouteSave = () => {
    const { query, pathname: currentPathname } = useRouter();
    const [isFirstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (query.iframeName && !isFirstLoad && isAvailableLocalStorage()) {
            localStorage.setItem('1wo-iframeCurrentPathname', currentPathname);
        }
        setFirstLoad(false);
    });
};

export const useRouteRedirect = () => {
    const { query, pathname: currentPathname } = useRouter();
    const { push } = useCustomRouter();
    const [isFirstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (isAvailableLocalStorage()) {
            const lsPathname = localStorage.getItem('1wo-iframeCurrentPathname');
            if (currentPathname === '/earn') {
                if (isFirstLoad && lsPathname && query.iframeName) {
                    setFirstLoad(false);
                    push({ pathname: lsPathname });
                }
            }
        }
    });
};
