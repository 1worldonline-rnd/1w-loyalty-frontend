import styled from 'styled-components';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { FeedContentCard } from './feed-content-card';
import { Feed, FeedContentWithId } from '@/shared/api/feed/types';
import { useRef } from 'react';
import { FeedPagination } from './feed-pagination';

export type FeedListProps = PropsWithClassName & {
    feed: FeedContentWithId[];
    feedId: Feed['id'];
};

export const FeedContentList = styled((props: FeedListProps) => {
    const { className, feed, feedId } = props;
    const listRef = useRef<HTMLUListElement>(null);

    return (
        <div className={className}>
            <FeedPagination feed={feed}>
                {(targetFeed) => (
                    <ul ref={listRef}>
                        {targetFeed.map((card) => (
                            <FeedContentCard key={card.generatedId} feedCard={card} feedId={feedId} />
                        ))}
                    </ul>
                )}
            </FeedPagination>
        </div>
    );
})`
    ${styles}
`;
