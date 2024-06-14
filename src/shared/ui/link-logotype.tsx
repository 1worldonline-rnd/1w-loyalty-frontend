import Link from 'next/link';
import { Logotype } from './logotype';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '../hooks';

export const LinkLogotype = () => {
    const { urlSearchParams } = useCustomRouter();
    return (
        <Link href={{ pathname: Route.home, query: urlSearchParams }}>
            <a style={{ display: 'flex' }}>
                <Logotype />
            </a>
        </Link>
    );
};
