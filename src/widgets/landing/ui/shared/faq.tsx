import type { Nullable, PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';
import { useState } from 'react';
import styled from 'styled-components';

export type FaqProps = PropsWithClassName<{
    data: Array<{ question: string; answer: string }>;
}>;

export const Faq = styled(({ data, className }: FaqProps) => {
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<Nullable<number>>(null);

    const toggleQuestion = (index: number) => {
        setActiveQuestionIndex(activeQuestionIndex === index ? null : index);
    };

    return (
        <div className={className}>
            <ul className="faq">
                {data.map(({ question, answer }, index) => {
                    return (
                        <li
                            key={index}
                            className={classNames('faq__item', {
                                'faq__item--active': activeQuestionIndex === index,
                            })}
                        >
                            <button className="faq__question" onClick={() => toggleQuestion(index)}>
                                <span>{question}</span>

                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                                    <path
                                        d="M7.08325 17.0002H26.9166M16.9999 7.0835V26.9168"
                                        stroke="#FA014E"
                                        strokeWidth="3"
                                        strokeLinecap="square"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            <p className="faq__answer">
                                <span dangerouslySetInnerHTML={{ __html: answer }} />
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
})`
    background-color: #fff;

    .faq {
        &__item {
            overflow: hidden;

            &:not(:last-child) {
                border-block-end: 2px solid #f5f5f5;
            }

            &--active {
                .faq__answer {
                    max-height: 300px;
                    opacity: 1;
                }

                .faq__question {
                    svg {
                        transform: rotate(45deg);
                    }
                }
            }
        }

        &__question {
            background-color: transparent;
            padding: 18px 24px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--colors-text-main);
            font-family: 'Clash Display';
            font-size: 22px;
            font-weight: 500;

            span {
                text-align: left;
            }

            svg {
                min-width: 34px;
                transition: transform 100ms ease-in-out;
            }
        }

        &__answer {
            opacity: 0;
            max-height: 0;
            transition: all 200ms linear;
            will-change: opacity, max-height;
            color: var(--colors-text-secondary);
            font-size: 18px;
            line-height: 27px;

            span {
                display: block;
                padding: 18px 24px;
                padding-block-start: 0;

                line-height: 27px;
            }
        }
    }
`;
