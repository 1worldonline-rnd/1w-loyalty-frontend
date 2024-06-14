import { feedModel } from '@/entities/feed';
import { PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import styled, { css } from 'styled-components';

type MessageCompleteSequenceProps = PropsWithClassName<{
    isCompleted: boolean;
    sequenceId: string;
}>;

export const MessageCompleteSequence = styled((props: MessageCompleteSequenceProps) => {
    const { isCompleted, sequenceId, className } = props;

    const sequences = useStore(feedModel.stores.$sequenceFeedList);

    const sequence = sequences.find((sequence) => sequence.partnerFeed.id === sequenceId);

    const { t } = useTranslation('common', { keyPrefix: 'ticket-product' });

    if (!sequence) {
        return null;
    }
    return (
        <div className={className}>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                {isCompleted ? (
                    <path
                        d="M12.2857 5.28726L6.28571 12.1444L3.71428 9.57298"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                ) : (
                    <circle cx="8" cy="8.71582" r="5.5" stroke="currentColor" />
                )}
            </svg>

            <p>{t('complete-sequence')}:</p>

            <p
                className="sequence-name"
                style={{
                    color: isCompleted ? 'var(--text-disabled-color)' : 'rgb(var(--accent-primary-color))',
                }}
            >
                {sequence.name}
            </p>
        </div>
    );
})`
    display: grid;
    grid-template-columns: 16px 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 6px;
    margin-block-end: 14px;

    ${({ theme: { mode } }) => css`
        color: ${mode === 'dark' ? 'var(--text-light-color)' : 'var(--text-default-color)'};
    `}

    .sequence-name {
        grid-column: 2;
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 700;
    }
`;
