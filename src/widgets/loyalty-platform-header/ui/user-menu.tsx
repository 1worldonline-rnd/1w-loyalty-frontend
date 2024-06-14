import { Avatar, CoinsCount } from '@/shared/ui';
import { Menu } from './menu';
import { userModel } from '@/entities/user';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { PropsWithClassName } from '@/shared/utility-types';
import { useWidgetAccentColor } from '@/shared/hooks';
import { numberFormatter } from '@/shared/lib/numberFormatter';
import { applicationTourStepTargetClassNames } from '@/shared/constants/application-tour';
import classNames from 'classnames';

export const UserMenu = styled(({ className }: PropsWithClassName) => {
    const account = useStore(userModel.stores.$account);
    const accountAttachedToPartner = useStore(userModel.stores.$accountAttachedToPartner);
    const accentColor = useWidgetAccentColor();

    if (accountAttachedToPartner === 'DOES_NOT_EXIST') {
        return null;
    }

    return (
        <div className={className}>
            <div className="first-row">
                <CoinsCount
                    className={applicationTourStepTargetClassNames.MAIN_NAVIGATION_POINT_BALANCE}
                    coinsCount={numberFormatter(account?.convertiblePoints || 0, 1)}
                    accentColor={accentColor}
                    isFinished={false}
                />

                <Avatar className="avatar" thumbnailUrl={account?.thumbnailUrl} />

                <Menu
                    className={classNames(
                        'menu',
                        applicationTourStepTargetClassNames.MAIN_NAVIGATION_LOYALTY_MENU
                    )}
                />
            </div>

            <p className="username">
                {[accountAttachedToPartner?.firstName, accountAttachedToPartner?.lastName].join(' ')}
            </p>
        </div>
    );
})`
    .first-row {
        display: flex;
        align-items: center;
        gap: 12px;

        & > *:nth-child(2) {
            place-self: center;
        }

        & > *:last-child {
            margin-inline-start: 4px;
        }
    }

    .username {
        display: none;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        color: var(--text-dark-color);
        text-align: center;
        margin-block-start: 10px;
    }

    @media (max-width: 1201px) {
        width: 100%;

        .first-row {
            justify-content: space-between;

            .avatar {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        .username {
            display: block;
        }
    }
`;
