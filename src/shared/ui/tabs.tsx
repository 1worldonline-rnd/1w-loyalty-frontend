import styled from 'styled-components';
import { PropsWithClassName } from '../utility-types';

export type TabsProps = PropsWithClassName<{
    data: Array<{ label: string; key: string }>;
    onClickTab: (key: string) => void;
    activeTab: string;
}>;

const TabsUnstyled = (props: TabsProps) => {
    const { className, data, onClickTab, activeTab } = props;

    return (
        <nav className={className}>
            <ul>
                {data.map(({ key, label }) => (
                    <li key={key}>
                        <button
                            onClick={() => {
                                onClickTab(key);
                            }}
                            data-is-active={key === activeTab}
                        >
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export const Tabs = styled(TabsUnstyled)`
    ul {
        display: flex;
        gap: 30px;
        border-bottom: 1px solid var(--grey-3-color);
    }

    button {
        padding: 0 0 8px 0;
        background-color: transparent;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #404854;
        border-block-end: 2px solid transparent;
    }

    [data-is-active='true'] {
        position: relative;
        color: #1f242b;

        &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: #1f242b;
            bottom: -3px;
            left: 0;
        }
    }
`;
