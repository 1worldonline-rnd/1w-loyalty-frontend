import { createStore } from 'effector';
import type { ParsedQuery } from 'query-string';
import type { Nullable } from '@/shared/utility-types';

export const $isMenuOpen = createStore(false);

export const $pageTitle = createStore('');

export const $isShowPageTitleOnMobile = createStore(false);

export const $parentPageUrl = createStore('');

export const $urlSearchParams = createStore<Nullable<ParsedQuery<string>>>(null);

export const $onboardingData = createStore({ toggle: false, isInitial: false });
