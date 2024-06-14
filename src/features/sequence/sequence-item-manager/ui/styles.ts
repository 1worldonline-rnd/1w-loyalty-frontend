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
    .link {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 4px;
        a {
            color: var(--text-default-color);
            display: flex;
            align-items: center;
            gap: 4px;
            text-decoration: none;
        }
        .imu-icon {
            position: relative;
            background-color: var(--text-default-color);
            border-radius: 3px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-size: 14px;
                line-height: 14px;
                color: #fff;
                font-weight: 800;
            }
        }
    }
    .short {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        width: calc(100% - 40px);
    }
    section {
        padding: 15px 0 0 0;
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
            .td-name {
                display: flex;
                align-items: center;
                gap: 10px;

                span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--main-color);
                    color: white;
                    border-radius: 50%;
                    min-width: 25px;
                    height: 25px;
                }
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
    .add-sequence-container {
        margin: 0px 0 14px 15px;
        display: flex;
        gap: 8px;
        align-items: center;
        .create-sequence {
            padding: 7px;
        }
        .icon-container {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #f7f7f8;
            border-radius: 5px;
            cursor: pointer;
        }
        .setting-label {
            color: var(--text-dark-color, #1f242b);
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
        }
    }

    .not-applied {
        outline: 1px solid rgb(var(--error-color));
        border-radius: 5px;
    }
    .table-container{
        position: relative;
        .loader-container{
            width: 100%;
            height :100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            opacity: 0.8;
        }
    }
`;
