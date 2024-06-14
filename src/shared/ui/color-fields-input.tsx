import React from 'react';
import { Input } from '../rsuite/admin-panel';
import { PropsWithClassName } from '../utility-types';
import styled from 'styled-components';

type ColorFieldsInputProps = {
    isError: boolean;
    colorValue: string;
    handleColorChange: (newValue: string) => void;
} & React.HTMLAttributes<HTMLInputElement>;

export const ColorFieldsInput = ({
    isError,
    handleColorChange,
    colorValue,
    className,
    ...props
}: ColorFieldsInputProps) => {
    const colorPickerRef = React.useRef<HTMLInputElement>(null);

    return (
        <ColorFieldsInputStyled className={className}>
            <Input
                style={{ flex: 1 }}
                size="lg"
                data-error={isError}
                {...props}
                onChange={(newValue) => {
                    handleColorChange(newValue);
                }}
            />
            <Input
                type="color"
                size="lg"
                {...props}
                onChange={(newValue) => {
                    handleColorChange(newValue);
                }}
                ref={colorPickerRef}
            />
            <button
                className="color-picker-btn"
                onClick={() => colorPickerRef?.current?.click()}
                type="button"
            >
                <span
                    style={{
                        backgroundColor: colorValue,
                    }}
                ></span>
            </button>
        </ColorFieldsInputStyled>
    );
};

const ColorFieldsInputStyled = styled.div`
    position: relative;

    input[type='color'] {
        cursor: pointer;
        position: absolute;
        width: 27px;
        height: 27px;
        padding: 0 1.5px;
        top: 7px;
        right: 5px;
        visibility: hidden;
    }

    .color-picker-btn {
        width: 27px;
        height: 27px;
        border-radius: 20px;
        border: 1px solid var(--grey-3-color);
        position: absolute;
        background-color: transparent;
        padding: 0;
        top: 7px;
        right: 8px;

        span {
            position: absolute;
            top: 3px;
            left: 3px;
            width: 19px;
            height: 19px;
            border-radius: 20px;
        }
    }
`;
