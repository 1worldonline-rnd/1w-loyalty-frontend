import {
    $isMenuOpen,
    $pageTitle,
    $isShowPageTitleOnMobile,
    $parentPageUrl,
    $urlSearchParams,
    $onboardingData,
} from './stores';
import { switchedIsMenuOpen, pageTitleChanged, urlSearchParamsSet, toggleOnboarding } from './events';

$isMenuOpen.on(switchedIsMenuOpen, (currentValue, newValue) => newValue ?? !currentValue);

$pageTitle.on(pageTitleChanged, (_, { title }) => title);

$isShowPageTitleOnMobile.on(pageTitleChanged, (_, { isShowOnMobile = false }) => isShowOnMobile);

$parentPageUrl.on(urlSearchParamsSet, (_, { location }) => location || '');

$urlSearchParams.on(urlSearchParamsSet, (_, urlSearchParams) => urlSearchParams);

$onboardingData.on(toggleOnboarding, (_, value) => value);
