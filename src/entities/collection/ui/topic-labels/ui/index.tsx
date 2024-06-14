import { widgetConfigModel } from '@/entities/widget-config';
import { whichCoinShow } from '@/shared/lib/whichCoinShow';
import { PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';

export type TopicLabelsProps = PropsWithClassName<{
    cardLabel: string;
    pointsLabel: string;
    isShowPoints?: boolean;
}>;

export const TopicLabels = styled((props: TopicLabelsProps) => {
    const { className, cardLabel, pointsLabel, isShowPoints = true } = props;

    const widgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);

    return (
        <FlexboxGrid className={className}>
            <div className="topic-label">
                <div className="topic-label-icon">
                    <svg width="16" height="16" fill="none">
                        <g fill="currentColor">
                            <path d="m14.009 2.981-2.56-.772a.546.546 0 1 0-.315 1.046l2.564.773a.955.955 0 0 1 .652 1.183l-2.575 8.881a.95.95 0 0 1-1.179.644l-2.315-.671a.546.546 0 1 0-.305 1.049l2.322.673a2.04 2.04 0 0 0 2.528-1.397L15.4 5.516a2.048 2.048 0 0 0-1.39-2.535Z" />
                            <path d="M10.294 12.705a2.028 2.028 0 0 0 .471-1.495l-.788-9.205A2.048 2.048 0 0 0 7.762.14L2.393.6A2.048 2.048 0 0 0 .528 2.813l.788 9.206.001.006a2.039 2.039 0 0 0 2.212 1.858l5.379-.46a2.023 2.023 0 0 0 1.386-.719Zm-6.865.09a.938.938 0 0 1-.69-.219.949.949 0 0 1-.334-.65l-.789-9.205a.956.956 0 0 1 .87-1.033l5.369-.46a.947.947 0 0 1 1.033.87l.789 9.213a.946.946 0 0 1-.869 1.024l-5.379.46Z" />
                            <path d="m7.2 10.167-2.612.224a.546.546 0 0 0 .093 1.088l2.613-.224a.547.547 0 1 0-.093-1.088ZM7.956 8.065l-4.555.39a.546.546 0 1 0 .093 1.089l4.555-.39a.546.546 0 1 0-.093-1.09Z" />
                        </g>
                    </svg>
                </div>

                <span>{cardLabel}</span>
            </div>
            {isShowPoints && (
                <div className="topic-label topic-label--without-background">
                    <div className="topic-label-icon">
                        {widgetConfig && whichCoinShow(true, widgetConfig)}
                    </div>

                    <span>{pointsLabel}</span>
                </div>
            )}
        </FlexboxGrid>
    );
})`
    gap: 6;

    .topic-label {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--text-default-color);
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        padding: 6px 10px;
        border-radius: 4px;
        background-color: ${({ theme: { mode } }) =>
            mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-7-color)'};

        &--without-background {
            background-color: transparent;
        }

        &-icon {
            width: 16px;
            height: 16px;
        }
    }
`;
