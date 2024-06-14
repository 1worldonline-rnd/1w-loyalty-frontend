import { css } from 'styled-components';

export const styles = css`
    padding: 24px 26px 24px 0;
    display: grid;
    align-content: space-between;

    .header {
        margin-block-end: 14px;
        gap: 15px;
    }

    .header h3 {
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: var(--text-dark-color);
    }

    .title {
        font-size: 24px;
        color: var(--text-dark-color);
    }

    .divider {
        width: 100%;
        margin: 16px 0;
        border-bottom: 1px solid var(--grey-5-color);
    }

    .navigation {
        display: grid;
        gap: 8px;
        width: 250px;

        &__item {
            position: relative;

            &:hover {
                .navigation__link {
                    background-color: var(--grey-8-color);
                }

                .navigation__btn-create-entity {
                    opacity: 1;
                }
            }

            &[data-active='true'] .navigation__link {
                background-color: var(--grey-7-color);
                color: var(--text-dark-color);
            }
        }

        &__btn-create-entity {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            border: 1px solid var(--grey-2-color);
            color: var(--grey-2-color);
            border-radius: 4px;
            padding: 5px;
            background-color: transparent;
            outline: none;
            margin-inline-start: 5px;

            &:focus,
            &:focus-visible {
                opacity: 1;
            }

            &:hover,
            &:focus,
            &:focus-visible {
                background-color: var(--main-color);
                border-color: var(--main-color);
                color: #fff;
            }
        }

        &__link {
            font-weight: 600;
            font-size: 18px;
            line-height: 20px;
            display: flex;
            align-items: center;
            color: var(--text-default-color);
            padding: 12px 20px 12px 0px;
            text-decoration: none;
            border-radius: 5px;
            outline: none;

            &--active {
                color: var(--text-dark-color);
            }

            div {
                width: 24px;
                height: 24px;
                display: grid;
                place-items: center;
                margin-inline-end: 16px;

                svg {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
`;
