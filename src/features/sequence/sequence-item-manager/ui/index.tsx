import styled from 'styled-components';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { SequenceListCreation } from './sequence-list-creation';
import { useEffect } from 'react';
import { getWidgetFeedRelationsFx } from '@/entities/feed/model/effects';
import { widgetConfigModel } from '@/entities/widget-config';
import { useStore } from 'effector-react';

export const SequenceItemManager = styled(({ className }: PropsWithClassName) => {
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);

    useEffect(() => {
        if (activeWidgetConfig?.guid) {
            getWidgetFeedRelationsFx(activeWidgetConfig?.guid);
        }
    }, [activeWidgetConfig]);

    return (
        <div className={className}>
            <SequenceListCreation />
        </div>
    );
})`
    ${styles}
`;
