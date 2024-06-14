import styled from 'styled-components';
import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { StatisticsWidgetNavigation } from './nav';
import { StatisticsWidgetFilters } from './filters';
import { widgetConfigModel } from '@/entities/widget-config';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { statisticsWidgetModel } from '../model';
import { StatisticsWidgetContent } from './content';
import { Loader } from '@/shared/ui';

export const StatisticsWidget = styled(({ className }: PropsWithClassName) => {
    const {
        query: { widgetId },
    } = useRouter();

    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);
    const isLoadingStatisticsWidget = useStore(statisticsWidgetModel.stores.$isLoadingWidgetStatisctics);

    useEffect(() => {
        if (widgetId) {
            widgetConfigModel.events.setActiveWidgetConfigId(String(widgetId));
        }
    }, [widgetId]);

    useEffect(() => {
        return () => {
            statisticsWidgetModel.events.statisticsWidgetModelReset();
        };
    }, []);

    return (
        activeWidgetConfig && (
            <div className={className}>
                {isLoadingStatisticsWidget && (
                    <Loader className="loader" color="rgb(var(--accent-primary-color))" />
                )}

                <StatisticsWidgetNavigation />

                <StatisticsWidgetFilters />

                <StatisticsWidgetContent />
            </div>
        )
    );
})`
    ${styles}
`;
