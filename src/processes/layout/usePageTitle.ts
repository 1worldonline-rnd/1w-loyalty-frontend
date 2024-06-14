import { useEffect } from 'react';
import { appModel } from '@/entities/app';

export const usePageTitle = (params: { title: string; isShowOnMobile?: boolean }) => {
    useEffect(() => {
        if (params.title) {
            appModel.events.pageTitleChanged(params);
        }

        return () => {
            appModel.events.pageTitleChanged({ title: '' });
        };
    }, [params]);
};
