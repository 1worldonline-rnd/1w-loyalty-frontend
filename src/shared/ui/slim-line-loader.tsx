import styled from 'styled-components';

export const SlimLineLoader = styled.div<{ height: number; isLoading: boolean }>`
    height: ${({ height }) => height}px;
    width: 100%;
    position: relative;
    overflow: hidden;
    opacity: ${({ isLoading }) => Number(isLoading)};
    transition: opacity 100ms linear;

    &:before {
        display: block;
        position: absolute;
        content: '';
        left: -30%;
        width: 30%;
        height: 100%;
        border-radius: calc(${({ height }) => height}px / 2);
        background-color: rgb(var(--accent-primary-color));
        animation: loading 2.5s linear infinite;
    }

    @keyframes loading {
        from {
            left: -30%;
            width: 30%;
        }
        50% {
            width: 30%;
        }
        70% {
            width: 70%;
        }
        80% {
            left: 50%;
        }
        95% {
            left: 120%;
        }
        to {
            left: 100%;
        }
    }
`;
