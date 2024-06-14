import { Feed, SequenceItem } from '@/shared/api/feed/types';

export const useSequenceContentCard = (sequenceItem: SequenceItem, feedId?: Feed['id']) => {
    const {
        partnerFeedItem,
        urlMetadata,
        imuActionRewards
    } = sequenceItem;

    const {
        url: sequenceItemSourceUrl,
        name: sequenceItemName,
        incentive,
    } = partnerFeedItem

    const {
        previewImageUrl,
        title: previewTitle,
    } = urlMetadata

    // const [sourceUrl, setSourceUrl] = useState(sequenceItemSourceUrl);

    const isClicked = sequenceItem.userPreviousActions?.GENERAL_CLICK?.pointType === 32;

    // useEffect(() => {
    //     const url = new URL(feedContentSourceUrl);

    //     url.searchParams.set('1wSourceType', 'feed');
    //     url.searchParams.set('1wSourceId', feedId);

    //     if (incentive && Number(timeToReward) > 0) {
    //         url.searchParams.set('1wIncentiveId', incentive.id);
    //         url.searchParams.set('1wIncentiveSignature', incentive.signature);
    //     }

    //     setSourceUrl(url.toString());
    // }, [feedContentSourceUrl, feedId, incentive, timeToReward]);

    // useEffect(() => {
    //     if (visual?.url) {
    //         setImageUrl(visual.url);
    //     } else if (typeof visual === 'string') {
    //         setImageUrl(visual);
    //     } else if (content) {
    //         // cointribune source
    //         const div = document.createElement('div');
    //         div.innerHTML = content;
    //         const imageUrl = div.querySelectorAll('img')[0]?.src || '';
    //         setImageUrl(imageUrl);
    //     }
    // }, [content, visual]);

    return {
        previewImageUrl,
        sequenceItemSourceUrl,
        imuActionRewards,
        // timeToReward,
        isClicked,
        previewTitle,
        points: incentive?.points,
        timeToReward: incentive?.timeToReward,
    };
};
