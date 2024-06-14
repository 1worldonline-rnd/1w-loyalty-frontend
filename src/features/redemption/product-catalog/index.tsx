import { userModel } from '@/entities/user';
import { PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { ProductCatalogAuthorized } from './ui/product-catalog-authorized';
import './model';

export const ProductCatalog = styled(({ className }: PropsWithClassName) => {
    const isAuthorized = useStore(userModel.stores.$isAuthorized);
    const Component = isAuthorized ? ProductCatalogAuthorized : () => <div>Unauthorized</div>;

    if (isAuthorized === null) {
        return null;
    }
    return (
        <div className={className}>
            <Component />
        </div>
    );
})`
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    h2 {
        text-align: center;
        font-weight: 700;
        font-size: 24px;
        line-height: 33px;
        color: var(--text-dark-color);
    }

    .redemption-nav {
        li {
            width: 166px;
        }
    }

    @media screen and (max-width: 480px) {
        .redemption-nav {
            li {
                width: 50%;
                padding-inline: 10px;
            }
        }
    }
`;
