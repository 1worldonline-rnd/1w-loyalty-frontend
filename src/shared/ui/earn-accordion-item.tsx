import { useState } from 'react';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { PropsWithClassName } from '../utility-types';
import classNames from 'classnames';
import { Button } from '../rsuite/loyalty-platform';
import { IconBadge } from './icon-badge';
import { ArrowRoundedIcon } from './icons';

export const EarnAccordion = styled.div`
    display: flex;
    flex-direction: column;
    gap: 34px;
    padding-block-start: 5px;

    @media screen and (min-width: 1201px) {
        gap: 42px;
    }
`;

export type EarnAccordionItemProps = PropsWithClassName<{
    header: string;
    children: React.ReactNode;
    itemCount?: number;
    completedCount?: number;
    completedText?: string;
}>;

export const EarnAccordionItem = styled(
    ({
        header,
        children,
        itemCount,
        completedCount,
        completedText = '',
        className,
    }: EarnAccordionItemProps) => {
        const [isOpen, setIsOpen] = useState(true);

        return (
            <div className={classNames(className)}>
                <FlexboxGrid
                    as="button"
                    align="middle"
                    justify="space-between"
                    className="accordion__item-header"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h2>{header}</h2>

                    <Button className="accordion__item-btn">
                        <IconBadge
                            className="accordion__item-btn-badge"
                            icon={<span className="item-completed">{completedText}</span>}
                        >
                            {completedCount}/{itemCount}
                        </IconBadge>

                        <ArrowRoundedIcon isRotate={isOpen} />
                    </Button>
                </FlexboxGrid>

                <div className="accordion__item-content" style={{ display: isOpen ? 'block' : 'none' }}>
                    {children}
                </div>
            </div>
        );
    }
)`
    width: 100%;
    margin-block-end: 16px;

    @media screen and (min-width: 1201px) {
        margin-block-end: 0;

        &.social-media {
            min-width: 306px;
        }
    }

    .accordion__item-header {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        background-color: transparent;
        width: 100%;
        padding: 0;

        h2 {
            font-size: 20px;
            line-height: 27px;
            font-weight: 700;
            color: var(--text-dark-color);
        }
    }

    .accordion__item-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        background-color: ${({ theme }) =>
            theme.mode === 'dark' ? 'var(--grey-3-color)' : 'var(--grey-7-color)'} !important;
        border-radius: 30px !important;
        padding-block: 3px;
        padding-inline: 3px 7px;

        svg {
            color: var(--text-default-color);
        }

        &-badge {
            background-color: ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-4-color)' : '#fff')};
        }

        .item-completed {
            font-weight: 600;
            font-size: 17px;
            line-height: 23px;
            color: var(--text-light-color);
        }
    }

    .accordion__item-content {
        margin-block-start: 18px;
    }
`;
