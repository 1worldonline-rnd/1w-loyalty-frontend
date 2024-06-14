import styled from 'styled-components';
import { $isOpenCalendar, setIsOpenCalendar } from '../model';
import { useStore } from 'effector-react';
import classNames from 'classnames';
import type { PropsWithClassName } from '@/shared/utility-types';
import { useEffect } from 'react';

export const Calendly = styled(({ className }: PropsWithClassName) => {
    const isOpen = useStore($isOpenCalendar);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div
            className={classNames(className, { 'calendly--open': isOpen })}
            onClick={() => {
                setIsOpenCalendar(false);
            }}
        >
            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/roman-sirenko/loyalty-program-demo?primary_color=fa014e"
                style={{ width: 'min(calc(100vw - 20px), 600px)', height: 'min(calc(100vh - 20px), 600px)' }}
            />
        </div>
    );
})`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: -1;

    &.calendly--open {
        opacity: 1;
        z-index: 5;

        .calendly-inline-widget {
            transform: scale(1);
        }
    }

    .calendly-inline-widget {
        transform: scale(0.9);
        transition: all 0.2s ease-in-out;
    }
`;
