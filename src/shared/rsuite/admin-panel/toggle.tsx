import { Toggle as RsuiteToggle, ToggleProps as RsuiteToggleProps } from 'rsuite';
import { RsRefForwardingComponent } from 'rsuite/esm/@types/common';
import styled, { css } from 'styled-components';

export type ToggleProps = RsuiteToggleProps;

type ToggleType = RsRefForwardingComponent<'input', ToggleProps>;

const styles = css<ToggleProps>`
    &.rs-toggle {
        > input:checked + span {
            background-color: var(--main-color);

            &:hover {
                background-color: var(--main-color);
            }

            &::after {
                left: 100%;
                margin-left: -20px;
            }
        }

        .rs-toggle-presentation {
            min-width: 38px;
            height: 22px;

            &::after {
                top: 2px;
                left: 2px;
                background-color: var(--text-white-color);
            }
        }

        & > input[disabled] + .rs-toggle-presentation::after {
            cursor: not-allowed;
        }
    }

    &.rs-toggle-sm {
        > input:checked + span {
            &::after {
                left: 100%;
                margin-left: -16px;
            }
        }

        .rs-toggle-presentation {
            min-width: 32px;
            height: 18px;
            border-radius: 15px;

            &::after {
                top: 2px;
                left: 2px;
                height: 14px;
                width: 14px;
                border-radius: 50%;
            }
        }
    }

    &.rs-toggle-disabled .rs-toggle-presentation {
        box-shadow: none;
    }

    &.rs-toggle-disabled.rs-toggle-checked .rs-toggle-presentation {
        background-color: var(--rs-toggle-disabled-bg);
        color: var(--rs-toggle-disabled-thumb);
        box-shadow: none;
        cursor: not-allowed;
    }
`;

export const Toggle: ToggleType = styled((props: ToggleProps) => {
    return <RsuiteToggle {...props} />;
})<ToggleProps>`
    ${styles}
`;
