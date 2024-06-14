import type { PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';
import styled from 'styled-components';

export type BurgerMenuButtonProps = PropsWithClassName<{
    onClick: () => void;
    isOpen: boolean;
}>;

export const BurgerMenuButton = styled(({ className, isOpen, onClick }: BurgerMenuButtonProps) => (
    <button className={classNames(className, { open: isOpen })} onClick={onClick}>
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
    </button>
))`
    cursor: pointer;
    display: block;
    width: 30px;
    height: 20px;
    background-color: transparent;
    border: none;
    position: relative;
    padding: 0;

    .bar1,
    .bar2,
    .bar3 {
        --height: 3px;
        position: absolute;
        width: 30px;
        height: var(--height);
        border-radius: 2px;
        background-color: var(--colors-text-main);
        transition: all 150ms ease-in-out;
        transform-origin: center;
    }

    .bar1 {
       top: 0;
    }

    .bar2 {
        top: calc(50% - var(--height) / 2);
    }

    .bar3 {
       top: calc(100% - var(--height));
    }

    &.open .bar1 {
        position: absolute;
        top: calc(50% - var(--height) / 2);
        transform: rotate(-45deg);
    }

    &.open .bar2 {
        opacity: 0;
    }

    &.open .bar3 {
        position: absolute;
        top: calc(50% - var(--height) / 2);
        transform: rotate(45deg);
    }
`;
