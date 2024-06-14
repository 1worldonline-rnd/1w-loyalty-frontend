import { css } from 'styled-components';

export const styles = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: #ffffff;
    border: 2px solid #f2f2f3;
    box-sizing: border-box;
    box-shadow: 1px 2px 30px -7px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 14px 16px 18px;

    h3 {
        font-weight: 600;
        font-size: 18px;
        margin-block-end: 11px;
        color: var(--text-light-color);
        letter-spacing: -0.5px;
    }

    .email-container {
        position: relative;

        .input {
            margin-block-end: 6px;
        }

        .email-count {
            position: absolute;
            top: 10px;
            right: 15px;
            font-weight: bold;
            font-size: 20px;
            line-height: 27px;
            letter-spacing: -0.2px;
            color: #fd5b16;
        }
    }
`;
