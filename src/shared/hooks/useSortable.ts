import { useCallback, useMemo, useState } from 'react';
import { Nullable } from '../utility-types';

type UseSortableResponse<T> = {
    sortedData: T[];
    handleSorting: (sortField: keyof T, sortOptions?: Intl.CollatorOptions) => void;
    sortField: Nullable<keyof T>;
    sortOrder: 'descending' | 'ascending';
};

export const useSortable = <T>(data: T[]): UseSortableResponse<T> => {
    const [sortOrders, setSortOrders] = useState<{
        [Property in keyof T]?: number;
    }>({});

    const [sortField, setSortField] = useState<Nullable<keyof T>>(null);
    const [sortOptions, setSortOptions] = useState<Intl.CollatorOptions>({});

    const sortedData = useMemo(() => {
        if (sortField && sortOrders[sortField]) {
            const sortOrder = sortOrders[sortField] as number | undefined;

            if (sortOrder) {
                return [...data].sort((a, b) => {
                    if (a[sortField] === null) return 1;
                    if (b[sortField] === null) return -1;
                    if (a[sortField] === null && b[sortField] === null) return 0;

                    return (
                        String(a[sortField])
                            .toLowerCase()
                            .trim()
                            .localeCompare(
                                String(b[sortField]).toLowerCase().trim(),
                                undefined,
                                sortOptions
                            ) * sortOrder
                    );
                });
            }
            return data;
        }
        return data;
    }, [data, sortField, sortOptions, sortOrders]);

    const handleSorting = useCallback((sortField: keyof T, sortOptions?: Intl.CollatorOptions) => {
        if (sortField) {
            setSortField(sortField);
            setSortOptions(sortOptions || {});
            setSortOrders((sortOrders) => {
                const sortOrder = sortOrders[sortField] as number;

                return {
                    ...sortOrders,
                    [sortField]: sortOrder ? sortOrder * -1 : 1,
                };
            });
        }
    }, []);

    const sortOrder = sortField ? sortOrders[sortField] : null;

    return { sortedData, handleSorting, sortField, sortOrder: sortOrder === 1 ? 'descending' : 'ascending' };
};
