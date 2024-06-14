import styled from 'styled-components';
import { Container } from '../shared/container';
import type { PropsWithClassName } from '@/shared/utility-types';
import { Faq, FaqProps } from '../shared/faq';

const faqData: FaqProps['data'] = [
    {
        question: 'Is it difficult to deploy and manage? ',
        answer: 'No, the Loyalty HUB is a no-code solution that is fully manageable with a friendly admin UI. The implementation time is 1-2 hours for the developer.',
    },
    {
        question: 'How to count the balanced economy?',
        answer: 'We recommend using a comparative approach. It allows you to set values relative to your activities and their value for your business. We will help you to determine them for your specific case.',
    },
    {
        question: 'Who is the target audience?',
        answer: 'The Loyalty HUB works with all users who visit your website. So, these are users that are interested in your solution or content in general. The loyalty program creates additional gamified touch points and helps them realize your advantages and decide a favor your product.',
    },
    {
        question: 'How much content do I need to start?',
        answer: 'It depends on the product and your goals. You can start with 3-5 articles in a content track. Later you can add additional content with another topic. However, the list of activities should be finite to get the main reward, otherwise, users could burn out and the efficiency will go down.',
    },
    {
        question: 'What is the most effective loyalty program configuration?',
        answer: 'We recommend preparing 2-5 content tracks for different topics, for example, common questions and concepts, several tracks with tutorials and guides with assessments and questionnaires, or evergreen content split by topics.<br/> Enabled social media quests and a daily streak will be a plus. This configuration will provide enough touch points to communicate to users and convey to them the advantages that you have.',
    },
];

const UnstyledFAQ = ({ className }: PropsWithClassName) => (
    <Container as="section" className={className} id="faq">
        <div>
            <h2 className="faq__title">Some basic FAQ</h2>

            <img className="faq__image" src="/loyalty/images/landing/faq.png" alt="Questions icon" />
        </div>

        <Faq className="faq-accordion" data={faqData} />
    </Container>
);

export const FAQSection = styled(UnstyledFAQ)`
    max-width: 1094px;
    padding-block: 80px;
    display: flex;
    justify-content: space-between;
    gap: 40px;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    .faq {
        &__title {
            color: var(--colors-text-main);
            text-align: center;
            font-family: 'Clash Display';
            font-size: 38px;
            font-weight: 600;
            margin-block-end: 64px;

            @media (max-width: 768px) {
                font-size: 30px;
                margin-block-end: 40px;
            }
        }

        @media (max-width: 768px) {
            &__image {
                max-width: 240px;
                margin-inline: auto;
            }
        }
    }

    .faq-accordion {
        max-width: 620px;
    }
`;
