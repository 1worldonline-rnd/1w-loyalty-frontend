import styled from 'styled-components';
import { Container } from '../shared/container';
import type { PropsWithClassName } from '@/shared/utility-types';
import Color from 'color';
import { setIsOpenCalendar } from '../../model';

const UnstyledComponents = ({ className }: PropsWithClassName) => (
    <Container as="section" className={className}>
        <div className="components">
            <h2 className="components__title">
                <img
                    src="/loyalty/images/landing/teamwork-shown-on-the-puzzles.png"
                    alt="Teamwork shown on the puzzles"
                />

                <span>Components</span>
            </h2>

            <div className="components__row components__row--3">
                <div className="component">
                    <img
                        src="/loyalty/images/landing/activity-card.png"
                        alt="Activity card"
                        className="component__image"
                    />
                    <h3 className="component__title">Activity card</h3>
                    <p className="component__description">
                        Encourage users to linger on your pages with Activity cards that are related to the
                        particular article.
                    </p>
                </div>

                <div className="component">
                    <img
                        src="/loyalty/images/landing/quiz-sequence.png"
                        alt="Quiz sequence"
                        className="component__image"
                    />
                    <h3 className="component__title">Quiz sequence</h3>
                    <p className="component__description">
                        Articles are structured in a sequence where certain activities must be completed to
                        unlock subsequent steps. This approach acts as a driving force for users' engagement
                        in the learning process.
                    </p>
                </div>

                <div className="component">
                    <img
                        src="/loyalty/images/landing/rewards-cards.png"
                        alt="Rewards cards"
                        className="component__image"
                    />
                    <h3 className="component__title">Rewards cards</h3>
                    <p className="component__description">
                        When a loyal user has completed tasks or finished training, you can provide him with
                        offers for redemption.
                    </p>
                </div>
            </div>

            <div className="components__row components__row--2">
                <div className="component">
                    <img
                        src="/loyalty/images/landing/social-media.png"
                        alt="Social media"
                        className="component__image"
                    />
                    <h3 className="component__title">Social media</h3>
                    <p className="component__description">
                        Ask your audience to follow your public pages and share your content on their profiles
                        with the incentives for these actions.
                    </p>
                </div>

                <div className="component">
                    <img
                        src="/loyalty/images/landing/daily-events.png"
                        alt="Daily events"
                        className="component__image"
                    />
                    <h3 className="component__title">Daily events</h3>
                    <p className="component__description">
                        Motivate your users to visit your website every day to build long-term habits and run
                        the right user perception about recurring activities.
                    </p>
                </div>
            </div>

            <div className="components__row components__row--3">
                <div className="component">
                    <img
                        src="/loyalty/images/landing/event-tracking.png"
                        alt="Event tracking"
                        className="component__image"
                    />
                    <h3 className="component__title">Event tracking</h3>
                    <p className="component__description">
                        On-page notifications motivate users to continue surfing on your web pages and will
                        communicate about important offers or key activities.
                    </p>
                </div>

                <div className="component">
                    <img
                        src="/loyalty/images/landing/themization.png"
                        alt="Themization"
                        className="component__image"
                    />
                    <h3 className="component__title">Themization</h3>
                    <p className="component__description">
                        The vibe is important. The system has to follow users' preferences about the visual
                        styles.
                    </p>
                </div>

                <div className="component">
                    <img
                        src="/loyalty/images/landing/new-feature.png"
                        alt="New feature"
                        className="component__image"
                    />
                    <h3 className="component__title">New feature</h3>
                    <p className="component__description">
                        We are open to discussing your custom requests to provide the best conversions for the
                        acquired to your website audience.
                    </p>
                </div>
            </div>

            <p className="components__additional-info">
                <img src="/loyalty/images/landing/blue-puzzle.png" alt="Blue puzzle" />

                <span>
                    ... and some other components, such as statistics, user settings, working with{' '}
                    <button onClick={() => setIsOpenCalendar(true)}>1WO widgets</button> and more
                </span>
            </p>
        </div>
    </Container>
);

export const Components = styled(UnstyledComponents)`
    .components {
        border-block-end: 2px solid #ececee;

        &__title {
            --image-size: 80px;
            --padding-block: 22px;

            border-radius: 30px;
            background-color: #fcfcfc;
            display: flex;
            align-items: center;
            gap: 10px;
            width: min-content;
            margin-inline: auto;
            padding: var(--padding-block) 30px;

            @media (min-width: 769px) {
                margin-top: calc((var(--padding-block) + var(--image-size) / 2) * -1);
            }

            @media (max-width: 768px) {
                --image-size: 60px;

                margin-block-start: 30px;
                padding: var(--padding-block) 0;
            }

            img {
                width: var(--image-size);
                height: var(--image-size);
            }

            span {
                color: var(--colors-text-main);
                font-family: 'Clash Display';
                font-size: 38px;
                font-weight: 600;

                @media (max-width: 768px) {
                    font-size: 30px;
                }
            }
        }

        &__row {
            --gap: 26px;

            display: flex;
            gap: var(--gap);
            margin-block-start: 60px;

            @media (max-width: 768px) {
                flex-direction: column;
                margin-block-start: 50px;

                --gap: 50px;
            }

            @media (min-width: 769px) {
                &--2 {
                    .component {
                        width: calc((100% - var(--gap)) / 2);
                    }
                }

                &--3 {
                    .component {
                        width: calc((100% - var(--gap) * 2) / 3);
                    }
                }
            }
        }

        .component {
            text-align: center;

            &__title {
                margin-block: 16px 8px;
                color: var(--colors-text-main);
                font-family: 'Clash Display';
                font-size: 24px;
                font-weight: 600;

                @media (max-width: 768px) {
                    font-size: 26px;
                }
            }

            &__description {
                color: var(--colors-text-secondary);
                font-size: 18px;
                line-height: 28px;
            }
        }

        &__additional-info {
            width: min-content;
            margin: 60px auto;
            display: flex;
            align-items: center;
            gap: 26px;

            @media (max-width: 768px) {
                flex-direction: column;
                width: auto;
                text-align: center;
            }

            img {
                width: 77px;
                height: 77px;
            }

            span {
                display: block;
                color: var(--colors-text-secondary);
                font-size: 18px;
                font-weight: 700;
                line-height: 30px;
                max-width: 460px;
                width: max-content;

                @media (max-width: 768px) {
                    width: auto;
                }

                button {
                    font-weight: 700;
                    color: #7310ed;
                    background-color: transparent;
                    padding: 0;
                    display: inline;
                    text-decoration: underline;
                    transition: color 200ms ease-in;

                    &:hover {
                        color: ${Color('#7310ed').darken(0.2).toString()};
                    }
                }
            }
        }
    }
`;
