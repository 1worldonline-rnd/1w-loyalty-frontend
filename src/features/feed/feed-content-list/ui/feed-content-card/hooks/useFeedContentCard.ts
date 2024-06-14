import { useEffect, useState } from 'react';
import { Feed, FeedContentWithId } from '@/shared/api/feed/types';

export const useFeedContentCard = (feedContent: FeedContentWithId, feedId: Feed['id']) => {
    const {
        sourceUrl: feedContentSourceUrl,
        visual,
        summary: { content },
        imuActionRewards,
        timeToReward,
        incentive,
    } = feedContent;

    const [imageUrl, setImageUrl] = useState('');
    const [sourceUrl, setSourceUrl] = useState(feedContentSourceUrl);
    const isClicked = feedContent.userPreviousActions?.GENERAL_CLICK?.pointType === 32;

    useEffect(() => {
        const url = new URL(feedContentSourceUrl);
        setSourceUrl(url.toString());
    }, [feedContentSourceUrl]);

    useEffect(() => {
        if (visual?.url) {
            setImageUrl(visual.url);
        } else if (typeof visual === 'string') {
            setImageUrl(visual);
        } else if (content) {
            // cointribune source
            const div = document.createElement('div');
            div.innerHTML = content;
            const imageUrl = div.querySelectorAll('img')[0]?.src || '';
            setImageUrl(imageUrl);
        }
    }, [content, visual]);

    return {
        imageUrl,
        sourceUrl,
        imuActionRewards,
        timeToReward,
        isClicked,
        title: feedContent.title,
        points: incentive?.points,
    };
};
