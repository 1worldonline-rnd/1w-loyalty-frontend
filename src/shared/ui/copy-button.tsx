import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Button } from '../rsuite/admin-panel';
import classNames from 'classnames';
import { copyToClipboard } from '../lib/clipboard';
import { CopyIcon } from './icons';
import styled from 'styled-components';
import { PickerAppearance } from 'rsuite/esm/@types/common';

type CopyButtonProps = {
    textToCopy: string;
    buttonText?: string;
    appearance?: PickerAppearance;
};

export const CopyButton = styled(({ textToCopy, buttonText, appearance }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.editing' });

    return (
        <Button
            size="sm"
            className={classNames('code__copy-btn', { 'code__copy-btn--clicked': isCopied })}
            appearance={appearance ? appearance : 'black'}
            onClick={() => {
                copyToClipboard(textToCopy);
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            }}
        >
            {isCopied ? (
                t('copied-embed-code-button')
            ) : (
                <>
                    <CopyIcon />
                    {buttonText ? buttonText : t('copy-embed-code-button')}
                </>
            )}
        </Button>
    );
})`
    .code {
        &__copy-btn {
            position: absolute;
            bottom: 12px;
            right: 12px;
            min-width: 87px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 4px;

            &--clicked {
                justify-content: center;
            }
        }
    }
`;
