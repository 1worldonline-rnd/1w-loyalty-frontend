/* eslint-disable max-len */
import { Button as RsuiteButton, ButtonProps as RsuiteButtonProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';
import styled, { css } from 'styled-components';

export type ButtonProps = Omit<RsuiteButtonProps, 'appearance'> & {
    appearance?: RsuiteButtonProps['appearance'] | 'black';
};

type ButtonType = RsRefForwardingComponent<'button', ButtonProps>;

export const Button: ButtonType = styled(({ appearance, ...otherProps }: ButtonProps) => {
    return <RsuiteButton {...otherProps} appearance={appearance !== 'black' ? appearance : undefined} />;
})<ButtonProps>`
    &.rs-btn {
        transition: all ease-in-out 0.3s;
        border-color: var(--grey-5-color);
        background-color: ${({ theme }) =>
            theme.mode === 'dark' ? 'var(--grey-3-color)' : 'var(--grey-7-color)'};
        color: var(--text-default-color);

        &:focus,
        &:hover:not(:disabled) {
            border-color: rgb(var(--accent-primary-color));
        }

        border-radius: 4px;
        font-weight: 700;

        &:focus-visible {
            outline: none;
        }

        &:disabled {
            background-color: var(--disabled-color);
            color: var(--text-disabled-color);
        }

        &:focus {
            box-shadow: 0 0 0 3px rgba(var(--accent-primary-color), 0.14);
        }
    }

    &.rs-btn-lg {
        padding: 12px 14px;
    }

    &.rs-btn-primary {
        background-color: rgb(var(--accent-primary-color));
        color: ${({ theme: { mode } }) => (mode === 'dark' ? '#fff' : 'var(--grey-6-color)')};
    }

    &.rs-btn-subtle:hover,
    &.rs-btn-subtle:focus {
        background-color: var(
            --${({ theme: { mode } }) => (mode === 'dark' ? 'grey-3-color' : 'grey-6-color')}
        );
    }

    ${({ appearance }) =>
        appearance === 'black' &&
        css`
            &,
            &:hover,
            &:focus {
                background-color: var(
                    --${({ theme: { mode } }) => (mode === 'dark' ? 'grey-4-color' : 'text-default-color')}
                );
                color: ${({ theme: { mode } }) => (mode === 'dark' ? 'var(--text-dark-color)' : '#fff')};
            }
        `}
`;
