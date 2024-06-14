import type { PropsWithChildren, ReactNode } from 'react';

type IfProps = PropsWithChildren<{
    condition: unknown;
    else?: ReactNode;
}>;

export const If = (props: IfProps) => {
    const { condition, children } = props;

    return condition ? <>{children}</> : null;
};
