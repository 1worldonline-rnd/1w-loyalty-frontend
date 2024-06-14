import styled, { css } from 'styled-components';
import { useState, PropsWithChildren, ReactNode } from 'react';
import { Nullable, PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';

type TooltipProps = PropsWithChildren<
    PropsWithClassName<{
        content: ReactNode;
        direction?: 'top' | 'bottom';
        event?: 'click' | 'hover';
    }>
>;

const DEFAULT_DIRECTION: TooltipProps['direction'] = 'top';

const DEFAULT_EVENT: TooltipProps['event'] = 'click';

export const Tooltip = styled((props: TooltipProps) => {
    const { children, className, content, event = DEFAULT_EVENT } = props;

    const [isShowTooltip, setIsShowTooltip] = useState(false);
    const [timer, setTimer] = useState<Nullable<NodeJS.Timeout>>(null);

    const handleClick = () => {
        if (event === 'click') {
            if (timer) clearTimeout(timer);

            setIsShowTooltip(true);

            setTimer(setTimeout(() => setIsShowTooltip(false), 2000));
        }
    };

    const handleMouseEnter = () => {
        if (event === 'hover') {
            setIsShowTooltip(true);
        }
    };

    const handleMouseLeave = () => {
        if (event === 'hover') {
            setIsShowTooltip(false);
        }
    };

    return (
        <div
            className={classNames(className, 'tooltip-wrapper', { 'is-show-tooltip': isShowTooltip })}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="tooltip">{content}</div>

            {children}
        </div>
    );
})`
    position: relative;

    .tooltip {
        ${({ theme: { mode } }) => css`
            background-color: ${mode === 'dark' ? 'var(--grey-1-color)' : '#fff'};
            box-shadow: ${mode === 'dark'
                ? '0px 3px 6px 0px rgba(0, 0, 0, 0.06)'
                : '0px 3px 15px -3px rgba(86, 99, 104, 0.19);'};
        `}
        color: var(--text-default-color);
        padding: 8px 12px;
        position: absolute;
        opacity: 0;
        transition: all 100ms ease-in-out;
        border-radius: 4px;
        font-size: 16px;
        line-height: 18px;
        z-index: 2;
        font-weight: 600;
        pointer-events: none;
        transform: translateY(0) translateX(-50%);
        left: 50%;

        &::before {
            content: '';
            display: block;
            position: absolute;
            transform-origin: center;
            z-index: 1;
            width: 12px;
            height: 12px;
            clip-path: polygon(100% 0, 100% 100%, 0 100%);
            left: 50%;

            ${({ theme: { mode } }) => css`
                background-color: ${mode === 'dark' ? 'var(--grey-1-color)' : '#fff'};
                box-shadow: ${mode === 'dark'
                    ? '0px 3px 6px 0px rgba(0, 0, 0, 0.06)'
                    : '0px 3px 15px -3px rgba(86, 99, 104, 0.19);'};
            `}
        }
    }

    &.is-show-tooltip .tooltip {
        opacity: 1;
        pointer-events: initial;
    }

    ${({ direction = DEFAULT_DIRECTION }) => {
        if (direction === 'top') {
            return css`
                .tooltip {
                    top: -14px;

                    &::before {
                        bottom: -6px;
                        transform: translateX(-50%) rotate(45deg);
                    }
                }

                &.is-show-tooltip .tooltip {
                    transform: translateY(-100%) translateX(-50%);
                }
            `;
        } else if (direction === 'bottom') {
            return css`
                .tooltip {
                    bottom: -14px;

                    &::before {
                        top: -6px;
                        transform: translateX(-50%) rotate(-135deg);
                    }
                }

                &.is-show-tooltip .tooltip {
                    transform: translateY(100%) translateX(-50%);
                }
            `;
        }
    }}
`;
