import { css } from 'styled-components';

export const styles = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: max(min-content, 250px);

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-block-end: 18px;
    }

    h3 {
        font-weight: 600;
        font-size: 18px;
        color: #000;
    }

    input {
        margin-block-end: 6px;
    }

    .submit{
        color: var(--text-white-color); // can be problem if user selects LIGHTER color for in widget settings
    }
`;
