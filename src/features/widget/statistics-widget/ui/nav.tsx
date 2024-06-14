import { Button } from 'rsuite';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { PropsWithClassName } from '@/shared/utility-types';
import { StatisticsWidgetTab } from '../types';
import { statisticsWidgetModel } from '../model';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';

export const StatisticsWidgetNavigation = styled(({ className }: PropsWithClassName) => {
    const { urlSearchParams } = useCustomRouter();
    const activeTab = useStore(statisticsWidgetModel.stores.$activeTab);

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.statistic' });

    return (
        <nav className={className}>
            <ul>
                {Object.values(StatisticsWidgetTab).map((tab) => (
                    <li key={tab}>
                        <Button
                            appearance={activeTab === tab ? 'primary' : 'default'}
                            onClick={() => statisticsWidgetModel.events.activeTabChanged(tab)}
                        >
                            {t(tab)}
                        </Button>
                    </li>
                ))}

                <li>
                    <Link
                        href={{
                            pathname: Route.admin.widgets,
                            query: urlSearchParams,
                        }}
                    >
                        <a className="rs-btn rs-btn-primary">{t('link-to-widgets-list')}</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
})`
    margin-block-end: 20px;

    ul {
        display: flex;

        li:not(:last-child) {
            margin-inline-end: 20px;
        }

        li:last-child {
            margin-inline-start: auto;
        }
    }
`;
