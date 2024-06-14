import { useState } from 'react';
import styled, { css } from 'styled-components';
import cn from 'classnames';
import { Input, InputProps } from './input';
import { EyeIcon, EyeSlashIcon } from '../../ui/icons';
import { PropsWithClassName } from '@/shared/utility-types';

const styles = css<InputProps>`
    &.password-input {
        position: relative;

        input {
            padding-inline-end: 58px;
        }

        button {
            position: absolute;
            right: 1px;
            top: 1px;
            width: 44px;
            height: 44px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: transparent;
            color: var(--text-default-color);
            transition: background-color 200ms ease;

            &:hover {
                background-color: var(--grey-3-color);
            }
        }
    }
`;

export const PasswordInput = styled(({ className, ...props }: PropsWithClassName<InputProps>) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className={cn(className, 'password-input')}>
            <Input {...props} type={visible ? 'text' : 'password'} size="lg" />
            <button onClick={() => setVisible((visible) => !visible)} type="button">
                {visible ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
        </div>
    );
})`
    ${styles}
`;
