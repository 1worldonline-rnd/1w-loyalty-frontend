import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { Button } from './shared/button';
import { setIsOpenCalendar } from '../model';

export const Navigation = styled(({ className }: PropsWithClassName) => (
    <nav className={className}>
        <a href="#faq">FAQ</a>

        <Button
            size="small"
            onClick={() => {
                setIsOpenCalendar(true);
            }}
        >
            Book a demo
        </Button>
    </nav>
))`
    display: flex;
    align-items: center;
    gap: 50px;

    a {
        color: var(--colors-text-main);
        font-family: Clash Display;
        font-size: 20px;
        font-weight: 500;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        gap: 20px;

        a {
            display: none;
        }
    }
`;
