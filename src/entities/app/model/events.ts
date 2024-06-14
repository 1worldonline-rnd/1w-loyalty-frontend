import { createEvent } from 'effector';
import { PartnerId } from '@/shared/api/partner/types';

export const switchedIsMenuOpen = createEvent<boolean | void>();

export const menuClosed = switchedIsMenuOpen.prepend(() => false);

export const pageTitleChanged = createEvent<{ title: string; isShowOnMobile?: boolean }>();

// the event is called when the application has loaded
export const wentToTheApplication = createEvent();

export const redirected = createEvent<{ pathname: string; withoutChecks?: boolean }>();

export const urlSearchParamsSet =
    createEvent<{ partnerId?: PartnerId; location?: string; loyaltyWidgetId?: string }>();

export const toggleOnboarding = createEvent<{ toggle: boolean, isInitial: boolean }>();
