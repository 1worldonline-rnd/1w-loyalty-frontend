import type { ReactNode } from 'react';
import styled from 'styled-components';
import { PropsWithClassName } from '../utility-types';

type WithDotsBetweenElementsProps = JSX.IntrinsicElements['div'] &
    PropsWithClassName<{
        left: ReactNode;
        right: ReactNode;
        classNameOfLeft?: string;
        classNameOfRight?: string;
        backgroundColor?: string;
        dotColor?: string;
    }>;

export const WithDotsBetweenElements = styled(
    ({
        className,
        left,
        right,
        classNameOfLeft,
        classNameOfRight,
        backgroundColor,
        dotColor,
        ...props
    }: WithDotsBetweenElementsProps) => (
        <div className={className} {...props} data-dot-color={dotColor}>
            <div className={classNameOfLeft}>{left}</div>
            <div className={classNameOfRight}>{right}</div>
        </div>
    )
)`
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};

    & > div {
        z-index: 1;
        background-color: inherit;

        &:nth-child(1) {
            padding-inline-end: 6px;
            font-size: 16px;
            line-height: 24px;
            color: var(--text-light-color);
        }

        &:nth-child(2) {
            padding-inline-start: 6px;
            display: flex;
            justify-content: flex-end;
        }
    }

    &::before {
        content: '';
        position: absolute;
        top: 18px;
        width: 100%;
        height: 0;
        line-height: 0;
        border-bottom: 2px dotted ${({ dotColor }) => dotColor || '#fff'};
    }
`;
