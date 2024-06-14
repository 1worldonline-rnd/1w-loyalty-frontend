import styled from 'styled-components';
import { PropsWithClassName } from '../utility-types';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';
import { whichCoinShow } from '../lib/whichCoinShow';
import { FlexboxGrid } from 'rsuite';

type CoinsCountProps = PropsWithClassName & {
    coinsCount: number | string;
    size?: 'xs' | 'sm' | 'md';
    accentColor?: string;
    appearance?: 'default' | 'outlined';
    isFinished: boolean;
    withTicket?: boolean;
};

export const CoinsCount = ({
    className,
    coinsCount,
    size = 'md',
    accentColor,
    appearance = 'default',
    isFinished = false,
    withTicket = false,
}: CoinsCountProps) => {
    const widgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);

    return (
        <CoinsCountStyled className={className} size={size} color={accentColor} appearance={appearance}>
            <span>{typeof coinsCount === 'string' ? coinsCount : Math.floor(coinsCount)}</span>

            {widgetConfig && <div className="icon-container">{whichCoinShow(isFinished, widgetConfig)}</div>}

            {withTicket && (
                <>
                    <svg width="14" height="14" fill="none">
                        <g
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                        >
                            <path d="M10.063 10.063 3.936 3.936M10.063 3.938l-6.126 6.124" />
                        </g>
                    </svg>

                    <FlexboxGrid align="middle">
                        <svg width="16" height="16" fill="none">
                            <g fill="currentColor">
                                <path d="M12.746 4.965V1.902c0-.757-.605-1.362-1.361-1.362l-1.23.02c-.15 0-.302.113-.34.302-.132.926-.888 1.57-1.834 1.57-.945 0-1.683-.663-1.834-1.57-.019-.17-.17-.284-.34-.303h-1.21c-.757 0-1.362.605-1.362 1.362v3.063l9.511-.019ZM3.254 5.646l.019 8.452c0 .757.605 1.362 1.361 1.362h1.21c.152 0 .303-.114.34-.303.133-.926.89-1.57 1.835-1.57s1.683.663 1.834 1.57c.019.17.17.284.34.303h1.21c.757 0 1.362-.605 1.362-1.362V5.627l-9.511.019Zm6.429 5.37H6.317v-.68h3.366v.68Zm.473-1.494H5.844v-.718h4.312v.718Z" />
                            </g>
                        </svg>
                        <span style={{ marginLeft: 3 }}>1</span>
                    </FlexboxGrid>
                </>
            )}
        </CoinsCountStyled>
    );
};

const CoinsCountStyled = styled.span<Pick<CoinsCountProps, 'size' | 'appearance'>>`
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: 700;
    font-size: ${({ size }) => (size === 'md' ? '20px' : '17px')};
    line-height: ${({ size }) => (size === 'md' ? '20px' : '23px')};

    span {
        line-height: 1;
        color: ${({ color }) => color};
    }

    svg {
        color: ${({ color }) => color};
    }

    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: ${({ size }) => {
            if (size === 'xs') {
                return '18px';
            }
            if (size === 'sm') {
                return '20px';
            }

            return '28px';
        }} !important;
        height: ${({ size }) => {
            if (size === 'xs') {
                return '18px';
            }
            if (size === 'sm') {
                return '20px';
            }

            return '28px';
        }} !important;
        overflow: visible;
        border-radius: 50%;
        position: relative;

        ${({ appearance }) =>
            appearance === 'outlined' &&
            `
            &::before {
                content: '';
                z-index: 1;
                display: block;
                position: absolute;
                top: -2px;
                left: -2px;
                width: 22px;
                height: 22px;
                background-color: #fff;
                border-radius: 50%;
            }
        `};

        svg,
        img {
            z-index: 2;
            width: 100%;
            height: 100%;
            color: ${({ color }) => color};
        }
    }
`;
