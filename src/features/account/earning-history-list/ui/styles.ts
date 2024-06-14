import { css } from 'styled-components';

export const styles = css`
    position: relative;

    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .event {
        border-block-end: 1px solid
            var(${({ theme: { mode } }) => (mode === 'dark' ? '--grey-4-color' : '--grey-6-color')});
        padding-block: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .action-name {
            color: var(--text-dark-color);
            font-weight: 600;
            font-size: 20px;
            margin-block-end: 5px;
        }

        time {
            color: var(--${({ theme: { mode } }) => (mode === 'dark' ? 'text-light-color' : 'grey-1-color')});
        }

        .points {
            text-align: right;
            color: var(--${({ theme: { mode } }) => (mode === 'dark' ? 'text-light-color' : 'grey-1-color')});

            span {
                font-weight: 700;
                font-size: 20px;
                display: block;
                color: rgb(var(--accent-primary-color));
            }
        }
    }

    .pagination {
        width: 100%;
        margin-block-start: 13px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__buttons {
            display: flex;
            gap: 10px;
        }

        &__counter {
            font-weight: 500;
            font-size: 18px;
            display: flex;
            align-items: center;
            color: var(--text-primary-light-color);
        }
    }
`;
