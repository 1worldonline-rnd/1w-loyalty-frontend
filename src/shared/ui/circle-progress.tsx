import styled from 'styled-components';

type CircleProgressProps = {
    percent: number;
    width?: number;
    radius?: number;
    strokeWidth?: number;
    className?: string;
    color?: string;
};

export const CircleProgress = styled((props: CircleProgressProps) => {
    const { percent, width = 42, radius = 18, color = 'red', className } = props;

    if (percent < 0 || percent > 100) {
        throw new Error('Percent should be in between 0 and 100');
    }

    return (
        <svg
            className={className}
            style={{
                width,
                height: width,
            }}
        >
            <circle className="svg-ci-track" />
            <circle
                className="svg-ci-indicator"
                style={{
                    strokeDashoffset: `calc(2 * 3.14 * ${radius}px * ${1 - percent / 100})`,
                    strokeDasharray: `calc(2 * 3.14 * ${radius}px)`,
                }}
            />
        </svg>
    );
})`
    transform: rotate(-90deg);

    .svg-ci-track {
        stroke: ${({theme}) => theme.mode === 'dark' ? '#3B434E' : '#ecedee'};
    }

    .svg-ci-indicator {
        stroke: ${({ color }) => color};
        stroke-linecap: round;
    }

    .svg-ci-track,
    .svg-ci-indicator {
        cx: calc(${({ width = 42 }) => width}px / 2);
        cy: calc(${({ width = 42 }) => width}px / 2);
        r: ${({ radius = 18 }) => radius}px;
        fill: transparent;
        stroke-width: ${({ strokeWidth = 4 }) => strokeWidth}px;
    }
`;
