import styled from 'styled-components';
import { useStore } from 'effector-react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { styles } from './styles';
import { ButtonsList, Container } from '@/shared/ui';
import { appModel } from '@/entities/app';
import { Route } from '@/shared/constants';
import { PropsWithClassName } from '@/shared/utility-types';
import { useCustomRouter } from '@/shared/hooks';
import { EarnIcon, SpendIcon } from '@/shared/ui/icons';
import { UserMenu } from './user-menu';
import { applicationTourStepTargetClassNames } from '@/shared/constants/application-tour';
import { DemoBadge } from './demo-badge';

export const LoyaltyPlatformHeader = styled(({ className }: PropsWithClassName) => {
    const pageTitle = useStore(appModel.stores.$pageTitle);
    const { urlSearchParams, route } = useCustomRouter();
    const { t } = useTranslation('common', { keyPrefix: 'burger-menu' });
    const { t: trans } = useTranslation('common', { keyPrefix: 'sign-up-page' });

    const areLoyaltyFeaturesPages = route === Route.earn || route === Route.redemption;

    return (
        <header className={className} data-are-loyalty-features-pages={areLoyaltyFeaturesPages}>
            <DemoBadge />

            <Container className="header-container">
                <nav>
                    {areLoyaltyFeaturesPages ? (
                        <ButtonsList className="loyalty-features-links">
                            <li
                                className={classNames(
                                    'link link-to-earn',
                                    {
                                        active: route === Route.earn,
                                    },
                                    applicationTourStepTargetClassNames.MAIN_NAVIGATION_EARN
                                )}
                            >
                                <Link href={{ pathname: Route.earn, query: urlSearchParams }}>
                                    <a className="link-to-earn">
                                        <EarnIcon className="link-to-earn" />
                                        {t('link-to-earn')}
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={classNames(
                                    'link link-to-redemption',
                                    {
                                        active: route === Route.redemption,
                                    },
                                    applicationTourStepTargetClassNames.MAIN_NAVIGATION_REDEMPTION
                                )}
                            >
                                <Link
                                    href={{
                                        pathname: Route.redemption,
                                        query: { ...urlSearchParams, section: 'available' },
                                    }}
                                >
                                    <a className="link-to-redemption">
                                        <SpendIcon className="link-to-redemption" /> {t('link-to-redemption')}
                                    </a>
                                </Link>
                            </li>
                        </ButtonsList>
                    ) : (
                        <>
                            <Link href={{ pathname: Route.earn, query: urlSearchParams }}>
                                <a className="link-to-back">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path
                                            d="M16.7708 6.125L8.89584 14L16.7708 21.875"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    <span>{trans('step-back-button')}</span>
                                </a>
                            </Link>

                            {pageTitle && <h1 className="page-title">{pageTitle}</h1>}
                        </>
                    )}

                    <UserMenu className="user-menu" />
                </nav>
            </Container>
        </header>
    );
})`
    ${styles}
`;
