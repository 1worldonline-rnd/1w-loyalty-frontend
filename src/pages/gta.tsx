import { useEffect, useRef } from 'react';

// this page simulates events of point-balance-widget
const GoogleTagManager = () => {
    const widgetViewEventRef = useRef<HTMLButtonElement>(null);
    const openTrackerWidgetRef = useRef<HTMLButtonElement>(null);
    const loyaltyPageButtonClickRef = useRef<HTMLButtonElement>(null);
    const timeToRewardCounterRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        widgetViewEventRef.current?.click();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const listenWindowMessage = (event: MessageEvent<string>) => {
            try {
                const { message, payload } = JSON.parse(event.data) as { message: string; payload: string };

                if (message === 'gta-pbw') {
                    if (payload === 'open-tracker-widget') {
                        openTrackerWidgetRef.current?.click();
                    } else if (payload === 'loyalty-page-button-click') {
                        loyaltyPageButtonClickRef.current?.click();
                    } else if (payload === 'time-to-reward-counter') {
                        timeToRewardCounterRef.current?.click();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        window.addEventListener('message', listenWindowMessage);

        return () => {
            window.removeEventListener('message', listenWindowMessage);
        };
    }, []);

    return (
        <div>
            <button ref={widgetViewEventRef} id="widgetViewEvent">
                Widget View event
            </button>
            <button ref={openTrackerWidgetRef} id="openTrackerWidget">
                Open Tracker Widget
            </button>
            <button ref={loyaltyPageButtonClickRef} id="loyaltyPageButtonClick">
                Loyalty Page Button Click
            </button>
            <button ref={timeToRewardCounterRef} id="timeToRewardCounter">
                Time to Reward Counter
            </button>
        </div>
    );
};

export default GoogleTagManager;
