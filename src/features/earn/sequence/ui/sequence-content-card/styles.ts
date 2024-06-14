import styled from 'styled-components';
import { css } from 'styled-components';

export const ProductContentCardStyled = styled.li<{ descriptionColor: string }>`
    display: flex;
    flex-direction: column;


    .item-description {
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 6px;
        margin-block-end: 8px;

        .item-position {
            display: flex;
            width: 24px;
            height: 24px;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-weight: 700;
            color: #fff;
            border-radius: 40px;
            background-color: ${(props) => props.descriptionColor};
        }

        .item-title {
            font-size: 14px;
            font-weight: 600;
            color: ${(props) => props.descriptionColor};
        }

        &::after {
            content: '';
            flex-grow: 1;
            border-bottom: 1px solid ${({theme}) => theme.mode === 'dark' ? 'var(--grey-5-color)' : 'var(--grey-3-color)' };
            align-self: center;
        }
    }
`;
