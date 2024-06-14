import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { PropsWithClassName } from '@/shared/utility-types';

type LoaderProps = PropsWithClassName & {
    color?: string;
    width?: number;
};

export const Loader = styled(({ className, color = 'currentColor', width = 27 }: LoaderProps) => {
    const id = uuidv4();

    return (
        <div className={className}>
            <svg width={width} height={width} viewBox="0 0 27 26" fill="none">
                <path
                    // eslint-disable-next-line max-len
                    d="M13.4998 23.8335C19.4831 23.8335 24.3332 18.9834 24.3332 13.0002C24.3332 7.01691 19.4831 2.16683 13.4998 2.16683C7.51659 2.16683 2.6665 7.01691 2.6665 13.0002"
                    stroke={`url(#${id})`}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <defs>
                    <linearGradient
                        id={id}
                        x1="22.1665"
                        y1="13.0002"
                        x2="14.9443"
                        y2="43.3335"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor={color} />
                        <stop offset="1" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
})`
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }

    animation: spin 1s linear infinite;
    display: grid;
    place-items: center;
`;
