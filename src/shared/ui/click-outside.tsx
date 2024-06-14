import { FC, useEffect, useRef } from 'react';
import { PropsWithClassName } from '@/shared/utility-types';

type ClickOutsidePropsTypes = PropsWithClassName & {
    onClickOutside: () => void;
};

export const ClickOutside: FC<ClickOutsidePropsTypes> = ({
    onClickOutside,
    className,
    children,
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref && ref.current) {
                if (!ref.current.contains(event.target as HTMLDivElement)) {
                    onClickOutside();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClickOutside]);

    return (
        <div className={className} ref={ref} {...props}>
            {children}
        </div>
    );
};
