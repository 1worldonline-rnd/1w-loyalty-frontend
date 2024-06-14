/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { useStore } from 'effector-react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FlexboxGrid, Whisper } from 'rsuite';
import type { PropsWithClassName } from '@/shared/utility-types';
import { Logotype } from '@/shared/ui';
import { userModel } from '@/entities/user';
import { PORTAL_URL } from '@/shared/constants';
import { Popover } from '@/shared/rsuite/admin-panel';
import { PageLoader } from '@/app/layout/page-loader';
import { AccountRole } from '@/shared/api/account/types';
import { isAvailableLocalStorage } from '@/shared/lib/isAvailableLocalStorage';

const Menu = styled(({ className }: PropsWithClassName) => {
    const account = useStore(userModel.stores.$account);
    const { t } = useTranslation('common', { keyPrefix: 'userMenu' });

    const handleLogout = () => {
        userModel.effects.logoutFx().then(() => {
            if (isAvailableLocalStorage()) {
                localStorage.removeItem('1w_device_identifier');
            }
            if (typeof window !== undefined) {
                window.location.href = new URL('/#!/login-page', PORTAL_URL).toString();
            }
        });
    };

    const profileSettingsUrl = new URL(`#!/profile/${account?.id}/settings`, PORTAL_URL);

    return (
        <ul className={className}>
            <li>
                <Link href={profileSettingsUrl}>
                    <a target="_blank" rel="noreferrer">
                        {t('profile-settings')}
                    </a>
                </Link>
            </li>
            <li>
                <button onClick={handleLogout}>{t('sign-out')}</button>
            </li>
        </ul>
    );
})`
    display: flex;
    flex-direction: column;
    gap: 10px;

    a,
    button {
        display: block;
        background-color: transparent;
        white-space: nowrap;
        padding: 0;
        text-align: right;
        font-weight: 600;
        width: 100%;
        font-size: 18px;
        line-height: 1;
        color: var(--text-default-color);

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const Header = styled(({ className }: PropsWithClassName) => {
    const account = useStore(userModel.stores.$account);
    const partnerId = useStore(userModel.stores.$partnerId);

    const isAdmin = account?.roles.some((role) =>
        [AccountRole.admin, AccountRole.superAdmin, AccountRole.partnerAdmin].includes(role)
    );

    const { t } = useTranslation('common');

    const portalUrl = new URL(
        isAdmin ? `#!/admin/partners/dashboard/summary/${partnerId}` : '#!/partner/dashboard/summary',
        PORTAL_URL
    );

    return (
        <FlexboxGrid className={className} as="header" align="middle" justify="space-between">
            <FlexboxGrid align="middle">
                <Logotype width={165} />

                <FlexboxGrid
                    as="a"
                    className="link-to-portal"
                    href={String(portalUrl)}
                    target="_blank"
                    rel="noreferrer"
                    align="middle"
                >
                    <FlexboxGrid align="middle" justify="center" className="link-to-portal__icon">
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                            {['M1.75 6L12.25 6', 'M6.25 10.5L1.75 6', 'M6.25 1.5L1.75 6'].map((d) => (
                                <path
                                    key={d}
                                    d={d}
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            ))}
                        </svg>
                    </FlexboxGrid>
                    {t('back-to-portal')}
                </FlexboxGrid>
            </FlexboxGrid>

            <FlexboxGrid align="middle" className="right-side">
                <Whisper
                    placement="bottomEnd"
                    trigger="click"
                    speaker={
                        <Popover>
                            <Menu />
                        </Popover>
                    }
                >
                    <button className="user-info">
                        <div>
                            <p className="user-info__fullname">{account?.fullName}</p>
                        </div>

                        {account?.thumbnailUrl ? (
                            <img
                                className="user-info__avatar"
                                src={account.thumbnailUrl}
                                alt={t('avatar-alternative-text')}
                            />
                        ) : (
                            <FlexboxGrid className="user-info__avatar" align="middle" justify="center">
                                {[account?.first?.charAt(0), account?.last?.charAt(0)]
                                    .filter(Boolean)
                                    .join('')}
                            </FlexboxGrid>
                        )}
                    </button>
                </Whisper>
            </FlexboxGrid>

            <div className="loader-container">
                <PageLoader />
            </div>
        </FlexboxGrid>
    );
})`
    padding: 9px 36px;
    background-color: var(--grey-8-color);
    border-block-end: 1px solid var(--grey-3-color);
    position: relative;
    .loader-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
    }
    .link-to-portal {
        margin-inline-start: 30px;
        color: var(--text-dark-color);
        font-weight: 600;
        text-decoration: none;
        &__icon {
            margin-inline-end: 8px;
            background-color: var(--grey-6-color);
            border-radius: 5px;
            width: 26px;
            height: 34px;
        }

        &:hover .link-to-portal__icon {
            background-color: var(--grey-5-color);
        }
    }

    .right-side {
        position: relative;

        .user-info {
            background-color: transparent;
            display: flex;
            align-items: center;
            padding: 0;
            gap: 6px;

            &__fullname {
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                margin: 0;
                text-align: right;
            }

            &__fullname {
                color: var(--text-dark-color);
            }

            &__avatar {
                display: flex;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 1px solid var(--grey-7-color);
                background-color: rgb(var(--accent-5-color));
                font-size: 16px;
                color: #fff;
                object-fit: cover;
            }

            &:hover .user-info__avatar {
                outline: 3px solid #b0d3f2;
            }
        }
    }
`;
