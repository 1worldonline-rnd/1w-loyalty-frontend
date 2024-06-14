import { css } from 'styled-components';

export const styles = css`
    max-height: 436px;
    background-color: var(--grey-8-color);
    padding: 12px 18px;
    overflow-y: scroll;

    &::-webkit-scrollbar-track {
        background-color: #fafafa;
        box-shadow: inset 1px 0 0px #e8e8e8;
    }

    .search-input {
        padding-block-end: 12px;
        display: block;

        span {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            color: var(--text-dark-color);
            display: block;
            margin-block-end: 10px;
        }
    }

    .product-row {
        align-items: center;
        gap: 4px;

        &:not(:last-child) {
            margin-block-end: 5px;
        }

        &__checkbox .rs-checkbox-inner {
            &::before,
            &::after {
                border-radius: 50%;
            }
        }

        &__body {
            padding: 6px;
            background-color: var(--grey-7-color);
            border-radius: 5px;
            flex: 1;
            gap: 8px;

            & > div {
                flex: 1;
            }
        }

        &__image {
            width: 78px;
            height: 35px;
            border-radius: 2px;
            background-size: cover;
            background-color: #fff;
            object-fit: cover;
        }

        &__title {
            font-weight: 600;
            font-size: 14px;
            line-height: 18px;
            color: var(--text-default-color);
            margin-block-end: 2px;
        }

        &__price,
        &__supply {
            font-size: 12px;
            line-height: 14px;
        }

        &__price {
            font-weight: 600;
            color: var(--text-light-color);
        }

        &__supply {
            color: var(--grey-0-color);
            margin: 0;
        }
    }
`;
