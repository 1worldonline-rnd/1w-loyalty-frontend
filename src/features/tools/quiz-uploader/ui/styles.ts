import { css } from 'styled-components';

export const styles = css`

  .header {
    margin-block-end: 14px;
    gap: 15px;
  }

  .header h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: var(--text-dark-color);
  }

  .title {
    font-size: 24px;
    color: var(--text-dark-color);
  }

  .divider {
    width: 100%;
    margin: 16px 0;
    border-bottom: 1px solid var(--grey-5-color);
  }

  .file-input {
    margin-right: 30px;
  }

  .status-success {
    color: var(--success-color);
  }

  .status-failed {
    color: var(--accent-3-color);
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
  }
`;
