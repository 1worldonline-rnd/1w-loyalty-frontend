import { css } from 'styled-components';

export const styles = css`
    input,
    textarea {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
    }

    textarea {
        resize: none;
    }

    .fieldset {
        padding-block-start: 18px;
        padding-block-end: 18px;
        position: relative;

        &:first-of-type {
            border-block-end: 1px solid var(--grey-5-color);

            .split-fields .field {
                margin-block-end: 0;
            }
        }

        &:last-of-type {
            display: flex;
            justify-content: space-between;
            align-items: start;
            gap: 26px;
            padding-block-end: 0;
        }

        &__tracker {
            flex: 1;
        }

        &__legend {
            font-weight: 600;
            font-size: 16px;
            color: var(--text-light-color);

            &-margin {
                margin-block-end: 16px;
            }
        }

        &__subtitle {
            color: var(--grey-1-color);
            margin-block-end: 16px;
        }

        .color-fields {
            display: flex;
            gap: 8px;

            &__input {
                flex-grow: 1;
                min-width: 120px;
            }
        }

        .preset-colors {
            display: flex;
            align-items: center;
            gap: 6px;

            button {
                width: 20px;
                height: 20px;
                padding: 0;
                border-style: none;
                border-radius: 20px;
            }
        }
    }

    .theme-field:first-of-type {
        margin-inline-end: 24px;
    }

    .field,
    .field__label {
        display: block;
    }

    .field {
        margin-block-end: 16px;
    }

    .field--required span::after {
        content: ' *';
        color: rgb(var(--error-color));
    }

    .field__label {
        font-weight: 600;
        line-height: 17px;
        color: var(--text-default-color);
        margin-block-end: 5px;
    }

    .split-fields {
        display: flex;
        justify-content: space-between;
        gap: 12px;

        & > * {
            flex: 1;
        }
    }

    .bg-color-fields {
        justify-content: flex-start;
        margin-block-end: 16px;

        label {
            max-width: 224px;
        }
    }

    .buttons {
        margin-block-start: 10px;
        display: flex;
        gap: 20px;
    }
    .logos-container {
        position: absolute;
        bottom: 0;
        left: -40000px;
        .result {
            position: relative;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                width: 40px;
                height: 40px;
                width: 100%;
                height: 100%;
                z-index: 10;
                position: absolute;
                top: 0;
                left: 0;
            }
            span {
                z-index: 12;
                display: block;
            }
        }
    }
    .preview {
        flex: 1;
        &__title {
            font-weight: 600;
            line-height: 17px;
            font-size: 14px;
            color: var(--grey-2-color);
            margin-block-end: 10px;
        }

        &__wrapper {
            width: 100%;
            height: 680px;
            padding: 5px;
            background-color: var(--grey-8-color);
            border-radius: 7px 0px;
            border-width: 0px 1px 1px 0px;
            border-style: solid;
            border-color: var(--grey-5-color);
        }

        &__widget {
            width: 100%;
            height: 100%;
            box-shadow: 0px -2px 30px -32px rgba(0, 0, 0, 0.05), -3px -3px 72px -32px rgba(0, 0, 0, 0.05);

            position: relative;
            .result-container-logo,
            .result-container {
                width: 60px;
                height: 60px;
                position: absolute;
                bottom: 0;
                right: 0;
                background-color: '#FFFFFF';
                border-radius: 50%;
                padding: 9px;
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                box-shadow: 1px 2px 20px -10px rgba(0, 0, 0, 0.22), 1px 2px 58px -20px rgba(0, 0, 0, 0.28);
                .result {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    svg {
                        width: 40px;
                        height: 40px;
                        width: 100%;
                        height: 100%;
                        z-index: 10;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    span {
                        z-index: 12;
                        display: block;
                    }
                }
            }
            .result-container-logo {
                z-index: 14;
                .result-logo {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 13;
                }
            }
        }

        &__iframe {
            height: 100%;
            width: 100%;
            background-color: transparent;
        }
    }
    .points-icon {
        .fieldset__legend {
            margin-block-end: 13px;
        }
        .field__label {
            margin-block-end: 5px;
        }
        .icons-container {
            gap: 4px;
            display: flex;
            .icon-select {
                cursor: pointer;
                background: #fafafa;
                border: 1px solid var(--grey-3-color);
                border-radius: 5px;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--grey-8-color);

                &--active {
                    background-color: var(--grey-6-color);
                    border: 1px solid var(--main-color);
                }
            }
        }
    }
`;
