import { ChangeEvent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { PropsWithClassName } from '@/shared/utility-types';

type RadioProps = PropsWithChildren<{ checked: boolean; onChange: (e: ChangeEvent<HTMLInputElement>) => void; LabelIcon?: ReactNode }>;
// TODO: rewrite the checkbox to modify the rsuite one rather than made from scratch
export const Radio = styled((props: PropsWithClassName<RadioProps>) => {
    const { className, checked, onChange, children, LabelIcon } = props;
    return (
        <label className={className}>
            {LabelIcon && <span className="icon">{LabelIcon}</span>}

            {children}
            <input type="radio" checked={checked} onChange={onChange} />
            <span className="checkmark"></span>
        </label>
    );
})`
    position: relative;
    cursor: pointer;
    font-size: 22px;
    user-select: none;
    padding-left: 30px;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    color: var(--text-dark-color);

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 22px;
        width: 22px;
        background-color: #fff;
        border-radius: 50px;
        border: 1px solid var(--grey-3-color);
    }

    input:checked ~ .checkmark {
    }

    .checkmark:after {
        content: '';
        position: absolute;
        display: none;
    }

    input:checked ~ .checkmark:after {
        display: block;
    }

    .checkmark:after {
        width: 12px;
        height: 12px;
        top: 4px;
        left: 4px;
        border-radius: 20px;
        background-color: var(--main-color);
    }

    .icon {
        margin-inline-end: 4px;

        svg {
            vertical-align: middle;
            width: 22px;
            height: 22px;
        }
    }
`;
