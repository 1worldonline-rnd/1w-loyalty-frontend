import { css } from 'styled-components';

export const styles = css`
    h3 {
        font-weight: 600;
        font-size: 20px;
        color: var(--text-dark-color);
    }

    p {
        margin: 0;
        color: var(--grey-9-color);

        &.setting-label {
            margin-block-end: 16px;
            font-size: 16px;
            font-weight: 600;
        }
    }

    section {
        border-block-end: 1px solid var(--grey-5-color);
        padding: 20px 0;
    }

    fieldset {
        display: flex;
        justify-content: space-between;

        & > * {
            flex: 1;
        }

        & > *:first-child {
            margin-inline-end: 12px;
        }
    }

    .field {
        width: 100%;
        cursor: pointer;

        &__label {
            color: var(--text-dark-color);
            font-weight: 600;
            &--md {
                font-size: 16px;
                line-height: 19px;
            }

            &--lg {
                font-size: 18px;
                line-hegiht: 22px;
            }

            &--xl {
                font-size: 20px;
                line-height: 24px;
            }
        }

        &--social {
            border-block-end: 1px solid var(--grey-5-color);
            width: 100%;
            position: relative;
            padding: 18px 0 18px 0;
            &_top {
                display: flex;
                align-items: center;
            }
            &:first-of-type {
                padding-top: 0;

                .field--social-icon {
                    top: 0;
                    width: 28px !important;
                    height: 28px !important;
                    img {
                        width: 28px !important;
                        height: 28px !important;
                    }
                }
            }

            &:last-of-type {
                padding-bottom: 0;
                border-style: none;
            }

            &-icon {
                display: inline;
                margin-inline-end: 15px;
                width: 28px !important;
                height: 28px !important;
                img {
                    width: 28px !important;
                    height: 28px !important;
                }
            }

            .subfields {
                margin-inline-start: 40px;
            }
        }

        .toggle__main {
            align-self: end;
        }
    }

    .error-wrapper {
        position: absolute;
        transform: translateY(20%);
    }

    .feed-container {
        .feed {
            margin-block-start: 16px;
            position: relative;
            .drag-icon {
                position: absolute;
                top: 0;
                left: 0;
                top: 38px;
            }
            .subfields {
                margin-inline-start: 30px;
                padding: 14px 16px;
                background-color: var(--grey-8-color);
                border-radius: 7px;
            }
            .setting-label {
                line-height: 14px;
            }

            .feed-controls {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 12px;
                .toggle {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .delete {
                    display: flex;
                    cursor: pointer;
                    align-items: center;
                    justify-content: space-between;
                    gap: 5px;
                }
            }
        }
    }
    .add-feed-container {
        margin: 14px 0 0px 30px;
        display: flex;
        gap: 8px;
        align-items: center;
        .icon-container {
            display: inline-flex;
            align-items: center;
            padding: 6px;
            justify-content: center;
            background-color: #f7f7f8;
            border-radius: 5px;
            cursor: pointer;
        }
        .setting-label {
            line-height: 14px;
        }
    }

    .not-applied {
        outline: 1px solid rgb(var(--error-color));
        border-radius: 5px;
    }

`;
