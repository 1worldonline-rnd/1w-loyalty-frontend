import { css } from 'styled-components';

export const styles = css`
    .link-to-feed-url {
        color: var(--text-light-color);
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
                font-size: 18px;
                line-height: 18px;
                color: #fff;
                font-weight: 800;
            }
        }
    }
`;
