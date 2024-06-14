/* eslint-disable indent */
import { PropsWithChildren, ReactNode, Children, forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';
import type { PropsWithClassName } from '../utility-types';
import { Loader } from './loader';

// TODO: add aria attrs to components

type TableProps = PropsWithClassName<{
    head: ReactNode;
    body: ReactNode;
    templateColumns?: number[];
    noDataComponent?: ReactNode;
    isLoading?: boolean;
}>;

const TableCommon = styled((props: TableProps) => {
    const { className, head, body, noDataComponent = 'List is empty', isLoading } = props;

    const countBodyChildren = Children.toArray(body).length;

    return (
        <div className={className}>
            <div className="table" data-is-loading={isLoading}>
                <div className="table__head">{head}</div>
                <div className="table__body">
                    {body}

                    {isLoading && <Loader className="table-loader" width={32} color="var(--main-color)" />}

                    {!countBodyChildren && <div className="no-data">{noDataComponent}</div>}
                </div>
            </div>
        </div>
    );
})`
    .table {
        width: 100%;

        &[data-is-loading='true'] .table__body {
            position: relative;

            .table-loader {
                position: absolute;
                left: calc(50% - 16px);
                top: calc(50% - 16px);
                z-index: 2;
            }

            &::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: rgba(250, 250, 250, 0.8);
                z-index: 1;
                opacity: 0;
                pointer-events: none;
                transition: opacity 200ms ease-in-out;

                ${({ isLoading }) =>isLoading && css`
                    opacity: 1;
                    pointer-events: initial;
                `}
            }
        }

        .table__tr {
            width: 100%;
            display: flex;

            .table__th,
            .table__td {
                display: flex;
                align-items: center;
            }
        }

        .table__head .table__tr {
            background-color: var(--grey-6-color);

            .table__th {
                padding: 8px 14px;

                &:not(:first-child) {
                    padding-inline-start: 0;
                }
            }
        }

        .table__body .table__tr {
            border-bottom: 1px solid var(--grey-5-color);

            .table__td {
                padding: 28px 14px;

                &:not(:first-child) {
                    padding-inline-start: 0;
                }
            }
        }

        ${({ templateColumns }) => templateColumns && css`
            .table__td,
            .table__th {
                ${() => {
                    const denominator = templateColumns.reduce((sum, elem) => sum + elem, 0);
                    return templateColumns.map((relativeWidth, index) => {
                        return `&:nth-child(${index + 1}) { width: ${(
                            (relativeWidth / denominator) *
                            100
                        ).toFixed(2)}%; }`;
                    });
                }}
            }
        `}
    }

    .no-data {
        padding: 20px 14px;
        color: var(--text-disabled-color);
        font-size: 18px;
    }
`;

const Th = styled.div.attrs({
    className: 'table__th',
})`
    &,
    * {
        text-transform: uppercase;
    }
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.2;

    button {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 0;
    }
`;

const Td = styled.div.attrs({
    className: 'table__td',
})`
    font-weight: 600;
    font-size: 18px;
    color: var(--text-default-color);
`;

type TrProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    isLoading?: boolean;
    isSuccess?: boolean;
};

const Tr = styled(
    forwardRef<HTMLDivElement, TrProps>(({ className, children, isLoading, isSuccess, ...props }, ref) => {
        return (
            <div className={classNames(className, 'table__tr')} ref={ref} {...props}>
                {children}

                {isLoading && <Loader width={32} className="tr-loader" color="var(--main-color)" />}

                {isSuccess && (
                    <div className="tr-loader">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="16" fill="var(--success-color)" />
                            <path
                                // eslint-disable-next-line max-len
                                d="M22.4768 10.61C22.1949 10.326 21.7359 10.3252 21.453 10.6081L14.0333 18.0279C13.9404 18.1208 13.7898 18.1208 13.6969 18.0279L10.546 14.877C10.2631 14.5941 9.80416 14.5949 9.52223 14.8788L8.69424 15.7127C8.41372 15.9952 8.41453 16.4513 8.69604 16.7329L13.3541 21.3909C13.6363 21.6731 14.0939 21.6731 14.3761 21.3909L23.303 12.464C23.5845 12.1825 23.5853 11.7263 23.3048 11.4438L22.4768 10.61Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                )}
            </div>
        );
    })
)`
    position: relative;

    .tr-loader {
        position: absolute;
        left: calc(50% - 16px);
        top: calc(50% - 16px);
        z-index: 2;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(250, 250, 250, 0.9);
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        transition: opacity 200ms ease-in-out;

        ${({ isLoading, isSuccess }) => (isLoading || isSuccess) && css`
            opacity: 1;
            pointer-events: initial;
        `}
    }
`;

type TableComponent = StyledComponent<(props: TableProps) => JSX.Element, DefaultTheme> & {
    Th: typeof Th;
    Td: typeof Td;
    Tr: typeof Tr;
};

export const Table: TableComponent = Object.assign(TableCommon, {
    Th,
    Td,
    Tr,
});
