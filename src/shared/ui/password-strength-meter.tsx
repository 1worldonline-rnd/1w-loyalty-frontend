import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PropsWithClassName } from '@/shared/utility-types';

type PasswordStrengthMeterProps = PropsWithClassName & {
    password: string;
};

const colors: { [key: number]: string } = {
    25: '#fe9710',
    50: '#ffc82f',
    75: '#97d83b',
    100: '#2dd255',
};

const getPasswordStrengthScore = (password: string) => {
    let score = 0;
    if (password.length >= 6) {
        // one special character
        if (/(?=.*[@#$%=!\-+^*.()?<>_:;/|])/g.test(password)) {
            score += 25;
        }
        // one lowercase letter
        if (/([a-z]+)/i.test(password)) {
            score += 25;
        }
        // one uppercase letter
        if (/([A-Z]+)/g.test(password)) {
            score += 25;
        }
        // one number
        if (/\d+/.test(password)) {
            score += 25;
        }
    }
    return score;
};

const getColor = (score: number, order: number) => {
    if (25 * order <= score) {
        return colors[score];
    }
    return undefined;
};

export const PasswordStrengthMeter = styled(({ className, password }: PasswordStrengthMeterProps) => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        setScore(getPasswordStrengthScore(password));
    }, [password]);

    return (
        <label className={className}>
            <span>Password strength</span>
            <meter min="0" max="100" value={score}>
                at {score}/100
            </meter>
            <div className="meter">
                {Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: getColor(score, index + 1),
                            }}
                        ></div>
                    ))}
            </div>
        </label>
    );
})`
    display: block;
    position: relative;
    overflow: hidden;

    span,
    meter {
        position: absolute;
        top: -100vh;
        left: -100vh;
    }

    .meter {
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        margin-block-end: 10px;

        div {
            border-radius: 1px;
            height: 3px;
            background-color: var(
                ${({ theme: { mode } }) => (mode === 'light' ? '--grey-3-color' : '--grey-6-color')}
            );
        }
    }
`;
