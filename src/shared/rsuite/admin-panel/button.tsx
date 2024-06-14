import { Button as RsuiteButton, ButtonProps as RsuiteButtonProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';
import styled, { css } from 'styled-components';

export type ButtonProps = Omit<RsuiteButtonProps, 'appearance'> & {
    appearance?: RsuiteButtonProps['appearance'] | 'black' | 'transparent';
};

type ButtonType = RsRefForwardingComponent<'button', ButtonProps>;

const styles = css<ButtonProps>`
    &.rs-btn {
        font-weight: 600;
        line-height: 1;
        border-radius: 5px;
        display: flex;
        outline: none;

        &:focus-visible {
            /* box-shadow: 0px 0px 0px 3px rgba(var(--accent-5-color), 0.25); */
        }

        // colors
        &.rs-btn-primary {
            background-color: var(--main-color, '#02397d');

            &:hover {
                background-color: var(--main-hover-color);
            }
        }

        ${({ appearance }) =>
            appearance === 'black' &&
            css`
                &,
                &:hover,
                &:focus {
                    background-color: var(--text-dark-color) !important;
                    color: #fff !important;
                }
            `}

        ${({ appearance }) =>
            appearance === 'transparent' &&
            css`
                background-color: transparent !important;

                &:hover {
                    background-color: var(--grey-5-color) !important;
                }
            `}

        &.rs-btn-default {
            background-color: var(--grey-6-color);
            color: var(--text-dark-color);

            &:hover {
                background-color: var(--grey-5-color);
            }
        }

        &.rs-btn-subtle {
            color: var(--grey-1-color);
        }
        &.rs-btn-red {
            background-color: rgb(var(--error-color));
            color: #fff;

            &:hover {
                background-color: rgb(var(--error-color));
            }
        }

        &:disabled,
        &:disabled:hover {
            background-color: var(--disabled-color);
            color: var(--text-disabled-color);
            opacity: 1;
        }

        // sizes
        &.rs-btn-lg {
            font-size: 20px;
            padding: 12px 16px;
        }
        &.rs-btn-md {
            font-size: 18px;
            line-height: 20px;
            padding: 10px 14px;
        }
        &.rs-btn-sm {
            font-size: 16px;
            line-height: 18px;
            padding: 9px 14px;
        }
        &.rs-btn-xs {
            font-size: 14px;
            line-height: 16px;
            padding: 6px 12px;
        }
    }
`;

export const Button: ButtonType = styled(({ appearance, ...otherProps }: ButtonProps) => {
    return (
        <RsuiteButton
            {...otherProps}
            appearance={appearance !== 'black' && appearance !== 'transparent' ? appearance : undefined}
        />
    );
})<ButtonProps>`
    ${styles}
`;
