import styled, { css } from 'styled-components';

export const ButtonsList = styled.ul`
    ${({ theme: { mode } }) => {
        return css`
            background: ${mode === 'dark' ? 'var(--grey-3-color)' : '#F7F7F8'};
        `;
    }}
    border-radius: 10px;
    display: flex;
    padding: 5px;

    .link {
        ${({ theme: { mode } }) => {
            return css`
                background: ${mode === 'dark' ? 'var(--grey-3-color)' : '#F7F7F8'};
            `;
        }}
        flex: 1;
        border-radius: 6px;
        padding-block: 5px;
        gap: 6px;

        &.active {
            ${({ theme: { mode } }) => {
                return css`
                    background: ${mode === 'dark' ? 'var(--grey-4-color)' : '#fff'};
                `;
            }}
            box-shadow: 1px 2px 30px -7px rgba(0, 0, 0, 0.16);
            border-radius: 6px;
            gap: 6px;

            a {
                color: var(--text-dark-color);
            }
        }

        a {
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            font-style: normal;
            font-weight: 700;
            font-size: 17px;
            line-height: 28px;
            color: var(--text-default-color);

            svg {
                width: 24px;
                height: 24px;
            }
        }
    }
`;
