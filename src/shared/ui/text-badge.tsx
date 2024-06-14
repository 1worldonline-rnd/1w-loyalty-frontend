import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const TextBadge = ({ children }: PropsWithChildren<{}>) => (
    <TextBadgeStyled>
        <span>{children}</span>
    </TextBadgeStyled>
);

const TextBadgeStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0.5px;
    background-color: var(--text-default-color);
    border-radius: 3px;

    span {
        color: #fff !important;
        font-size: 14px;
        font-weight: 800 !important;
        line-height: 18px;
        text-align: center;
        &::after {
            content: '' !important;
        }
    }
`;
