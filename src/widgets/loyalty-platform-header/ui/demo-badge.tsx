import { isAvailableLocalStorage } from '@/shared/lib/isAvailableLocalStorage';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { If, Tooltip } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { useMediaQuery } from 'usehooks-ts';

const InfoIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.50008" cy="7.50002" r="5.83333" stroke="currentColor" />
        <path
            d="M7.3426 5.93259C7.68637 5.93259 7.92437 6.03837 8.0566 6.24993C8.19543 6.45487 8.26485 6.73254 8.26485 7.08293C8.26485 7.24159 8.24832 7.45645 8.21526 7.72751C8.18221 7.99857 8.14585 8.28284 8.10618 8.58034C8.06651 8.87784 8.03015 9.1489 7.9971 9.39351C7.96404 9.63812 7.94751 9.81662 7.94751 9.92901C7.94751 10.0348 7.96404 10.1042 7.9971 10.1373C8.03015 10.1703 8.06321 10.1868 8.09626 10.1868C8.1756 10.1868 8.25493 10.1306 8.33426 10.0183C8.4136 9.90587 8.49624 9.70093 8.58218 9.40343L9.11768 9.56209C9.09124 9.70093 9.03835 9.85959 8.95901 10.0381C8.88629 10.2166 8.78712 10.3885 8.66151 10.5538C8.5359 10.7124 8.38385 10.8446 8.20535 10.9504C8.03346 11.0562 7.83512 11.1091 7.61035 11.1091C7.24674 11.1091 6.99551 11.0099 6.85668 10.8116C6.72446 10.6133 6.65835 10.3389 6.65835 9.98851C6.65835 9.79679 6.67487 9.5687 6.70793 9.30426C6.74099 9.03982 6.77735 8.76876 6.81701 8.49109C6.86329 8.21343 6.90296 7.95559 6.93601 7.71759C6.96907 7.47298 6.9856 7.27134 6.9856 7.11268C6.9856 7.00029 6.96907 6.93087 6.93601 6.90443C6.90296 6.87137 6.8666 6.85484 6.82693 6.85484C6.75421 6.85484 6.67818 6.91104 6.59885 7.02343C6.51951 7.13582 6.43687 7.34076 6.35093 7.63826L5.81543 7.47959C5.84187 7.34076 5.89476 7.18209 5.9741 7.00359C6.05343 6.82509 6.1559 6.65651 6.28151 6.49784C6.41374 6.33257 6.56579 6.19704 6.73768 6.09126C6.91618 5.98548 7.11782 5.93259 7.3426 5.93259ZM7.68968 3.43359C7.90785 3.43359 8.08304 3.51293 8.21526 3.67159C8.3541 3.83026 8.4169 4.02529 8.40368 4.25668C8.39707 4.48145 8.32104 4.67318 8.1756 4.83184C8.03015 4.9839 7.84835 5.05993 7.63018 5.05993C7.4054 5.05993 7.2236 4.9839 7.08476 4.83184C6.95254 4.67318 6.88974 4.48145 6.89635 4.25668C6.90957 4.02529 6.99551 3.83026 7.15418 3.67159C7.31285 3.51293 7.49135 3.43359 7.68968 3.43359Z"
            fill="currentColor"
        />
    </svg>
);

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
            d="M12.9375 12.9375L5.0625 5.0625"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12.9375 5.0625L5.0625 12.9375"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const DemoBadge = styled((props: PropsWithClassName) => {
    const { className } = props;

    const { t } = useTranslation('common', { keyPrefix: 'demo-badge' });

    const [isShow, setIsShow] = useState(() => {
        if (isAvailableLocalStorage()) {
            return localStorage.getItem('isHiddenDemoBadge') !== '1';
        }
        return false;
    });

    const isWidthLess768 = useMediaQuery('(max-width: 768px)');

    const closeDemoBadge = () => {
        setIsShow(false);

        if (isAvailableLocalStorage()) {
            localStorage.setItem('isHiddenDemoBadge', '1');
        }
    };

    const CloseButton = () => (
        <Button onClick={closeDemoBadge} className="btn-close">
            <CloseIcon />
        </Button>
    );

    const Description = () => <p className="description">{t('description')} ⚡️</p>;

    return (
        <If condition={isShow}>
            <div className={className}>
                {isWidthLess768 ? (
                    <Tooltip content={t('tooltip-content')} direction="bottom" event="click">
                        <FlexboxGrid align="middle" style={{ gap: 4 }}>
                            <InfoIcon />

                            <Description />
                        </FlexboxGrid>
                    </Tooltip>
                ) : (
                    <>
                        <Tooltip content={t('tooltip-content')} direction="bottom" event="hover">
                            <InfoIcon />
                        </Tooltip>

                        <Description />
                    </>
                )}

                <CloseButton />
            </div>
        </If>
    );
})`
    padding: 5px;
    border-block-end: 1px solid;
    border-color: ${({ theme: { mode } }) =>
        mode === 'light' ? 'var(--grey-5-color)' : 'var(--grey-6-color)'};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: var(--text-default-color);

    .tooltip-wrapper {
        display: flex;
    }

    .tooltip {
        width: 195px;
        font-size: 12px;
        font-weight: 400;
        z-index: 99;
    }

    .btn-close {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        padding: 0;
        background-color: transparent;
    }
`;
