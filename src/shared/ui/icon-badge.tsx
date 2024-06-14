import styled from 'styled-components';
import { PropsWithClassName } from '../utility-types';

type BadgeIconButtonProps = PropsWithClassName & {
    children: React.ReactNode;
    icon: React.ReactNode;
};

export const IconBadge = ({ className, children, icon }: BadgeIconButtonProps) => {
    return (
        <IconBadgeStyled className={className}>
            {children}
            {icon}
        </IconBadgeStyled>
    );
};

const IconBadgeStyled = styled.span`
    font-weight: 700;
    font-size: 17px;
    line-height: 23px;
    background-color: ${({ theme }) => theme.mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
    padding: 1px 10px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.19);
    display: flex;
    align-items: center;
    gap: 2px;

    svg {
        width: 15px;
        height: 15px;
    }
`;
