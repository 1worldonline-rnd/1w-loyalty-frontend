/* eslint-disable max-len */
import { Checkbox as RsuiteCheckbox, CheckboxProps as RsuiteCheckboxProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';
import styled, { css } from 'styled-components';

export type CheckboxProps = RsuiteCheckboxProps & { hasError?: boolean };

type CheckboxType = RsRefForwardingComponent<'div', CheckboxProps>;

export const Checkbox: CheckboxType = styled(({ hasError: _, ...props }: CheckboxProps) => (
    <RsuiteCheckbox {...props} />
))<CheckboxProps>`
    .rs-checkbox-wrapper {
        left: 7px;
        top: 7px;
    }

    .rs-checkbox-wrapper,
    .rs-checkbox-wrapper::before,
    .rs-checkbox-wrapper .rs-checkbox-inner::before,
    .rs-checkbox-wrapper .rs-checkbox-inner::after {
        width: 22px;
        height: 22px;
    }

    .rs-checkbox-wrapper .rs-checkbox-inner::before {
        border: 1px solid var(--grey-5-color);
        border-radius: 4px;
        opacity: 1;

        ${({ hasError }) => hasError && css`
            border-color: rgb(var(--error-color));
        `}
    }

    .rs-checkbox-wrapper::after {
        top: -7px;
        right: -7px;
        bottom: -7px;
        left: -7px;
    }

    &.rs-checkbox-checked .rs-checkbox-wrapper .rs-checkbox-inner,
    &.rs-checkbox-indeterminate .rs-checkbox-wrapper .rs-checkbox-inner {
        &::before {
            border-color: rgb(var(--accent-primary-color));
            background-color: rgb(var(--accent-primary-color));
        }

        &::after {
            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyLjY2OC4yODRhLjYzMi42MzIgMCAwIDAtLjg5Ni0uMDAxTDUuMjggNi43NzVhLjIwOC4yMDggMCAwIDEtLjI5NSAwTDIuMjI4IDQuMDE4YS42MzIuNjMyIDAgMCAwLS44OTYuMDAybC0uNzI0LjczYS42MzIuNjMyIDAgMCAwIC4wMDEuODkybDQuMDc2IDQuMDc2YS42MzIuNjMyIDAgMCAwIC44OTUgMGw3LjgxLTcuODExYS42MzIuNjMyIDAgMCAwIC4wMDItLjg5M2wtLjcyNC0uNzNaIi8+PC9zdmc+);
            width: 14px;
            height: 10px;
            margin: 6px 0 0 4px;
            border: none;
            transform: rotate(0) scale(1);
        }
    }

    .rs-checkbox-checker {
        padding-block: 7px;

        label {
            font-size: 16px;
            line-height: 22px;

            &,
            a {
                color: var(--text-default-color);
            }

            &:hover .rs-checkbox-wrapper .rs-checkbox-inner::before {
                border-color: rgb(var(--accent-primary-color));
            }
        }
    }

    .rs-checkbox-wrapper .rs-checkbox-inner::after {
        transform: rotate(0) scale(0);
    }
`;
