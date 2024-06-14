import styled from 'styled-components';
import { Container } from '../shared/container';
import type { PropsWithClassName } from '@/shared/utility-types';
import { Button } from '../shared/button';
import { setIsOpenCalendar } from '../../model';

const UnstyledMain = ({ className }: PropsWithClassName) => (
    <Container as="main" className={className}>
        <div className="images">
            <img src="/loyalty/images/landing/megaphone-and-confetti.png" alt="Megaphone and confetti" />
            <img src="/loyalty/images/landing/coins.png" alt="Coins" />
            <img
                src="/loyalty/images/landing/teamwork-shown-on-the-puzzles.png"
                alt="Teamwork shown on the puzzles"
            />
            <img src="/loyalty/images/landing/holiday-discounts.png" alt="Holiday discounts" />
            <img
                src="/loyalty/images/landing/green-recycling-aiding-nature.png"
                alt="Green recycling aiding nature"
            />
        </div>

        <h1 className="title">Involve, Motivate and Grow your audience.</h1>

        <p className="description">
            Loyalty HUB will convey your vision, grow the number of conscious consumers and increase their
            conversions and LTV.
        </p>

        <Button
            onClick={() => {
                setIsOpenCalendar(true);
            }}
        >
            Book a demo
        </Button>
    </Container>
);

export const Main = styled(UnstyledMain)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-block: 70px;

    @media (max-width: 768px) {
        padding-block: 40px;
    }

    .images {
        display: flex;
        justify-content: center;
        gap: 9px;
        flex-wrap: wrap;
        margin-block-end: 32px;

        img {
            --size: 174px;

            width: var(--size);
            height: var(--size);

            @media (max-width: 768px) {
                width: calc(var(--size) / 1.5);
                height: calc(var(--size) / 1.5);
            }

            @media (max-width: 480px) {
                width: calc(var(--size) / 2);
                height: calc(var(--size) / 2);
            }
        }
    }

    .title {
        color: var(--colors-text-main);
        text-align: center;
        font-family: 'Clash Display', sans-serif;
        font-size: 60px;
        font-weight: 600;
        margin-block-end: 16px;

        @media (max-width: 768px) {
            font-size: 40px;
        }
    }

    .description {
        color: var(--colors-text-secondary);
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        max-width: 740px;
        margin-block-end: 46px;

        @media (max-width: 768px) {
            font-size: 18px;
        }
    }
`;
