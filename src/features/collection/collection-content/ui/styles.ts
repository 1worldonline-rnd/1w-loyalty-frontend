import { css } from 'styled-components';

export const styles = css`
    .collection {
        &:not(:last-child) {
            margin-block-end: 42px;
        }

        &__title {
            color: var(--text-dark-color);
            font-size: 20px;
            margin-block-end: 18px;
            text-align: center;
        }

        .topics {
            &--length-1 {
                justify-content: center;

                .topic {
                    max-width: 560px;
                    width: 100%;
                }
            }

            &--length-2 {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;

                @media (max-width: 768px) {
                    grid-template-columns: 1fr;
                }
            }

            &--length-3 {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
                gap: 12px;
            }
        }

        .topic {
            padding: 18px 20px 152px 20px;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: transform 200ms ease-in-out;
            min-height: 290px;

            &:hover {
                transform: scale(1.01);
            }

            ${({ theme: { mode } }) => css`
                background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
                box-shadow: ${mode === 'dark'
                    ? '0px 3px 6px 0px rgba(0, 0, 0, 0.06)'
                    : '0px 3px 15px -3px rgba(86, 99, 104, 0.19);'};
            `}

            &::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0;
                right: 0;
                height: 60px;
                z-index: 4;

                ${({ theme: { mode } }) => css`
                    background: ${mode === 'dark'
                        ? 'linear-gradient(0, #20252c 0%, rgba(32, 3, 44, 0) 100%)'
                        : 'linear-gradient(0, #ffffff 0%, rgba(255, 255, 255, 0) 100%)'};
                `}
            }

            &__header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-block-end: 12px;
            }

            &__logo {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                object-fit: cover;
            }

            &__name {
                font-size: 20px;
                font-weight: 700;
                color: var(--text-dark-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            &__description {
                margin-block-end: 12px;
                color: var(--text-default-color);
                font-size: 12px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            &__article {
                border-radius: 10px;
                padding: 12px 14px;
                position: absolute;
                left: 18px;
                right: 48px;
                top: 100%;
                transform: translateY(-140px);
                z-index: 3;
                min-height: 140px;

                ${({ theme: { mode } }) => css`
                    background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
                    box-shadow: ${mode === 'dark'
                        ? '0px 0px 13px 0px rgba(0, 0, 0, 0.25)'
                        : '0px 3px 15px -3px rgba(86, 99, 104, 0.19);'};
                `}

                &-title {
                    color: var(--text-dark-color);
                    font-size: 16px;
                    font-weight: 600;
                    margin-block-end: 10px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                &-image {
                    width: 100%;
                    border-radius: 10px;
                }
            }

            &__fake-article {
                content: '';
                position: absolute;
                transform: translateY(-126px);
                ${({ theme: { mode } }) => css`
                    background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
                    box-shadow: ${mode === 'dark'
                        ? '0px 0px 13px 0px rgba(0, 0, 0, 0.25)'
                        : '0px 3px 15px -3px rgba(86, 99, 104, 0.19);'};
                `}
                left: 50%;
                top: 100%;
                right: 28px;
                min-height: 140px;
                z-index: 2;
                border-radius: 10px;

                &--second {
                    right: 14px;
                    z-index: 1;

                    transform: translateY(-112px);
                }
            }
        }
    }

    --slick-arrow-size: 38px;

    .slick-slider {
        @media (max-width: 992px) {
            padding-bottom: calc(var(--slick-arrow-size) + 10px);
        }
    }

    .slick-slide {
        padding: 6px;
    }

    .slick-arrow {
        width: var(--slick-arrow-size);
        height: var(--slick-arrow-size);
        border-radius: 50%;
        z-index: 1;

        ${({ theme: { mode } }) => css`
            background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
            box-shadow: ${mode === 'dark'
                ? '0px 0px 13px 0px rgba(0, 0, 0, 0.25)'
                : '0px 3px 15px -3px rgba(86, 99, 104, 0.19);'};
        `}

        @media (max-width: 992px) {
            top: 100%;
            transform: translateY(-100%);
        }

        &:before {
            content: '';
            display: block;
            width: 22px;
            height: 22px;
            background-repeat: no-repeat;
            background-position: center;
            margin-left: 8px;

            ${({ theme: { mode } }) => css`
                background-image: url("data:image/svg+xml,%0A%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.25 17.1875L14.4375 11L8.25 4.8125' stroke='${mode ===
                'dark'
                    ? 'white'
                    : '%233A4054'}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
            `}
        }

        &.slick-prev {
            left: 10px;

            &:before {
                transform: rotate(180deg);
            }
        }

        &.slick-next {
            right: 10px;

            @media (max-width: 992px) {
                right: calc(100% - var(--slick-arrow-size) * 2 - 20px);
            }
        }
    }
`;
