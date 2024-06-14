import { useWidgetAccentColor } from '@/shared/hooks';
import { CoinsCount } from '@/shared/ui';
import { GullIcon } from '@/shared/ui/icons';
import { PropsWithClassName } from '@/shared/utility-types';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';

type SocialActivityCardProps = PropsWithClassName & {
    icon: React.ReactNode;
    title: string;
    isFinished: boolean;
    points: number;
};

export const SocialActivityCard = ({
    icon,
    title,
    points,
    isFinished,
    className,
}: SocialActivityCardProps) => {
    const accentColor = useWidgetAccentColor();
    return (
        <SocialActivityCardStyled className={className} color={accentColor}>
            <FlexboxGrid className="title" align="middle" justify="center">
                <span className="icon">{icon}</span>
                {title}
            </FlexboxGrid>

            <span className="social-subscribe">
                <div className='result-icon'>{isFinished ? <GullIcon /> : '+'}</div>
                <CoinsCount
                    coinsCount={points}
                    accentColor={isFinished ? 'var(--text-default-color)' : accentColor}
                    size="sm"
                    isFinished={isFinished}
                />
            </span>
        </SocialActivityCardStyled>
    );
};

const SocialActivityCardStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    width: 155px;
    background-color: ${({ theme }) => theme.mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
    border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-7-color)'};
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    padding: 12px 8px 10px;

    .title {
        gap: 6px;
        font-weight: 600;
        line-height: 19px;
        color: var(--text-light-color);
    }
   
    .social-subscribe {
        font-size: 17px;
        font-weight: 700 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        font-weight: 600;
        letter-spacing: 1px;
        color: ${({ color }) => color};
        .result-icon {
            display: flex;
        }
    }
`;
