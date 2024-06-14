import styled, { css } from 'styled-components';
import { useTranslation } from 'next-i18next';
import { PropsWithClassName } from '@/shared/utility-types';
import { AvatarIcon } from './icons';

type AvatarProps = PropsWithClassName & {
    width?: number;
    thumbnailUrl: string | undefined;
};

const AVATAR_DEFAULT_WIDTH = 48;

const styles = css<AvatarProps>`
    width: ${(props) => props.width || AVATAR_DEFAULT_WIDTH}px;
    height: ${(props) => props.width || AVATAR_DEFAULT_WIDTH}px;
    border-radius: 50%;
    background-color: var(--grey-3-color);
    overflow: hidden;
    display: grid;
    place-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    svg {
        fill: #cdcdcd;
        width: calc(50 / 86 * 100%);
        height: calc(58 / 86 * 100%);
    }
`;

export const Avatar = styled(({ className, width = AVATAR_DEFAULT_WIDTH, thumbnailUrl }: AvatarProps) => {
    const { t } = useTranslation('common');
    return (
        <div className={className}>
            {thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumbnailUrl} width={width} height={width} alt={t('avatar-alternative-text')} />
            ) : (
                <AvatarIcon />
            )}
        </div>
    );
})`
    ${styles}
`;
