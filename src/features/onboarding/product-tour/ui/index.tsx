import React from 'react';
import styled from 'styled-components';
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { CloseIcon } from './icons';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { appModel } from '@/entities/app';
import { getSlidesWithLocale } from '../slides';
import { amplitudeLogEvent } from '@/shared/lib/amplitudeProvider';
import { widgetConfigModel } from '@/entities/widget-config';
import { getGlobalWidgetConfigFx } from '@/entities/widget-config/model/effects';

export const ProductTour = styled(({ className }: PropsWithClassName) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const sliderRef = useRef<Slider>(null);
    const [theme, setTheme] = useState('light');
    const onboardingData = useStore(appModel.stores.$onboardingData);
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const slider = getSlidesWithLocale(currentLocale, theme);
    const partnerExternalId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;
    const widgetId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.guid;

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index: number) => setActiveStepIndex(index),
        customPaging: () => <span className="product-tour-slider__dot"></span>,
    };

    const handleNextSlide = (event: BaseSyntheticEvent) => {
        const buttonName = event.currentTarget.innerText;
        if (buttonName === slider.finishBtn) handleFinishProductTour(buttonName);
        sliderRef?.current?.slickNext();
    };

    const handlePrevSlide = (event: BaseSyntheticEvent) => {
        const buttonName = event.currentTarget.innerText;
        if (buttonName === slider.closeBtn) handleFinishProductTour(buttonName);
        else sliderRef?.current?.slickPrev();
    };

    const handleNextButtonText = () => {
        if (activeStepIndex === 0) return slider.startBtn;
        return slider.slides.length - 1 === activeStepIndex ? slider.finishBtn : slider.nextBtn;
    };

    const handleFinishProductTour = (button: string) => {
        sendFinishTourEvent(button);
        appModel.events.toggleOnboarding({ toggle: false, isInitial: false });
        if (widgetId) {
            widgetConfigModel.effects.createLoyaltyProductTourView(widgetId);
            getGlobalWidgetConfigFx(widgetId);
        }
        setActiveStepIndex(0);
    };

    const getTourProgressStatus = (button: string) => {
        if (button === slider.closeBtn || button === 'CloseIcon') {
            return 'closed';
        } else if (button === slider.finishBtn) {
            return 'finished';
        }
    };

    const sendFinishTourEvent = (button: string) => {
        const eventData = {
            initial_tour: onboardingData.isInitial,
            progress_status: getTourProgressStatus(button),
            onboarding_step: activeStepIndex,
            partner_id: partnerExternalId,
        };

        amplitudeLogEvent('finish_product_tour_click', eventData);
    };

    useEffect(() => {
        if (typeof document !== 'undefined') {
            setTheme(document.body.dataset.theme || 'light');
        }
    }, []);

    useEffect(() => {
        if (onboardingData.isInitial) {
            const eventData = {
                initial_tour: onboardingData.isInitial,
                recall_page: window.location.href,
                partner_id: partnerExternalId,
            };

            amplitudeLogEvent('start_product_tour_click', eventData);
        }
    }, [onboardingData.isInitial]);

    return onboardingData.toggle ? (
        <div className={className}>
            <div className="slider-container" id="product-tour-slider">
                <Slider ref={sliderRef} {...sliderSettings} className="product-tour-slider">
                    {slider.slides.map((slide, index) => {
                        return (
                            <div className="product-tour-slide" key={index}>
                                <div className="product-tour-slide__img-container">
                                    <img src={slide.image} className="product-tour-slide__img"></img>
                                    <Button
                                        onClick={() => handleFinishProductTour('CloseIcon')}
                                        className="product-tour-slide__btn-close"
                                    >
                                        <CloseIcon className="product-tour-slide__btn-close-image" />
                                    </Button>
                                </div>
                                <div className="product-tour-slide__content-container">
                                    <h3
                                        className={`product-tour-slide__title ${
                                            slide.isWelcome && 'product-tour-slide__title--centered'
                                        }`}
                                    >
                                        {slide.title}
                                    </h3>
                                    {slide.content.map((item) => {
                                        return (
                                            <p
                                                className={`product-tour-slide__text ${
                                                    slide.isWelcome && 'product-tour-slide__text--centered'
                                                }`}
                                            >
                                                {item}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </Slider>
                <div className="slider-btn-container">
                    <Button className="slider-btn-container__btn-prev" onClick={handlePrevSlide}>
                        {activeStepIndex === 0 ? slider.closeBtn : slider.backBtn}
                    </Button>
                    <Button className="slider-btn-container__btn-next" onClick={handleNextSlide}>
                        {handleNextButtonText()}
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
})`
    ${styles}
`;
