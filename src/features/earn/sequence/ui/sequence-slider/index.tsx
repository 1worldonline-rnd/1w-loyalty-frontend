import { PropsWithClassName } from '@/shared/utility-types';
import { useEffect, useRef } from 'react';
import { SequenceContentCard } from '../sequence-content-card';
import styled from 'styled-components';
import { ArrowIcon } from '@/shared/ui/icons';
import { SequenceFeed } from '@/shared/api/feed/types';

type SequenceSliderProps = PropsWithClassName & {
    sequenceFeed: SequenceFeed;
    fadeOutShadowColor?: string;
};

export const SequenceSlider = ({
    sequenceFeed,
    fadeOutShadowColor = '#fff',
    className,
}: SequenceSliderProps) => {
    const containerRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, sequenceFeed.items.length);

        const currentStepItem = itemRefs.current[sequenceFeed.stats.currentStep - 1];
        if (currentStepItem && containerRef.current) {
            const currentStepItemPosition = currentStepItem.offsetLeft;
            containerRef.current.scrollLeft = currentStepItemPosition;
        }
    }, [sequenceFeed]);

    const handleArrowClick = (direction: number) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: direction * 287, behavior: 'smooth' });
        }
    };

    return (
        <SequenceSliderStyled fadeOutShadowColor={fadeOutShadowColor} className={className}>
            <ul className="sequence-content" ref={containerRef}>
                {sequenceFeed.items.map((item, index) => (
                    <SequenceContentCard
                        ref={(el) => (itemRefs.current[index] = el)}
                        key={item.partnerFeedItem.id}
                        sequenceItem={item}
                        currentStep={sequenceFeed.stats.currentStep}
                    />
                ))}
            </ul>
            <div className="nav-buttons">
                <button className="nav-btn" onClick={() => handleArrowClick(-1)}>
                    <ArrowIcon isRotate />
                </button>
                <button className="nav-btn" onClick={() => handleArrowClick(1)}>
                    <ArrowIcon isRotate />
                </button>
            </div>
        </SequenceSliderStyled>
    );
};

const SequenceSliderStyled = styled.div<{ fadeOutShadowColor: string }>`
    overflow-x: auto !important;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 40px;
        background: ${({ theme }) => theme.mode === 'dark' ? 
            'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(31, 41, 55) 100%)' :
            'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)' };
        pointer-events: none;
    }

    .sequence-content {
        padding-inline-end: 30px;
        padding-block-end: 12px;
        overflow-x: scroll !important;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        max-width: calc(100vw - 16px * 2); // 16px is padding-inline of <main class"container"></main>
    }

    .sequence-content::-webkit-scrollbar {
        display: none;
    }

    .nav-buttons {
        display: flex;
        gap: 10px;
    }

    .nav-btn {
        border-radius: 40px;
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${({ theme }) => theme.mode === 'dark' ? 'var(--grey-3-color)' : 'var(--grey-7-color)'};
        color: var(--text-default-color);
        transition: all .2s ease-out;

        &:hover{
            background-color: ${({ theme }) => theme.mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-7-color)'};
        }

        &:first-child {
            transform: rotate(270deg);
        }

        &:last-child {
            transform: rotate(90deg);
        }

        svg {
            width: 22px;
            height: 22px;
        }
    }
`;
