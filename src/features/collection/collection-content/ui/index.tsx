import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { styles } from './styles';
import { useStore } from 'effector-react';
import { $collections } from '../model';
import { FlexboxGrid } from 'rsuite';
import { useCustomRouter } from '@/shared/hooks';
import { Route } from '@/shared/constants';
import Slider, { Settings as SliderSettings } from 'react-slick';
import classNames from 'classnames';
import { TopicLabels } from '@/entities/collection';

const sliderSettings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: true,
    responsive: [
        {
            breakpoint: 980,
            settings: {
                slidesToShow: 2.5,
                initialSlide: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                initialSlide: 1,
            },
        },
    ],
};

export const CollectionContent = styled((props: PropsWithClassName) => {
    const { className } = props;

    const { push } = useCustomRouter();

    const collections = useStore($collections);

    if (!collections) {
        return null;
    }
    return (
        <div className={className}>
            {collections.map(({ id: collectionId, name: collectionName, topics }) => {
                const moreThenTwoTopics = topics.length > 3;
                const TopicsContainer = moreThenTwoTopics ? Slider : FlexboxGrid;

                return (
                    <section className="collection" id={collectionId}>
                        <h2 className="collection__title">{collectionName}</h2>

                        <TopicsContainer
                            {...(moreThenTwoTopics
                                ? sliderSettings
                                : { className: classNames('topics', `topics--length-${topics.length}`) })}
                        >
                            {topics.map(
                                ({
                                    id: topicId,
                                    name: topicName,
                                    logo,
                                    description,
                                    articleImage,
                                    articleTitle,
                                    countNews,
                                    totalPoints,
                                }) => (
                                    <div
                                        className="topic"
                                        key={topicId}
                                        onClick={() => {
                                            push({
                                                pathname: Route.topic(topicId),
                                            });
                                        }}
                                    >
                                        <header className="topic__header">
                                            <img className="topic__logo" src={logo} alt={topicName} />
                                            <h3 className="topic__name">{topicName}</h3>
                                        </header>

                                        <p className="topic__description">{description}</p>

                                        <TopicLabels
                                            cardLabel={`${countNews} News`}
                                            pointsLabel={`${totalPoints.toLocaleString('en-US')}+`}
                                            isShowPoints={totalPoints > 0}
                                        />

                                        <article className="topic__article">
                                            <h4 className="topic__article-title">{articleTitle}</h4>

                                            <img
                                                className="topic__article-image"
                                                src={articleImage}
                                                alt={articleTitle}
                                            />
                                        </article>

                                        <div className="topic__fake-article" />
                                        <div className="topic__fake-article topic__fake-article--second" />
                                    </div>
                                )
                            )}
                        </TopicsContainer>
                    </section>
                );
            })}
        </div>
    );
})`
    ${styles}
`;
