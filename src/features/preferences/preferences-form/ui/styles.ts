import { css } from 'styled-components';

export const styles = css`
    .header {
        margin-block-end: 14px;
    }

    .title {
        font-size: 24px;
        color: var(--text-dark-color);
    }

    .select {
        /* width: 147px; */
    }

    .input {
        color: var(--text-default-color);
        font-weight: 600;
        line-height: 20px;
    }
    .divider {
        width: 100%;
        margin: 16px 0;
        border-bottom: 1px solid var(--grey-5-color);
    }

    .header h3 {
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: var(--text-dark-color);
    }

    .header p {
        color: var(--grey-9-color);
    }

    .preference-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
        border-bottom: 1px solid var(--grey-5-color);
        padding-block-end: 18px;
        padding-block-start: 18px;
        width: 100%;

        .reward-title {
            padding-block-start: 12px;
            flex-basis: 25%;
            display: flex;
            align-items: center;
            gap: 10px;
            span {
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                color: var(--text-dark-color);
            }
        }
        .table-container {
            flex-basis: 75%;
            background: #fafafa;
            border-radius: 7px;

            .table {
                padding: 0 16px 0 16px;
                .TH {
                    display: flex;
                    border-bottom: 1px solid var(--grey-5-color);
                    padding-block-end: 11px;
                    padding-block-start: 14px;
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 17px;
                    text-transform: uppercase;
                    color: var(--grey-9-color);

                    .row-item {
                        display: flex;
                        align-items: center;
                        width: calc(100% / 4);

                        &:first-child {
                            width: calc(100% / 5 * 2);
                        }
                        &:nth-last-child(2) {
                            /* padding-left: 65px; */
                        }
                        &:last-child {
                            align-items: center;
                            justify-content: flex-end;
                        }
                    }
                }
                .TB {
                    .TR {
                        .row {
                            display: flex;
                            .row-item {
                                padding: 14px 0;
                                width: calc(100% / 4);
                                display: flex;
                                align-items: center;

                                &:first-child {
                                    width: calc(100% / 5 * 2);
                                }

                                &:nth-last-child(2) {
                                    /* padding-left: 65px; */
                                }
                                &:last-child {
                                    align-items: center;
                                    justify-content: flex-end;
                                }
                            }
                            .inputs {
                                display: flex;
                                gap: 6px;
                            }
                            &:not(:last-child) {
                                border-bottom: 1px solid var(--grey-5-color);
                            }
                        }
                        .title {
                            font-weight: 600;
                            font-size: 16px;
                            line-height: 19px;
                            color: var(--text-default-color);
                        }
                    }
                }
            }
        }

        .daily-login {
            padding: 14px;
            display: flex;
            align-items: center;
            gap: 16px;

            &-row-title {
                font-weight: 600;
                text-transform: uppercase;
                color: var(--text-light-color);
                align-self: flex-end;
                margin-block-end: 10px;
            }

            &-rewards {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            &-row {
                width: 82px;
            }

            .reward-title {
                font-weight: 600;
                color: var(--text-dark-color);
                margin-bottom: 5px;
            }
        }
    }
`;
