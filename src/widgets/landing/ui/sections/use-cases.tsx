import styled from 'styled-components';
import { Container } from '../shared/container';
import type { PropsWithClassName } from '@/shared/utility-types';
import { Button } from '../shared/button';
import { setIsOpenCalendar } from '../../model';

const UnstyledUseCases = ({ className }: PropsWithClassName) => (
    <Container as="section" className={className}>
        <div className="use-cases">
            <h2 className="use-cases__title">Use cases</h2>

            <div className="use-cases__list">
                <div className="use-case use-case--purple">
                    <p className="use-case__label">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <path
                                d="M9.34375 10.9688C9.34375 10.6455 9.47215 10.3355 9.70071 10.107C9.92927 9.8784 10.2393 9.75 10.5625 9.75L17.875 9.75C18.1982 9.75 18.5082 9.8784 18.7368 10.107C18.9653 10.3355 19.0938 10.6455 19.0938 10.9688C19.0938 11.292 18.9653 11.602 18.7368 11.8305C18.5082 12.0591 18.1982 12.1875 17.875 12.1875L10.5625 12.1875C10.2393 12.1875 9.92927 12.0591 9.70071 11.8305C9.47215 11.602 9.34375 11.292 9.34375 10.9688ZM10.5625 16.25H17.875C18.1982 16.25 18.5082 16.1216 18.7368 15.893C18.9653 15.6645 19.0938 15.3545 19.0938 15.0313C19.0938 14.708 18.9653 14.398 18.7368 14.1695C18.5082 13.9409 18.1982 13.8125 17.875 13.8125H10.5625C10.2393 13.8125 9.92927 13.9409 9.70071 14.1695C9.47215 14.398 9.34375 14.708 9.34375 15.0313C9.34375 15.3545 9.47215 15.6645 9.70071 15.893C9.92927 16.1216 10.2393 16.25 10.5625 16.25ZM23.9688 6.5V18.6875C23.9687 19.0609 23.8952 19.4307 23.7523 19.7758C23.6094 20.1208 23.3999 20.4343 23.1358 20.6983C22.8718 20.9624 22.5583 21.1719 22.2133 21.3148C21.8682 21.4577 21.4984 21.5313 21.125 21.5313L3.65625 21.5312C2.7943 21.5312 1.96765 21.1888 1.35815 20.5793C0.74866 19.9699 0.40625 19.1432 0.40625 18.2812L0.40625 8.9375C0.40625 8.61427 0.534654 8.30427 0.763214 8.07571C0.991774 7.84715 1.30177 7.71875 1.625 7.71875C1.94823 7.71875 2.25823 7.84715 2.48679 8.07571C2.71535 8.30427 2.84375 8.61427 2.84375 8.9375L2.84375 18.2812C2.84375 18.4967 2.92935 18.7034 3.08173 18.8558C3.2341 19.0081 3.44076 19.0938 3.65625 19.0938C3.87174 19.0938 4.0784 19.0081 4.23077 18.8558C4.38315 18.7034 4.46875 18.4967 4.46875 18.2812L4.46875 6.5C4.46875 5.96128 4.68276 5.44462 5.06369 5.06369C5.44462 4.68276 5.96128 4.46875 6.5 4.46875L21.9375 4.46875C22.4762 4.46875 22.9929 4.68276 23.3738 5.06369C23.7547 5.44462 23.9688 5.96128 23.9688 6.5ZM21.5312 6.90625L6.90625 6.90625L6.90625 18.2812C6.90679 18.5553 6.87266 18.8283 6.80469 19.0938H21.125C21.2327 19.0938 21.3361 19.0509 21.4123 18.9748C21.4884 18.8986 21.5312 18.7952 21.5312 18.6875V6.90625Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>For publishers</span>
                    </p>

                    <h3 className="use-case__title">Keep your community active as long as possible</h3>

                    <p className="use-case__description">
                        Thanks to the dynamic content united into thematic tracks you can engage your audience
                        as never before.
                        <br />
                        Every article is associated with an activity card which consists of several
                        content-related activities.
                    </p>

                    <ul className="use-case__checks">
                        {[
                            'Engagement ratio > 60%',
                            'Reading time + 200%',
                            'Quizzes completions > 70%',
                            'Conversions +15%',
                        ].map((check, index) => (
                            <li className="use-case__check" key={index}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M8.29389 16.998C7.85889 16.998 7.44689 16.795 7.18289 16.445L2.60989 11.724C2.49943 11.5782 2.41878 11.412 2.37256 11.235C2.32634 11.0581 2.31546 10.8737 2.34053 10.6925C2.36561 10.5113 2.42615 10.3368 2.5187 10.1791C2.61124 10.0213 2.73398 9.88328 2.87989 9.77296C3.02575 9.66218 3.19204 9.58128 3.36922 9.53489C3.5464 9.4885 3.731 9.47753 3.91243 9.50261C4.09386 9.52769 4.26856 9.58834 4.42651 9.68106C4.58446 9.77378 4.72256 9.89677 4.83289 10.043L8.18389 13.147L15.0949 3.65496C15.2909 3.34156 15.6033 3.11871 15.9634 3.03529C16.3235 2.95186 16.702 3.01468 17.0159 3.20996C17.6689 3.61596 17.8699 4.47596 17.4619 5.12996L9.47789 16.34C9.35867 16.5322 9.19434 16.6924 8.99916 16.8067C8.80399 16.921 8.58386 16.986 8.35789 16.996C8.33589 16.998 8.31589 16.998 8.29389 16.998Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>{check}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="use-case use-case--purple">
                    <p className="use-case__label">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <path
                                d="M9.34375 10.9688C9.34375 10.6455 9.47215 10.3355 9.70071 10.107C9.92927 9.8784 10.2393 9.75 10.5625 9.75L17.875 9.75C18.1982 9.75 18.5082 9.8784 18.7368 10.107C18.9653 10.3355 19.0938 10.6455 19.0938 10.9688C19.0938 11.292 18.9653 11.602 18.7368 11.8305C18.5082 12.0591 18.1982 12.1875 17.875 12.1875L10.5625 12.1875C10.2393 12.1875 9.92927 12.0591 9.70071 11.8305C9.47215 11.602 9.34375 11.292 9.34375 10.9688ZM10.5625 16.25H17.875C18.1982 16.25 18.5082 16.1216 18.7368 15.893C18.9653 15.6645 19.0938 15.3545 19.0938 15.0313C19.0938 14.708 18.9653 14.398 18.7368 14.1695C18.5082 13.9409 18.1982 13.8125 17.875 13.8125H10.5625C10.2393 13.8125 9.92927 13.9409 9.70071 14.1695C9.47215 14.398 9.34375 14.708 9.34375 15.0313C9.34375 15.3545 9.47215 15.6645 9.70071 15.893C9.92927 16.1216 10.2393 16.25 10.5625 16.25ZM23.9688 6.5V18.6875C23.9687 19.0609 23.8952 19.4307 23.7523 19.7758C23.6094 20.1208 23.3999 20.4343 23.1358 20.6983C22.8718 20.9624 22.5583 21.1719 22.2133 21.3148C21.8682 21.4577 21.4984 21.5313 21.125 21.5313L3.65625 21.5312C2.7943 21.5312 1.96765 21.1888 1.35815 20.5793C0.74866 19.9699 0.40625 19.1432 0.40625 18.2812L0.40625 8.9375C0.40625 8.61427 0.534654 8.30427 0.763214 8.07571C0.991774 7.84715 1.30177 7.71875 1.625 7.71875C1.94823 7.71875 2.25823 7.84715 2.48679 8.07571C2.71535 8.30427 2.84375 8.61427 2.84375 8.9375L2.84375 18.2812C2.84375 18.4967 2.92935 18.7034 3.08173 18.8558C3.2341 19.0081 3.44076 19.0938 3.65625 19.0938C3.87174 19.0938 4.0784 19.0081 4.23077 18.8558C4.38315 18.7034 4.46875 18.4967 4.46875 18.2812L4.46875 6.5C4.46875 5.96128 4.68276 5.44462 5.06369 5.06369C5.44462 4.68276 5.96128 4.46875 6.5 4.46875L21.9375 4.46875C22.4762 4.46875 22.9929 4.68276 23.3738 5.06369C23.7547 5.44462 23.9688 5.96128 23.9688 6.5ZM21.5312 6.90625L6.90625 6.90625L6.90625 18.2812C6.90679 18.5553 6.87266 18.8283 6.80469 19.0938H21.125C21.2327 19.0938 21.3361 19.0509 21.4123 18.9748C21.4884 18.8986 21.5312 18.7952 21.5312 18.6875V6.90625Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>For publishers</span>
                    </p>

                    <h3 className="use-case__title">Chained content as a new type of advertorial</h3>

                    <p className="use-case__description">
                        The Loyalty HUB provides a game-changer in the advertorial market. The sequential
                        content track with a knowledge acquisition check at the end of each article provides
                        you with new advantages over other competitors.
                        <br />
                        Supported by a high-quality redemption offer the campaign will show higher efficiency
                        than a standard promoted content deployment.
                    </p>

                    <ul className="use-case__checks use-case__checks--full-width">
                        {[
                            'Higher engagement with the promoted content reading',
                            'Assessments as a stimulus for the promoted content learning',
                            'Better conversions to leads with special offers promoted in the redemption store',
                        ].map((check, index) => (
                            <li className="use-case__check" key={index}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M8.29389 16.998C7.85889 16.998 7.44689 16.795 7.18289 16.445L2.60989 11.724C2.49943 11.5782 2.41878 11.412 2.37256 11.235C2.32634 11.0581 2.31546 10.8737 2.34053 10.6925C2.36561 10.5113 2.42615 10.3368 2.5187 10.1791C2.61124 10.0213 2.73398 9.88328 2.87989 9.77296C3.02575 9.66218 3.19204 9.58128 3.36922 9.53489C3.5464 9.4885 3.731 9.47753 3.91243 9.50261C4.09386 9.52769 4.26856 9.58834 4.42651 9.68106C4.58446 9.77378 4.72256 9.89677 4.83289 10.043L8.18389 13.147L15.0949 3.65496C15.2909 3.34156 15.6033 3.11871 15.9634 3.03529C16.3235 2.95186 16.702 3.01468 17.0159 3.20996C17.6689 3.61596 17.8699 4.47596 17.4619 5.12996L9.47789 16.34C9.35867 16.5322 9.19434 16.6924 8.99916 16.8067C8.80399 16.921 8.58386 16.986 8.35789 16.996C8.33589 16.998 8.31589 16.998 8.29389 16.998Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>{check}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="use-case use-case--orange">
                    <p className="use-case__label">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <path
                                    d="M25.031 7.43135C24.7877 7.21805 24.4862 7.08226 24.1652 7.04137C23.8442 7.00047 23.5184 7.05634 23.2293 7.20182L18.466 9.57635L14.4035 2.82346C14.258 2.58184 14.0525 2.38194 13.8069 2.24318C13.5613 2.10442 13.284 2.03149 13.002 2.03149C12.7199 2.03149 12.4426 2.10442 12.197 2.24318C11.9515 2.38194 11.7459 2.58184 11.6004 2.82346L7.53791 9.57635L2.77361 7.20284C2.48487 7.05859 2.15989 7.00303 1.83962 7.04315C1.51936 7.08327 1.21813 7.21728 0.973886 7.42829C0.729643 7.6393 0.553313 7.91787 0.46711 8.22892C0.380907 8.53996 0.388687 8.86956 0.48947 9.1762L4.24728 20.6883C4.30388 20.8617 4.39869 21.0203 4.52472 21.1522C4.65076 21.2841 4.80479 21.386 4.97547 21.4504C5.14615 21.5149 5.32912 21.5402 5.51088 21.5244C5.69264 21.5087 5.86855 21.4524 6.02564 21.3596C6.05002 21.3454 8.5708 19.9063 12.9999 19.9063C17.4291 19.9063 19.9499 21.3474 19.9692 21.3586C20.1263 21.4526 20.3025 21.51 20.4848 21.5265C20.6671 21.543 20.8508 21.5183 21.0223 21.4541C21.1937 21.3899 21.3485 21.2879 21.4751 21.1556C21.6017 21.0234 21.6969 20.8644 21.7536 20.6903L25.5114 9.18432C25.6151 8.87752 25.6248 8.54673 25.5392 8.23439C25.4536 7.92205 25.2767 7.64241 25.031 7.43135ZM19.8585 18.6388C18.5026 18.1188 16.1687 17.4688 12.9999 17.4688C9.83119 17.4688 7.49728 18.1208 6.14142 18.6408L3.39924 10.2406L7.10931 12.086C7.47799 12.2682 7.90158 12.3055 8.29644 12.1906C8.69131 12.0757 9.02875 11.817 9.24213 11.4654L12.9999 5.22034L16.7578 11.4664C16.9713 11.8178 17.3088 12.0764 17.7037 12.1911C18.0985 12.3057 18.522 12.2682 18.8906 12.086L22.5996 10.2375L19.8585 18.6388ZM17.8607 15.4903C17.8163 15.778 17.6705 16.0402 17.4496 16.2297C17.2286 16.4191 16.9472 16.5232 16.6562 16.5232C16.5933 16.523 16.5305 16.5182 16.4683 16.509C14.1677 16.1623 11.8281 16.1623 9.52752 16.509C9.20805 16.5583 8.8821 16.4787 8.62135 16.2876C8.3606 16.0966 8.18642 15.8098 8.13713 15.4903C8.08783 15.1709 8.16746 14.8449 8.3585 14.5842C8.54954 14.3234 8.83634 14.1492 9.1558 14.0999C11.7028 13.7154 14.293 13.7154 16.84 14.0999C16.9984 14.1241 17.1504 14.1793 17.2875 14.2622C17.4245 14.3452 17.5438 14.4544 17.6386 14.5835C17.7334 14.7127 17.8018 14.8592 17.8399 15.0148C17.8781 15.1704 17.8851 15.332 17.8607 15.4903Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </svg>
                        <span>For Brands</span>
                    </p>

                    <h3 className="use-case__title">Teach, motivate, and reward your customers.</h3>

                    <p className="use-case__description">
                        Consolidate all content into a clear, user-friendly path, infused with gamification
                        elements, to ensure a seamless onboarding experience.
                        <br />
                        Help your customers realize your value and your vision.
                    </p>

                    <ul className="use-case__checks">
                        {[
                            'Enhancing evaluation and perception',
                            'Longer Lifetime duration',
                            'Increased conversions',
                        ].map((check, index) => (
                            <li className="use-case__check" key={index}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M8.29389 16.998C7.85889 16.998 7.44689 16.795 7.18289 16.445L2.60989 11.724C2.49943 11.5782 2.41878 11.412 2.37256 11.235C2.32634 11.0581 2.31546 10.8737 2.34053 10.6925C2.36561 10.5113 2.42615 10.3368 2.5187 10.1791C2.61124 10.0213 2.73398 9.88328 2.87989 9.77296C3.02575 9.66218 3.19204 9.58128 3.36922 9.53489C3.5464 9.4885 3.731 9.47753 3.91243 9.50261C4.09386 9.52769 4.26856 9.58834 4.42651 9.68106C4.58446 9.77378 4.72256 9.89677 4.83289 10.043L8.18389 13.147L15.0949 3.65496C15.2909 3.34156 15.6033 3.11871 15.9634 3.03529C16.3235 2.95186 16.702 3.01468 17.0159 3.20996C17.6689 3.61596 17.8699 4.47596 17.4619 5.12996L9.47789 16.34C9.35867 16.5322 9.19434 16.6924 8.99916 16.8067C8.80399 16.921 8.58386 16.986 8.35789 16.996C8.33589 16.998 8.31589 16.998 8.29389 16.998Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>{check}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="use-cases__try-suggestion">
                <h3>Try it and create your successful case</h3>

                <Button
                    onClick={() => {
                        setIsOpenCalendar(true);
                    }}
                >
                    Book a demo
                </Button>
            </div>
        </div>
    </Container>
);

export const UseCases = styled(UnstyledUseCases)`
    max-width: 1720px;

    .use-cases {
        &__title {
            margin-block: 80px 52px;
            color: var(--colors-text-main);
            text-align: center;
            font-family: 'Clash Display';
            font-size: 48px;
            font-weight: 600;

            @media (max-width: 768px) {
                font-size: 30px;
            }
        }

        &__list {
            padding-block-end: 80px;
            background-image: url('/images/landing/use-cases-background.svg');
            background-size: 100% 100%;
        }

        &__try-suggestion {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 1310px;
            border-block-end: 2px solid #ececee;
            gap: 22px;
            padding-block-end: 80px;
            max-width: 1310px;
            margin-inline: auto;

            h3 {
                color: var(--colors-text-main);
                font-family: 'Clash Display';
                font-size: 24px;
                font-weight: 500;
                text-align: center;
            }
        }
    }

    .use-case {
        max-width: 840px;
        margin-inline: auto;
        border-radius: 10px 75px 30px 30px;
        background-color: #fff;
        padding: 40px;
        padding-block-start: 74px;
        position: relative;

        &--purple {
            .use-case__label {
                background-color: #7310ed;
                box-shadow: 0px 3px 15px 0px rgba(115, 16, 237, 0.25),
                    0px 6px 30px 0px rgba(115, 16, 237, 0.15);
            }

            .use-case__check svg {
                color: #7310ed;
            }
        }

        &--orange {
            .use-case__label {
                background-color: #fe5d26;
                box-shadow: 0px 3px 15px 0px rgba(254, 93, 38, 0.25), 0px 6px 30px 0px rgba(254, 93, 38, 0.15);
            }

            .use-case__check svg {
                color: #fe5d26;
            }
        }

        &:not(:last-child) {
            margin-block-end: 36px;
        }

        &__label {
            position: absolute;
            left: 40px;
            top: 0;
            border-radius: 0px 0px 8px 8px;
            padding: 9px 18px;
            display: flex;
            align-items: center;
            gap: 8px;
            text-transform: uppercase;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
        }

        &__title {
            color: var(--colors-text-main);
            font-family: 'Clash Display';
            font-size: 31px;
            font-weight: 600;
            margin-block-end: 18px;

            @media (max-width: 768px) {
                font-size: 26px;
            }
        }

        &__description {
            color: var(--colors-text-secondary);
            font-size: 18px;
            font-weight: 400;
            line-height: 28px;
            margin-block-end: 36px;
        }

        &__checks {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;

            &--full-width {
                .use-case__check {
                    width: 100% !important;
                }
            }

            @media (max-width: 768px) {
                max-width: initial;
                flex-direction: column;
            }

            .use-case__check {
                display: flex;
                align-items: center;
                width: calc((100% - 20px) / 2);
                gap: 8px;

                @media (max-width: 768px) {
                    width: 100%;
                }

                svg {
                    min-width: 20px;
                }

                span {
                    color: var(--colors-text-main);
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 28px;
                }
            }
        }
    }
`;
