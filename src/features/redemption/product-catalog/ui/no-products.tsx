import { NoProductsIcon } from '@/shared/ui/icons';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

export const NoProducts = () => {
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });

    return (
        <NoProductsStyled>
            <NoProductsIcon />
            <p>{t('will-be-updated-soon')}</p>
        </NoProductsStyled>
    );
};

const NoProductsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 26px;

    p {
        font-size: 20px;
        line-height: 27px;
        color: var(--text-disabled-color);
    }
`;
