import styled from 'styled-components';
import { Container } from '../shared/container';
import type { PropsWithClassName } from '@/shared/utility-types';

const UnstyledCointribune = ({ className }: PropsWithClassName) => (
    <Container as="section" className={className}>
        <div className="cointribune">
            <img
                src="/loyalty/images/landing/cointribune.svg"
                alt="Cointribune's logotype"
                className="cointribune__icon"
            />

            <h2 className="cointribune__title">
                <span>Cointribune</span> case study
            </h2>

            <ul className="cointribune__benefits">
                <li className="cointribune__benefit benefit">
                    <span className="benefit__percent">+{50}%</span>
                    <p className="benefit__description">
                        Conversions from Landing <br />
                        page to the Loyalty page
                    </p>
                </li>
                <li className="cointribune__benefit benefit">
                    <span className="benefit__percent">+{70}%</span>
                    <p className="benefit__description">
                        Assessments completion of <br />
                        the learning content
                    </p>
                </li>
                <li className="cointribune__benefit benefit">
                    <span className="benefit__percent">+{80}%</span>
                    <p className="benefit__description">
                        Conversion to content related
                        <br />
                        activities
                    </p>
                </li>
            </ul>

            {/* <div className="cointribune__quotation quotation">
                <div className="quotation__author author">
                    <a
                        href="https://www.linkedin.com/in/sarah-de-lima-/"
                        target="_blank"
                        className="author__avatar"
                    >
                        <img src="/loyalty/images/landing/quotation-author-avatar.jpg" alt="Sarah De Lima" />
                    </a>

                    <h3 className="author__name">Sarah De Lima</h3>

                    <p className="author__position">Builder & Investor Tech enthusiast</p>
                </div>

                <p className="quotation__content">
                    <svg className="quotation__icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                            d="M19.335 20.3862C21.8588 20.3862 23.9165 18.3335 23.9165 15.8047C23.9165 13.4644 22.1216 11.5059 19.8408 11.253C19.7812 10.2564 20.1333 9.30936 20.9018 8.43173C21.0804 8.22842 21.0605 7.91607 20.8523 7.73259C20.7581 7.65327 20.644 7.61359 20.525 7.61359C20.401 7.61359 20.2771 7.65823 20.1829 7.75244C20.1383 7.77723 20.0341 7.81194 19.9746 7.83672C19.8804 7.87144 19.7912 7.90118 19.7317 7.93589C17.7335 8.94738 16.2014 10.4448 15.413 12.1505C14.9568 13.1421 14.7039 14.3024 14.7039 15.3932C14.7039 15.5419 14.7089 15.6907 14.7188 15.8395C14.8825 18.3484 16.955 20.3862 19.335 20.3862Z"
                            fill="#D1D1D6"
                        />
                        <path
                            d="M8.71417 20.3862C11.2379 20.3862 13.2957 18.3335 13.2957 15.8047C13.2957 13.4644 11.5007 11.5059 9.21493 11.253C9.1604 10.2564 9.51245 9.30936 10.276 8.43173C10.4595 8.22842 10.4347 7.91607 10.2314 7.73259C10.1372 7.65327 10.0182 7.61359 9.90415 7.61359C9.78019 7.61359 9.65623 7.65823 9.55706 7.75244C9.51741 7.77723 9.41328 7.81194 9.35378 7.83672C9.25461 7.87144 9.17032 7.90118 9.10587 7.93589C7.11261 8.94738 5.58051 10.4448 4.79212 12.1505C4.33597 13.1421 4.08309 14.3024 4.08309 15.3932C4.08309 15.5419 4.08805 15.6907 4.09798 15.8395C4.26158 18.3484 6.32922 20.3862 8.71417 20.3862Z"
                            fill="#D1D1D6"
                        />
                    </svg>
                    Morbi tincidunt ornare massa eget egestas purus. Feugiat sed lectus vestibulum mattis
                    ullamcorper velit sed. Urna condimentum mattis pellentesque id nibh tortor bibendum enim
                    facilisis gravida.
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                            d="M8.66498 7.61377C6.14121 7.61377 4.0835 9.66652 4.0835 12.1953C4.0835 14.5356 5.87841 16.4941 8.15922 16.747C8.21875 17.7436 7.8667 18.6906 7.09817 19.5683C6.91964 19.7716 6.93949 20.0839 7.14774 20.2674C7.24195 20.3467 7.35598 20.3864 7.475 20.3864C7.59896 20.3864 7.72292 20.3418 7.81713 20.2476C7.86174 20.2228 7.96587 20.1881 8.02537 20.1633C8.11958 20.1286 8.20882 20.0988 8.26832 20.0641C10.2665 19.0526 11.7986 17.5552 12.587 15.8495C13.0432 14.8579 13.2961 13.6976 13.2961 12.6068C13.2961 12.4581 13.2911 12.3093 13.2812 12.1605C13.1175 9.65163 11.045 7.61377 8.66498 7.61377Z"
                            fill="#D1D1D6"
                        />
                        <path
                            d="M19.2858 7.61377C16.7621 7.61377 14.7043 9.66652 14.7043 12.1953C14.7043 14.5356 16.4993 16.4941 18.7851 16.747C18.8396 17.7436 18.4875 18.6906 17.724 19.5683C17.5405 19.7716 17.5653 20.0839 17.7686 20.2674C17.8628 20.3467 17.9818 20.3864 18.0959 20.3864C18.2198 20.3864 18.3438 20.3418 18.4429 20.2476C18.4826 20.2228 18.5867 20.1881 18.6462 20.1633C18.7454 20.1286 18.8297 20.0988 18.8941 20.0641C20.8874 19.0526 22.4195 17.5552 23.2079 15.8495C23.664 14.8579 23.9169 13.6976 23.9169 12.6068C23.9169 12.4581 23.9119 12.3093 23.902 12.1605C23.7384 9.65163 21.6708 7.61377 19.2858 7.61377Z"
                            fill="#D1D1D6"
                        />
                    </svg>
                </p>
            </div> */}
        </div>
    </Container>
);

export const Cointribune = styled(UnstyledCointribune)`
    padding-block: 80px;
    border-block-end: 2px solid #ececee;

    .cointribune {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 960px;
        margin-inline: auto;

        &__icon {
            width: 200px;
        }

        &__title {
            color: var(--colors-text-main);
            font-family: 'Clash Display';
            font-size: 30px;
            font-weight: 600;
            margin-block: 26px 32px;
            text-align: center;

            span {
                color: #fe6817;
            }
        }

        &__benefits {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 30px;

            @media (max-width: 768px) {
                flex-direction: column;
            }

            .benefit {
                text-align: center;

                &__percent {
                    color: #fe6817;
                    font-size: 38px;
                    font-weight: 900;
                }

                &__description {
                    color: var(--colors-text-secondary);
                    text-align: center;
                    font-family: 'Clash Display';
                    font-size: 20px;
                    font-weight: 500;
                    line-height: 28px;
                }
            }
        }

        /* .quotation {
            margin-block-start: 52px;
            display: flex;
            gap: 70px;

            @media (max-width: 768px) {
                flex-direction: column-reverse;
            }

            &__author {
                min-width: 270px;
            }

            &__content {
                width: calc(100% - 340px);
                color: var(--colors-text-main);
                font-size: 24px;
                line-height: 36px;
                position: relative;

                @media (max-width: 768px) {
                    width: calc(100% - 36px);
                    margin-inline-start: 36px;
                }

                .quotation__icon {
                    position: absolute;
                    top: 0;
                    left: -8px;
                    transform: translateX(-100%);
                }
            }

            .author {
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                &__avatar {
                    width: 62px;
                    height: 62px;
                    margin-block-end: 12px;
                }

                &__name {
                    color: var(--colors-text-main);
                    font-family: 'Clash Display';
                    font-size: 22px;
                    font-weight: 600;
                    line-height: 33px;
                }

                &__position {
                    color: var(--colors-text-secondary);
                    font-size: 18px;
                }
            }
        } */
    }
`;
