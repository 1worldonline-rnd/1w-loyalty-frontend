import { forwardRef } from 'react';
import { Input as RsuiteInput, InputProps as RsuiteInputProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';
import styled, { css } from 'styled-components';

export type InputProps = RsuiteInputProps & { hasError?: boolean };

type InputType = RsRefForwardingComponent<'input', InputProps>;

export const Input: InputType = styled(forwardRef(({ hasError, className, ...props }: InputProps, ref) => {
    return (
        <div className={className}>
            <RsuiteInput {...props} ref={ref}/>

            {hasError && (
                <svg className="error-icon" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        // eslint-disable-next-line max-len
                        d="M11 2.44446C9.30789 2.44446 7.65376 2.94623 6.24681 3.88633C4.83985 4.82643 3.74326 6.16262 3.09571 7.72594C2.44816 9.28927 2.27874 11.0095 2.60885 12.6691C2.93897 14.3287 3.75381 15.8532 4.95033 17.0497C6.14684 18.2462 7.6713 19.0611 9.33091 19.3912C10.9905 19.7213 12.7108 19.5519 14.2741 18.9043C15.8374 18.2568 17.1736 17.1602 18.1137 15.7532C19.0538 14.3463 19.5556 12.6921 19.5556 11C19.5556 8.73094 18.6542 6.5548 17.0497 4.95032C15.4452 3.34584 13.2691 2.44446 11 2.44446ZM11.0001 12.4759C10.7542 12.4759 10.5185 12.3783 10.3447 12.2045C10.1709 12.0307 10.0732 11.7949 10.0732 11.5491V7.27132C10.0732 7.0255 10.1709 6.78976 10.3447 6.61594C10.5185 6.44212 10.7542 6.34447 11.0001 6.34447C11.2459 6.34447 11.4816 6.44212 11.6554 6.61594C11.8293 6.78976 11.9269 7.0255 11.9269 7.27132V11.5491C11.9269 11.7949 11.8293 12.0307 11.6554 12.2045C11.4816 12.3783 11.2459 12.4759 11.0001 12.4759ZM12.0339 14.5795C12.0339 15.1702 11.5551 15.649 10.9645 15.649C10.3739 15.649 9.89506 15.1702 9.89506 14.5795C9.89506 13.9889 10.3739 13.5101 10.9645 13.5101C11.5551 13.5101 12.0339 13.9889 12.0339 14.5795Z"
                        fill="currentColor"
                    />
                </svg>
            )}
        </div>
    );
}))<InputProps>`
    position: relative;

    &:focus-visible {
        outline: none;
    }

    ${({ hasError }) => hasError && css`
        color: rgb(var(--error-color));
    `}

    ${({ as }) => as === 'textarea' && css`&,`}

    .rs-input {
        line-height: 1;
        padding-inline: 12px;
        border-radius: 5px;
        border: 1px solid var(--grey-3-color);
        width: 100%;
        color: var(--text-default-color);

        &-lg {
            min-height: 40px;
        }

        &-sm {
            min-height: 36px;
            font-size: 16px;
        }

        ${({ hasError }) =>
            hasError &&
            css`
                padding-inline-end: 42px;
            `}

        &:focus {
            box-shadow: none;
        }

        &:focus-visible {
            box-shadow: 0px 0px 0px 3px rgba(var(--accent-5-color), 0.25);
        }

        &:not(:disabled):hover,
        &:not(:disabled):focus-visible {
            border-color: rgb(var(--accent-5-color));
        }

        &::placeholder {
            font-size: 16px;
            color: var(--grey-2-color);
        }

        &:disabled {
            color: var(--text-disabled-color);
            background-color: var(--disabled-color);
        }
    }

    .error-icon {
        position: absolute;
        right: 11px;
        top: 50%;
        transform: translateY(-50%);
    }
`;
