import { css } from 'styled-components';

export const styles = css`
    --slide-height: 480px;
    --img-container-height-mobile: 140px;
    --img-container-height-desktop: 200px;
    --btn-container-height-mobile: 82px;
    --btn-container-height-desktop: 64px;

    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;

    ${({ theme: { mode } }) => css`
        background-color: ${mode === 'dark' ? '#252a32cc' : '#ffffffcc'};
    `}

    .slider-container {
        position: relative !important;
        top: 50px;
        margin: 0 auto;
        max-width: 480px;
        box-shadow: 0px 0px 120px 0px var(--shadow-color);

        @media screen and (max-width: 480px) {
            top: 90px !important;
        }
    }

    .slick-arrow {
        opacity: 0;
        pointer-events: none;
    }

    .slick-list {
        display: flex;
        flex-direction: column;
        border-radius: 7px 7px 0 0;
    }

    .slick-slide {
        height: calc(var(--slide-height) - var(--btn-container-height-desktop));

        @media screen and (max-width: 480px) {
            height: calc(var(--slide-height) - var(--btn-container-height-mobile));
        }
    }

    .slick-slide > div {
        max-width: 484px;
        margin: 0 auto;
    }

    .slick-dots {
        li {
            width: 6px;
            height: 6px;
            padding: 0;
            margin: 0;
            margin-right: 6px;

            &:last-child {
                margin-right: 0;
            }
        }
        bottom: -42px;

        @media screen and (max-width: 480px) {
            bottom: -72px;
        }
    }

    .slick-active .product-tour-slider__dot {
        ${({ theme: { mode } }) => css`
            background-color: ${mode === 'dark' ? 'var(--grey-6-color)' : 'var(--grey-0-color)'};
        `}
    }

    .product-tour-slider {
        &__dot {
            border-radius: 50%;
            display: inline-block;
            background-color: var(--grey-4-color);
            width: 6px;
            height: 6px;

            ${({ theme: { mode } }) => css`
                background-color: ${mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-3-color)'};
            `}
        }
    }

    .product-tour-slide {
        color: var(--text-default-color);
        border-radius: 7px 7px 0 0;
        background-color: var(--grey-10-color);

        &::after {
            z-index: 1;
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20px;

            ${({ theme: { mode } }) => css`
                background: ${mode === 'dark'
                    ? 'linear-gradient(to bottom, rgba(37, 42, 50, 0) 0%, rgba(37, 42, 50, 0.2) 100%)'
                    : 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)'};
            `}
        }

        &::before {
            z-index: 1;
            content: '';
            position: absolute;
            top: var(--img-container-height-desktop);
            left: 0;
            width: 100%;
            height: 20px;

            @media screen and (max-width: 480px) {
                top: var(--img-container-height-mobile);
            }

            ${({ theme: { mode } }) => css`
                background: ${mode === 'dark'
                    ? 'linear-gradient(to top, rgba(37, 42, 50, 0) 0%, rgba(37, 42, 50, 0.2) 100%)'
                    : 'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)'};
            `}
        }

        &__btn-close[class] {
            position: absolute;
            right: 7px;
            top: 7px;
            display: flex;
            padding: 0;
            background-color: transparent;
            color: var(--text-light-color);
        }

        &__btn-close-image {
            width: 32px;
            height: 32px;
        }

        &__img-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--img-container-height-desktop);

            ${({ theme: { mode } }) => css`
                background-color: ${mode == 'dark' ? 'var(--grey-1-color)' : 'var(--grey-8-color)'};
                border-bottom: 1px solid ${mode == 'dark' ? 'var(--grey-3-color)' : 'var(--grey-6-color)'};
            `}

            @media screen and (max-width: 480px) {
                height: var(--img-container-height-mobile);
            }
        }

        &__content-container {
            position: relative;
            overflow-y: auto;
            scrollbar-width: none;
            padding-top: 18px;
            padding-inline: 30px;
            height: calc(
                var(--slide-height) - var(--img-container-height-desktop) -
                    var(--btn-container-height-desktop)
            );

            @media screen and (max-width: 480px) {
                height: calc(
                    var(--slide-height) - var(--img-container-height-mobile) -
                        var(--btn-container-height-mobile)
                );
            }
        }

        &__img {
            object-fit: contain;
        }

        &__title {
            font-size: 20px;
            line-height: 1.35;
            margin-bottom: 12px;

            &--centered {
                text-align: center;
            }
        }

        &__text {
            line-height: 1.5;
            overflow: hidden;

            &--centered {
                text-align: center;
            }
        }
    }

    .slider-btn-container {
        padding: 14px 16px;
        height: var(--btn-container-height-desktop);
        border-radius: 0 0 7px 7px;
        display: flex;
        justify-content: space-between;

        @media screen and (max-width: 480px) {
            justify-content: space-around;
            gap: 8px;
            height: var(--btn-container-height-mobile);
        }

        ${({ theme: { mode } }) => css`
            border-top: 1px solid ${mode === 'dark' ? '--grey-3-color' : 'var(--grey-6-color)'};
            background-color: ${mode === 'dark' ? 'var(--grey-1-color)' : 'var(--grey-8-color)'};
        `}

        &__btn-prev,
        &__btn-next {
            min-width: 120px;

            @media screen and (max-width: 480px) {
                max-height: 36px;
                flex-grow: 1;
                flex: 1;
            }
        }

        &__btn-prev[class] {
            color: var(--text-dark-color);
            ${({ theme: { mode } }) => css`
                background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : 'var(--grey-6-color)'};
            `};
        }

        &__btn-next[class] {
            color: #fff;
            background-color: rgb(var(--accent-primary-color));
        }
    }
`;
