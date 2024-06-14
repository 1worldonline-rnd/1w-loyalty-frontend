/* eslint-disable max-len */
import { Input as RsuiteInput, InputProps as RsuiteInputProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';
import styled, { css } from 'styled-components';

export type InputProps = RsuiteInputProps & { hasError?: boolean };

type InputType = RsRefForwardingComponent<'input', InputProps>;

export const Input: InputType = styled(({ hasError: _, ...props }: InputProps) => (
    <RsuiteInput {...props} />
))<InputProps>`
    &.rs-input {
        border-radius: 4px;
        border-color: var(--grey-5-color);
        color: var(--text-default-color);

        ${({ theme: { mode } }) => css`
            background-color: ${mode === 'dark' ? 'var(--grey-1-color)' : '#fff'};
        `}

        &::placeholder {
            font-weight: 400;
        }
 
        &:focus {
            box-shadow: 0 0 0 3px rgba(var(--accent-primary-color), 0.14);
        }

        &:focus,
        &:hover:not(:disabled) {
            border-color: rgb(var(--accent-primary-color));
        }

        &:disabled {
            background-color: var(--disabled-color);
            color: var(--text-disabled-color);
            border-color: var(--disabled-color);
        }

        ${({ hasError }) => hasError && css`
            border-color: rgb(var(--error-color));

            &:focus {
                box-shadow: 0 0 0 3px rgba(var(--error-color), 0.14);
            }

            &:focus,
            &:hover:not(:disabled) {
                border-color: rgb(var(--error-color));
            }
        `}

        &:not(:disabled):-webkit-autofill,
        &:not(:disabled):-webkit-autofill:hover,
        &:not(:disabled):-webkit-autofill:focus,
        &:not(:disabled):-webkit-autofill:active {
            box-shadow: 0 0 0 30px ${({ theme: { mode } }) => (mode === 'dark' ? 'var(--grey-1-color)' : '#fff')} inset !important;
        }
    }

    &.rs-input-lg {
        padding: 12px 14px;
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
    }
`;
