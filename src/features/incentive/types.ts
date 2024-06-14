import { ReactText } from 'react';

export enum EventFields {
    // value is key for translate
    actionType = 'action-type',
    name = 'event-name',
    rewardAmount = 'reward-amount',
    limitsDaily = 'limits-daily-per-user',
    limitsMonthly = 'limits-monthly-per-user',
}

export enum EventActionType {
    // value is key for translate
    click = 'click',
}

export type EventFormValues = {
    [EventFields.name]: string;
    [EventFields.actionType]: ReactText;
    [EventFields.rewardAmount]: ReactText;
    [EventFields.limitsDaily]: ReactText;
    [EventFields.limitsMonthly]: ReactText;
};
