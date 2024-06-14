import { css } from 'styled-components';

export const styles = css`
    .select {
        width : 147px;
    }
    .description {
        margin-block-end: 13px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        &__top {
            display: flex;
            gap: 5px;
            align-items: center;
            margin-bottom: 2px;
            .dot {
                border-radius: 50%;
                width: 5px;
                height: 5px;
                background: #cdcfd4;
            }
        }
        &__bottom {
            display: flex;
            justify-content: space-between;
        }

        h3 {
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: #404854;
        }

        span {
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: #404854;
        }
        p {
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: #afb1b6;
        }
    }

    .statistic-container {
        display: flex;
        gap: 12px;
        width: 100%;
        .statistic-item {
            width: 25%;
            gap: 8px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 11px 12px 9px;
            border: 1px solid #ecedee;
            border-radius: 7px;
            &__top {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }
            &__bottom {
                display: flex;
                width: 100%;
                gap: 4px;
                align-items: flex-end;
                .percents {
                    display: flex;
                    gap: 5px;
                    align-items: flex-end;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 20px;
                }
                .compare-text {
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 15px;
                    color: #727b88;
                    text-transform: initial;
                }
            }
            .counter {
                display: flex;
                gap: 7px;
                span {
                    font-weight: 400;
                    font-size: 24px;
                    line-height: 29px;
                    color: #1f242b;
                }
            }
            span {
                text-transform: uppercase;
                color: #727b88;
            }
        }
    }
`;
