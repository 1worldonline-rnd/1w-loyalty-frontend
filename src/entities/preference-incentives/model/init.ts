import { $preferenceIncentives } from './stores';
import { getPreferenceIncentivesFx, updatePreferenceIncentivesFx } from './effects';

$preferenceIncentives
    .on(getPreferenceIncentivesFx.doneData, (_, { data }) => data)
    .on(updatePreferenceIncentivesFx.doneData, (_, { data }) => data);
