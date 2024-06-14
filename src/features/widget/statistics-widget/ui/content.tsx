import { useStore } from 'effector-react';
import { DefaultTheme, StyledComponent } from 'styled-components';
import { statisticsWidgetModel } from '../model';
import { StatisticsWidgetTab } from '../types';
import {
    StatisticsWidgetDetailed,
    // StatisticsWidgetEconomical,
    StatisticsWidgetGeneral,
} from './tabs';

type Tabs = {
    [key in StatisticsWidgetTab]: StyledComponent<() => JSX.Element, DefaultTheme>;
};

const tabs: Tabs = {
    [StatisticsWidgetTab.general]: StatisticsWidgetGeneral,
    [StatisticsWidgetTab.detailed]: StatisticsWidgetDetailed,
    // [StatisticsWidgetTab.economical]: StatisticsWidgetEconomical,
};

export const StatisticsWidgetContent = () => {
    const activeTab = useStore(statisticsWidgetModel.stores.$activeTab);

    const ActiveTab = tabs[activeTab];

    return <ActiveTab />;
};
