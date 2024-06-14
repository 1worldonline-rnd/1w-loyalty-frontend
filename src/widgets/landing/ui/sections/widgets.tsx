import styled from 'styled-components';
import { Container } from '../shared/container';
import type { PropsWithClassName } from '@/shared/utility-types';

const UnstyledWidgets = ({ className }: PropsWithClassName) => (
    <Container as="section">
        <div className={className}>
            <img
                className="widgets-image"
                src="/loyalty/images/landing/widgets.png"
                alt="Tracker widget and Loyalty page"
            />

            <div className="widgets">
                <div className="widget widget--tracker">
                    <img className="widget__image" src="/loyalty/images/landing/tracker.png" alt="Tracker" />

                    <h2 className="widget__title">Tracker widget</h2>

                    <p className="widget__description">
                        On-page script that allows communication with new and returned traffic, motivates them
                        to do key activities, hooks them to make a target action such as subscription or
                        registration and tracks users' behavior on the website.
                    </p>
                </div>
                <div className="widget widget--loyalty">
                    <img className="widget__image" src="/loyalty/images/landing/loyalty.png" alt="Loyalty" />

                    <h2 className="widget__title">Loyalty HUB</h2>

                    <p className="widget__description">
                        Loyalty HUB A big UI/UX-ready component that aggregates all your content and attaches
                        gamification mechanics to it. The page with this component will show all possible
                        one-time and recurring activities, including standard and sequential chains of
                        content, social media, referral links and questionnaires.
                    </p>
                </div>
            </div>
        </div>
    </Container>
);

export const Widgets = styled(UnstyledWidgets)`
    margin-block-start: 116px;

    @media (min-width: 769px) {
        border-radius: 0 0 25px 25px;
        background-color: #f7f7f8;
    }

    .widgets {
        display: flex;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            gap: 87px;
        }

        &-image {
            position: relative;
            top: -80px;

            @media (max-width: 768px) {
                display: none;
            }
        }

        .widget {
            padding-block: 42px 42px;

            @media (min-width: 769px) {
                position: relative;
                top: -80px;
            }

            &--tracker {
                width: calc(47 / 127 * 100%);
                padding-inline: 70px 60px;

                @media (max-width: 992px) {
                    padding-inline: 30px 20px;
                }

                @media (max-width: 768px) {
                    .widget__image {
                        max-width: 400px;
                        margin-inline: auto;

                        margin-top: -100px;
                    }
                }
            }

            &--loyalty {
                width: calc(80 / 127 * 100%);
                padding-inline: 60px 70px;

                @media (max-width: 992px) {
                    padding-inline: 30px 30px;
                }

                @media (max-width: 768px) {
                    .widget__image {
                        margin-top: -65px;
                    }
                }
            }

            &[class] {
                @media (max-width: 768px) {
                    padding: 0px 22px 32px 22px;
                    border-radius: 20px;
                    background-color: #f7f7f8;
                    width: 100%;
                }
            }

            &__image {
                display: none;

                @media (max-width: 768px) {
                    display: block;
                    margin-block-end: 35px;
                }
            }

            &__title {
                color: var(--colors-text-main);
                font-family: 'Clash Display', sans-serif;
                font-size: 31px;
                font-weight: 600;
                margin-block-end: 16px;

                @media (max-width: 768px) {
                    font-size: 26px;
                }
            }

            &__description {
                color: var(--colors-text-secondary);
                font-size: 18px;
                font-weight: 400;
                line-height: 28px;
            }
        }
    }
`;
