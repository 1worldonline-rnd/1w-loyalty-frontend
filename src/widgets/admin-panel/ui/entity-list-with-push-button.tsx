import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { Button } from '@/shared/rsuite/admin-panel';
import { PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

type EntityListWithPushButtonProps = PropsWithClassName<{
    entityList: Array<{ id: string | number; name: string }>;
    onPush: (entityId: string | number) => void;
}>;

const EntityListWithPushButtonUnstyled = (props: EntityListWithPushButtonProps) => {
    const { entityList, onPush, className } = props;
    const { t, i18n } = useTranslation('common', { keyPrefix: 'sequences' });

    const { asPath } = useCustomRouter();

    return (
        <ul className={className}>
            {entityList.map(({ id, name }) => {
                return (
                    <li key={id}>
                        <span>{name}</span>

                        <Button
                            className={classNames('button-to-redirect', {
                                'button-to-redirect--active': Boolean(asPath.includes(String(id))),
                            })}
                            size="md"
                            onClick={() => {
                                onPush(String(id));
                            }}
                        >
                            {t('manage')}
                        </Button>
                    </li>
                );
            })}
        </ul>
    );
};

export const EntityListWithPushButton = styled(EntityListWithPushButtonUnstyled)`
    li {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 20px 26px 20px 0;
        border-block-end: 1px solid var(--grey-5-color);

        &:first-of-type {
            border-block-start: 1px solid var(--grey-5-color);
        }

        & span {
            position: absolute;
            left: 0;
            font-weight: 600;
            font-size: 18px;
            color: var(--text-default-color);
            white-space: nowrap;
            overflow: hidden;
            z-index: -1;
        }

        .button-to-redirect {
            flex-shrink: 0;
            position: relative;
            overflow: visible;
            padding: 10px 14px;
            font-weight: 600;
            font-size: 18px;
            color: var(--text-dark-color);
            background-color: var(--grey-7-color);

            &--active {
                background-color: var(--grey-6-color);
            }

            &::before {
                content: '';
                position: absolute;
                z-index: -1;
                width: 30px;
                height: 40px;
                left: -30px;
                top: 0;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 82.81%);
            }

            &::after {
                content: '';
                position: absolute;
                top: 0;
                z-index: -1;
                right: -26px;
                height: 100%;
                width: 26px;
                background-color: #fff;
            }
        }
    }
`;
