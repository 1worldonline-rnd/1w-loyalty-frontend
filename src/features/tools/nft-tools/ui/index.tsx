import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { styles } from './styles';
import { NftCollectionIcon, NftWidgetIcon } from '@/shared/ui/icons';
import { Route } from '@/shared/constants';
import { AdminModal } from '@/entities/admin-panel/model/types';
import Link from 'next/link';
import classNames from 'classnames';
import { useCustomRouter } from '@/shared/hooks';
import { FlexboxGrid } from 'rsuite';
import { openCreationModal } from '@/widgets/admin-panel/ui/side-navigation';
import { useTranslation } from 'next-i18next';
import { PlusIcon } from '@/widgets/admin-panel/ui/icons';

type SideNavigationLink = {
    Icon: () => JSX.Element;
    key: string;
    href: string;
    hasCreationButton?: boolean;
    withWhichEntityModalOpens?: AdminModal['entity'];
};

const links: SideNavigationLink[] = [
    {
        Icon: NftCollectionIcon,
        key: 'nft-collections',
        href: Route.admin.nftCollections,
        withWhichEntityModalOpens: 'nft-collection',
    },
    {
        Icon: NftWidgetIcon,
        key: 'nft-widgets',
        href: Route.admin.nftWidgets,
        withWhichEntityModalOpens: 'nft-widget',
    },
];

export const NftTools = styled(({ className }: PropsWithClassName) => {
    const { urlSearchParams, pathname } = useCustomRouter();
    const { t: navT } = useTranslation('common', { keyPrefix: 'sideNavigation' });
    const { t } = useTranslation('common', { keyPrefix: 'tools' });

    return (
        <div className={className}>
            <FlexboxGrid className="header" align="middle" justify="start" as="header">
                <h2 className="title">{t('partner-loyalty-tools')}</h2>
            </FlexboxGrid>
            <div className="divider" />
            <FlexboxGrid className="header" align="middle" justify="start" as="header">
                <h3 className="title">Crypto</h3>
            </FlexboxGrid>
            <ul className="navigation">
                {links.map((link, index) => {
                    const { Icon, href, key, hasCreationButton = true, withWhichEntityModalOpens } = link;

                    return (
                        <li
                            key={index}
                            className="navigation__item"
                            data-active={Boolean(pathname.includes(href))}
                        >
                            <Link href={{ pathname: href, query: urlSearchParams }}>
                                <a
                                    className={classNames('navigation__link', {
                                        'navigation__link--active': Boolean(pathname.includes(href)),
                                    })}
                                >
                                    <div>
                                        <Icon />
                                    </div>
                                    {navT(key)}
                                </a>
                            </Link>

                            {hasCreationButton && withWhichEntityModalOpens && (
                                <FlexboxGrid
                                    className="navigation__btn-create-entity"
                                    as="button"
                                    align="middle"
                                    justify="center"
                                    onClick={() => openCreationModal(withWhichEntityModalOpens)}
                                >
                                    <PlusIcon />
                                </FlexboxGrid>
                            )}
                        </li>
                    );
                })}
            </ul>
            <div className="divider" />
        </div>
    );
})`
    ${styles}
`;
