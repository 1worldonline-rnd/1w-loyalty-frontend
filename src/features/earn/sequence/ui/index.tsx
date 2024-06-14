import { widgetConfigModel } from '@/entities/widget-config';
import { useWidgetAccentColor } from '@/shared/hooks';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { SequenceSlider } from './sequence-slider';
import { SequenceFeed } from '@/shared/api/feed/types';
import { useTranslation } from 'next-i18next';
import { amplitudeLogEvent } from '@/shared/lib/amplitudeProvider';
import { whichCoinShow } from '@/shared/lib/whichCoinShow';
import { SVGProps } from 'react';
import Link from 'next/link';
import { Route } from '@/shared/constants';

const UnlocksIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="18" height="17" {...props}>
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.22 13.797c.523-.099 1.048-.197 1.307-.554.256-.352.19-.877.123-1.403-.054-.42-.108-.842.002-1.178.103-.32.385-.616.67-.917.37-.39.746-.786.746-1.245 0-.459-.376-.855-.746-1.245-.285-.3-.567-.598-.67-.917-.11-.336-.056-.758-.002-1.177.067-.527.133-1.052-.123-1.404-.26-.356-.784-.455-1.307-.554-.415-.077-.828-.155-1.11-.36-.278-.202-.476-.568-.676-.935-.256-.47-.514-.944-.94-1.083-.405-.131-.876.09-1.353.316-.387.182-.777.367-1.141.367s-.755-.185-1.141-.367C7.382.916 6.91.694 6.506.825c-.426.138-.684.612-.94 1.082-.2.368-.399.733-.676.935-.282.206-.696.283-1.11.361-.523.099-1.048.197-1.307.554-.257.352-.19.876-.123 1.403.054.42.107.842-.002 1.178-.104.32-.385.616-.67.917-.37.39-.746.786-.746 1.245 0 .459.376.855.746 1.245.285.3.567.598.67.917.11.336.056.758.002 1.177-.067.527-.134 1.052.123 1.404.26.356.784.455 1.307.553.414.078.828.156 1.11.361.278.202.476.568.676.935.256.47.514.944.94 1.083.405.131.876-.09 1.353-.316.386-.182.777-.367 1.14-.367.365 0 .755.185 1.142.367.477.225.948.447 1.353.316.426-.138.684-.612.94-1.083.2-.367.398-.732.676-.934.282-.206.695-.283 1.11-.361Zm-1.797-6.695a.75.75 0 1 0-1.06-1.06L8.035 9.367 6.637 7.97a.75.75 0 0 0-1.06 1.06l1.928 1.929a.75.75 0 0 0 1.061 0l3.857-3.857Z"
        />
    </svg>
);

type SequenceProps = PropsWithClassName & {
    sequenceFeed: SequenceFeed;
};

export const Sequence = ({ className, sequenceFeed }: SequenceProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'earn-page.sequence-feed' });
    const widgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const partnerExternalId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;
    const fadeOutShadow =
        widgetConfig?.settings.theme === 'dark'
            ? widgetConfig.settings.darkBgColor
            : widgetConfig?.settings.lightBgColor;

    const accentColor = useWidgetAccentColor();
    const lockedRedemptionItems = sequenceFeed.partnerFeed.lockedRedemptionItems;

    // useEffect(() => {
    //     amplitudeLogEvent('sequence_feed_view', {
    //         sequence_id: sequenceFeed.partnerFeed.id,
    //     });
    // }, [sequenceFeed]);

    return (
        <SequenceFeedStyled className={className} color={accentColor}>
            <div className="sequence-info">
                <h3 className="sequence-name">{sequenceFeed.partnerFeed.name}</h3>
                <div className="sequence-step">
                    <span className="sequence-step__current">
                        {t('step')}: {sequenceFeed.stats.currentStep}/{sequenceFeed.stats.totalSteps}
                    </span>
                    <span className="sequence-step__passed">
                        {t('passed')}: {sequenceFeed.stats.imusPassed}
                    </span>
                </div>
                <a
                    href={sequenceFeed.items[sequenceFeed.stats.currentStep - 1].urlMetadata?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="sequence-button__link"
                >
                    <Button
                        block
                        className="sequence-button"
                        disabled={sequenceFeed.stats.imusPassed === sequenceFeed.stats.totalSteps}
                        onClick={() => {
                            if (sequenceFeed.stats.imusPassed > 0) {
                                amplitudeLogEvent('sequence_feed_start_click', {
                                    partner_id: partnerExternalId,
                                    sequence_id: sequenceFeed.partnerFeed.id,
                                });
                            }
                        }}
                    >
                        {sequenceFeed.stats.imusPassed > 0 ? t('continue-challenge') : t('start-challenge')}{' '}
                        &rarr;
                    </Button>
                </a>
                <div className="points-info">
                    <div className="icon-container">
                        {widgetConfig &&
                            whichCoinShow(
                                sequenceFeed.stats.earnedPoints === sequenceFeed.stats.totalPoints,
                                widgetConfig
                            )}
                    </div>
                    <div className="points-container">
                        <span className="points-earned">
                            {sequenceFeed.stats.earnedPoints}/{sequenceFeed.stats.totalPoints}
                        </span>
                        <span className="points-text">{t('earned-points')}</span>
                    </div>
                    {sequenceFeed.stats.lockedPoints > 0 && (
                        <div className="points-container points-container--locked">
                            <span className="points-earned">{sequenceFeed.stats.lockedPoints}</span>
                            <span className="points-text">{t('locked')}</span>
                        </div>
                    )}
                </div>
                {lockedRedemptionItems && (
                    <div className="locked-items-container">
                        {lockedRedemptionItems.map((item, index) => (
                            <div className="locked-item" key={index}>
                                <UnlocksIcon className="locked-item__icon" />
                                <p className="locked-item__text">
                                    {t('unlocks')}:
                                    <Link
                                        href={{
                                            pathname: Route.redemption,
                                            query: {
                                                loyaltyWidgetId: widgetConfig?.guid,
                                                section: 'available',
                                                productId: item.id,
                                            },
                                        }}
                                    >
                                        <a className="locked-item__link">{item.title}</a>
                                    </Link>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <SequenceSlider
                className="sequence-slider"
                sequenceFeed={sequenceFeed}
                fadeOutShadowColor={fadeOutShadow}
            />
        </SequenceFeedStyled>
    );
};

const SequenceFeedStyled = styled.div<{ color: string }>`
    display: flex;
    gap: 20px;

    .sequence-info {
        width: 356px;
        flex-shrink: 0;
        padding: 26px;
        border-radius: 10px;
        background-color: ${({ theme }) =>
            theme.mode === 'dark' ? 'var(--grey-1-color)' : 'var(--grey-7-color)'};
        display: flex;
        flex-direction: column;
        margin-block-end: 50px;

        .sequence-name {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-dark-color);
            margin-block-end: 12px;
        }

        .sequence-step {
            display: flex;
            gap: 16px;
            font-weight: 600;
            margin-block-end: 18px;

            &__current {
                color: ${(props) => props.color};
            }

            &__passed {
                color: var(--text-default-color);
            }
        }

        .sequence-button__link {
            text-decoration: none;
        }

        .sequence-button {
            background-color: ${(props) => props.color};
            color: #fff;
            font-size: 15px;
            margin-block-end: 28px;
        }

        .points-info {
            margin-block-start: auto;
            display: flex;
            gap: 19px;

            .icon-container {
                width: 38px;
                height: 38px;
            }

            .points-container {
                display: flex;
                flex-direction: column;

                .points-earned {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--text-default-color);
                }

                &--locked {
                    .points-earned {
                        color: var(--text-disabled-color);
                    }
                }

                .points-text {
                    color: var(--text-light-color);
                }
            }
        }

        .locked-items-container {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding-top: 18px;

            .locked-item {
                display: flex;
                align-items: center;
                gap: 2px;
                font-size: 14;
                font-weight: 600;
                line-height: 1.5;

                &__icon {
                    fill: ${(props) => props.color};
                }

                &__text {
                    color: var(--text-dark-color);
                    flex: 1;
                    display: flex;
                    gap: 3px;
                    overflow: hidden;
                }

                &__link {
                    display: block;
                    color: ${(props) => props.color};
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    &:hover {
                        text-decoration: none;
                        opacity: 70%;
                    }
                }
            }
        }
    }

    .sequence-content {
        position: relative;
        list-style: none;
        flex: 1;

        display: flex;
        gap: 12px;

        & > * {
            width: 275px;
            flex-shrink: 0;
        }
    }

    @media (max-width: 1024px) {
        flex-direction: column;

        .sequence-info {
            margin-block-end: 0;
            align-self: center;
        }
    }

    @media (max-width: 380px) {
        .sequence-info {
            width: 100%;
        }
    }
`;
