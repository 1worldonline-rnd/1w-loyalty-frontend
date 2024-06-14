// value is the key to translation from i18n
export enum StatisticsWidgetTab {
    general = 'general-tab-title',
    detailed = 'detailed-tab-title',
    // economical = 'economical',
}

export type StatisticsFilterFormValues = {
    widgetConfig?: {
        label: string;
        value: string;
    };
    startDate?: string;
    endDate?: string;
};
