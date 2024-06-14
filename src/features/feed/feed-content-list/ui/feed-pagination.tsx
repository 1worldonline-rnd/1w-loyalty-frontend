import type { FeedContentWithId } from '@/shared/api/feed/types';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { useState } from 'react';
import { FEED_CARD_VISIBLE_SIZE } from '../constants';
import { ArrowIcon } from '@/shared/ui/icons';

type FeedPaginationProps = {
    feed: FeedContentWithId[];
    children: (feed: FeedContentWithId[]) => JSX.Element;
};

export const FeedPagination = (props: FeedPaginationProps) => {
    const { children, feed } = props;

    const isShowPagination = feed.length > FEED_CARD_VISIBLE_SIZE;
    const countPages = Math.ceil(feed.length / FEED_CARD_VISIBLE_SIZE);
    const [currentPage, setCurrentPage] = useState(0);

    const sliceFeed = () => {
        if (!isShowPagination) {
            return feed;
        }
        const startIndex = currentPage * FEED_CARD_VISIBLE_SIZE;
        return feed.slice(startIndex, startIndex + FEED_CARD_VISIBLE_SIZE);
    };

    return (
        <>
            {children(sliceFeed())}

            {isShowPagination && (
                <div className="pagination">
                    <Button
                        className="pagination__button"
                        disabled={currentPage <= 0}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        <ArrowIcon isRotate rotateDeg={90} />
                    </Button>
                    <span className="pagination__current-page">
                        {currentPage + 1} / {countPages}
                    </span>
                    <Button
                        className="pagination__button"
                        disabled={currentPage === countPages - 1}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        <ArrowIcon isRotate rotateDeg={-90} />
                    </Button>
                </div>
            )}
        </>
    );
};
