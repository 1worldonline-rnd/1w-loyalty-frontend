import styled from 'styled-components';
import { Container } from '../shared/container';
import type { PropsWithClassName } from '@/shared/utility-types';

const UnstyledCareContent = ({ className }: PropsWithClassName) => (
    <Container as="section" className={className}>
        <h2 className="title">
            You take care of the <span>content</span>
        </h2>

        <img className="image image--desktop" src="/loyalty/images/landing/care-content--desktop.png" alt="Content" />
        <img className="image image--mobile" src="/loyalty/images/landing/care-content--mobile.png" alt="Content" />

        <h3 className="subtitle">
            We will make it <span>interactive and catchy</span>
        </h3>
    </Container>
);

export const CareContent = styled(UnstyledCareContent)`
    padding-block: 80px;
    border-block-end: 2px solid #ececee;

    .title,
    .subtitle {
        color: var(--colors-text-main);
        font-family: 'Clash Display';
        font-size: 30px;
        font-weight: 600;

        @media (max-width: 768px) {
            text-align: center !important;
        }
    }

    .title {
        margin-block-end: 44px;

        span {
            color: #7310ed;
        }
    }

    .image {
        display: none;
        margin-block-end: 50px;

        &--desktop {
            @media (min-width: 769px) {
                display: block;
            }
        }

        &--mobile {
            @media (max-width: 768px) {
                display: block;
                max-width: 400px;
                margin-inline: auto;
            }
        }
    }

    .subtitle {
        text-align: right;

        span {
            color: #fa014e;
        }
    }
`;
