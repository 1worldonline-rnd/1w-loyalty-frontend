import type { SVGProps } from 'react';

type SortingDirectionProps = {
    order: 'descending' | 'ascending';
    activeColor?: string;
    baseColor?: string;
};

const pathProps: SVGProps<SVGPathElement> = {
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

export const SortingDirection = (props: SortingDirectionProps) => {
    const { order, activeColor = 'var(--text-light-color)', baseColor = 'var(--grey-3-color)' } = props;
    return (
        <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
            <path
                d="M3.18992 13.4585V1.54138"
                stroke={order === 'ascending' ? activeColor : baseColor}
                {...pathProps}
            />
            <path
                d="M5.17598 11.4723L3.1898 13.4585L1.20361 11.4723"
                stroke={order === 'ascending' ? activeColor : baseColor}
                {...pathProps}
            />
            <path
                d="M9.81052 1.54138V13.4585"
                stroke={order === 'ascending' ? baseColor : activeColor}
                {...pathProps}
            />
            <path
                d="M11.7966 3.52756L9.8104 1.54138L7.82422 3.52756"
                stroke={order === 'ascending' ? baseColor : activeColor}
                {...pathProps}
            />
        </svg>
    );
};
