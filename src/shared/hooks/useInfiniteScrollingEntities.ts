// implementation of `infinite-scrolling` taken from here
// https://dev.to/ms_yogii/infinite-scrolling-in-react-with-intersection-observer-22fh

import { useCallback, useEffect, useRef, useState } from 'react';
import { Nullable } from '../utility-types';

const SLICE_SIZE = 5;

type UseInfiniteScrollingEntitiesParams<T> = {
    entities: T[];
};

export const useInfiniteScrollingEntities = <
    E extends Element = Element,
    T = unknown
>({ entities }: UseInfiniteScrollingEntitiesParams<T>) => {
    const [lastEntityRef, setLastEntityRef] = useState<Nullable<E>>(null);
    const [visibleEntities, setVisibleEntities] = useState<typeof entities>([]);
    const [visibleEntitiesCount, setVisibleEntitiesCount] = useState(SLICE_SIZE);

    const onLastEntityRefChange = useCallback((node: E) => {
        setLastEntityRef(node);
    }, []);

    const observer = useRef(
        new IntersectionObserver((entries, observer) => {
            // since we only follow the last element, we need to get only one
            const first = entries[0];
            // if it is observable
            if (first.isIntersecting) {
                // need to increase the number of displayed elements
                setVisibleEntitiesCount((c) => c + SLICE_SIZE);
                // and unsubscribe the element
                observer.unobserve(first.target);
            }
        })
    );

    // keep track of the list of all entities and the number of entities that need to be displayed
    useEffect(() => {
        // if not 0
        if (visibleEntitiesCount) {
            // set the specified number of entities
            setVisibleEntities(() => entities.slice(0, visibleEntitiesCount));
        }
    }, [visibleEntitiesCount, entities]);

    useEffect(() => {
        // if there is a last element in the list
        // if the list of all entities is larger than those that are displayed, then there is more to show
        if (lastEntityRef && entities.length > visibleEntities.length) {
            // so we add a listener to the last element, which will work then,
            // when it falls within the scope of the window
            observer.current.observe(lastEntityRef);
        }
    }, [lastEntityRef, visibleEntities, entities]);

    return {
        onLastEntityRefChange,
        entities: visibleEntities,
    };
};
