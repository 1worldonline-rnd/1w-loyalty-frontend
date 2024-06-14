import { useEffect, useState } from 'react';

// TODO: add height of window

/**
 * @description hook returns width of window
 */
export const useWindowSize = () => {
    const [width, setWidth] = useState(0);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWidth(window.innerWidth);
            };
            // add event listener
            window.addEventListener('resize', handleResize);
            // call handler right away so state gets updated with initial window size
            handleResize();
            // remove event listener on cleanup
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return width;
};
