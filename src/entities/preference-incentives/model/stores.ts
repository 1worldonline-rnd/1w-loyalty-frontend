import { createStore } from 'effector';
import { PreferenceIncentives } from '@/shared/api/widget-config/types';
import { Nullable } from '@/shared/utility-types';

export const $preferenceIncentives = createStore<Nullable<PreferenceIncentives>>(null);
