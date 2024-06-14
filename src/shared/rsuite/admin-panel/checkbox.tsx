import { Checkbox as RsuiteCheckbox, CheckboxProps as RsuiteCheckboxProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';
import { ValueType } from 'rsuite/esm/Checkbox';
import styled, { css } from 'styled-components';

export type CheckboxProps<T> = Omit<RsuiteCheckboxProps<T>, 'size'> & {
    size: 'M' | 'S' | 'XS';
};

type CheckboxType = RsRefForwardingComponent<'div', CheckboxProps<ValueType>>;

const styleValues: Record<CheckboxProps<ValueType>['size'], Record<string, string | number>> = {
    M: {
        size: 22,
        checkMarkSize: 14,
        gap: 8,
    },
    S: {
        size: 18,
        checkMarkSize: 10,
        gap: 6,
    },
    XS: {
        size: 16,
        checkMarkSize: 8,
        gap: 6,
    },
};

const styles = css<CheckboxProps<ValueType>>`
    min-width: ${({ size }) => styleValues[size].size}px;
    /* height: ${({ size }) => styleValues[size].size}px; */

    .rs-checkbox-checker {
        padding: 0;
        min-height: ${({ size }) => styleValues[size].size}px;
        padding-left: ${({ size }) => +styleValues[size].size + +styleValues[size].gap}px;

        label {
            line-height: ${({ size }) => styleValues[size].size}px;
        }
    }

    .rs-checkbox-wrapper {
        background-color: #fff;
        border-radius: 5px;
        width: ${({ size }) => styleValues[size].size}px;
        height: ${({ size }) => styleValues[size].size}px;
        top: 0;
        left: 0;
        &::after {
            top: 0;
            right: ${({ size }) => styleValues[size].size}px;
            bottom: ${({ size }) => styleValues[size].size}px;
            left: 0;
        }

        &::before {
            border-color: var(--grey-3-color);
        }

        &::before,
        & .rs-checkbox-inner::before,
        & .rs-checkbox-inner::after {
            width: ${({ size }) => styleValues[size].size}px;
            height: ${({ size }) => styleValues[size].size}px;
            border-radius: 5px;
        }
    }

    &.rs-checkbox-checked .rs-checkbox-wrapper::before {
        transform: none;
    }


    &.rs-checkbox-checked .rs-checkbox-wrapper .rs-checkbox-inner {
        &::before {
            border-color: var(--main-color);
            background-color: var(--main-color);
        }

        &::after {
            border: none;
            transform: none;
            width: ${({ size }) => styleValues[size].checkMarkSize}px;
            height: ${({ size }) => styleValues[size].checkMarkSize}px;
            margin-block-start: ${({ size }) => {
                return (+styleValues[size].size - +styleValues[size].checkMarkSize) / 2;
            }}px;
            margin-inline-start: ${({ size }) => {
                return (+styleValues[size].size - +styleValues[size].checkMarkSize) / 2;
            }}px;
            background-size: cover;
            background-image: url("data:image/svg+xml,%0A%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.6023 2.33845C12.3584 2.09288 11.9615 2.09217 11.7168 2.33688L5.29929 8.75436C5.21896 8.83469 5.08872 8.83469 5.00839 8.75436L2.28311 6.02908C2.03841 5.78437 1.64144 5.78507 1.3976 6.03064L0.681453 6.75187C0.438827 6.99622 0.439525 7.39077 0.683012 7.63426L4.71187 11.6631C4.95596 11.9072 5.35172 11.9072 5.59582 11.6631L13.3169 3.94206C13.5604 3.69858 13.561 3.30402 13.3184 3.05967L12.6023 2.33845Z' fill='white'/%3E%3C/svg%3E%0A");
        }
    }
`;

export const Checkbox: CheckboxType = styled(({ ...otherProps }: CheckboxProps<ValueType>) => {
    return <RsuiteCheckbox {...otherProps} />;
})<CheckboxProps<ValueType>>`
    ${styles}
`;
