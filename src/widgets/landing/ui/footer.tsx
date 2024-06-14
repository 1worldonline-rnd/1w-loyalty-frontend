import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { Navigation } from './navigation';
import { Container } from './shared/container';
import { icons } from './shared/icons';
import Color from 'color';

export const Footer = styled(({ className }: PropsWithClassName) => (
    <Container className={className}>
        <footer className="footer">
            <div className="footer__top">
                <Navigation className="footer__navigation" />

                <ul className="socials">
                    <li>
                        <a href="https://www.linkedin.com/company/1world-online/" target="_blank">
                            <icons.LinkedIn />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/1World_Online" target="_blank">
                            <icons.Twitter />
                        </a>
                    </li>
                </ul>
            </div>

            <p className="footer__copyrights">&copy; Loyalty Program {new Date().getFullYear()}</p>
        </footer>
    </Container>
))`
    .footer {
        &__top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 28px;
            border-radius: 100px;
            background-color: #f4f5f5;

            @media (max-width: 768px) {
                flex-direction: column;
                gap: 0;
            }
        }

        &__navigation {
            button {
                order: -1;

                @media (max-width: 768px) {
                    display: none;
                }
            }
        }

        .socials {
            display: flex;
            gap: 22px;

            a {
                color: #c4c4c4;
                transition: color 0.2s ease-out;
                display: flex;

                &:hover {
                    color: ${Color('#c4c4c4').darken(0.1).toString()};
                }
            }
        }

        &__copyrights {
            text-align: center;
            padding-block: 50px 60px;
            line-height: 1.5;
            color: var(--colors-text-secondary);
            font-family: 'Clash Display';
            font-size: 16px;
            text-align: center;
            font-weight: 500;
        }
    }
`;
