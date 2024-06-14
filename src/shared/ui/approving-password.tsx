import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import { Button, PasswordInput } from '@/shared/rsuite/loyalty-platform';
import { PropsWithClassName } from '@/shared/utility-types';
import { Loader } from './loader';
import { useTranslation } from 'next-i18next';

type ApprovingPasswordProps = PropsWithClassName<{
    label: string;
    onApply: (password: string) => void;
    onCancel: () => void;
    isLoading?: boolean;
}>;

export const ApprovingPassword = styled((props: ApprovingPasswordProps) => {
    const { className, isLoading } = props;
    const [password, setPassword] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    const { t } = useTranslation('common', {
        keyPrefix: 'account-settings-page.delete-account',
    });

    const apply = () => {
        props.onApply(password);
    };

    useOnClickOutside(ref, () => {
        props.onCancel();
        setPassword('');
    });

    return (
        <div className={className} ref={ref}>
            <label>
                <span>{props.label}</span>

                <PasswordInput
                    className="input"
                    size="lg"
                    autoComplete="on"
                    value={password}
                    onChange={setPassword}
                />
            </label>

            <Button size="md" type="button" appearance="primary" onClick={apply}>
                {isLoading ? <Loader /> : t('approve') }
            </Button>
        </div>
    );
})`
    display: flex;
    flex-direction: column;
    gap: 14px;

    label > span {
        display: block;
        color: var(--text-light-color);
        margin-block-end: 8px;
        font-weight: 600;
        line-height: 19px;
    }
`;
