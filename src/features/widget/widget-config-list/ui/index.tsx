/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { SortingDirection, Table, TextWithEllipsis } from '@/shared/ui';
import { useCustomRouter, useInfiniteScrollingEntities, useSortable } from '@/shared/hooks';
import type { WidgetConfig } from '@/shared/api/widget-config/types';
import { styles } from './styles';
import { Button } from '@/shared/rsuite/admin-panel';
import { Route } from '@/shared/constants';
import { widgetConfigModel } from '@/entities/widget-config';

const { Td, Th, Tr } = Table;

export const WidgetConfigList = styled(() => {
    const widgetConfigs = useStore(widgetConfigModel.stores.$widgetConfigs);

    const { push } = useCustomRouter();

    const { sortedData, handleSorting, sortField, sortOrder } = useSortable<WidgetConfig>(widgetConfigs);

    const { entities: widgets, onLastEntityRefChange } = useInfiniteScrollingEntities({
        entities: sortedData,
    });

    const { t, i18n } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });
    const { t: translationLoyaltyPages } = useTranslation('common', { keyPrefix: 'widget-managers-tabs' });
    const { t: translationEvents } = useTranslation('common', { keyPrefix: 'events' });

    return (
        <div>
            <Table
                noDataComponent={translationEvents('message-if-pages-not-exist')}
                templateColumns={[3, 1, 2]}
                head={
                    <Tr>
                        <Th>
                            <button onClick={() => handleSorting('name')}>
                                {translationLoyaltyPages('name')}
                                {sortField === 'name' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th>
                            <button onClick={() => handleSorting('locale')}>
                                {translationLoyaltyPages('language')}
                                {sortField === 'locale' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th />
                    </Tr>
                }
                body={widgets.map((widget, index, { length }) => {
                    const props: Parameters<typeof Tr>[0] = {};

                    if (index === length - 1) {
                        props.ref = onLastEntityRefChange;
                    }
                    return (
                        <Tr key={widget.guid} {...props}>
                            <Td>
                                <TextWithEllipsis>{widget.name}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>{i18n.t(widget.locale)}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <FlexboxGrid justify="end" style={{ gap: 12, width: '100%' }}>
                                    <Button
                                        size="md"
                                        onClick={() => {
                                            push({
                                                pathname: Route.admin.widgetStatistic(widget.guid),
                                            });
                                        }}
                                    >
                                        {translationLoyaltyPages('statistic')}
                                    </Button>
                                    <Button
                                        size="md"
                                        onClick={() => {
                                            push({
                                                pathname: Route.admin.widgetManager(widget.guid),
                                            });
                                        }}
                                    >
                                        {translationLoyaltyPages('manage')}
                                    </Button>
                                </FlexboxGrid>
                            </Td>
                        </Tr>
                    );
                })}
            />
        </div>
    );
})`
    ${styles}
`;
