import { useStore } from 'effector-react';
import { SideNavigation } from './side-navigation';
import { EntityManagerModal } from './entity-manager-modal';
import { userModel } from '@/entities/user';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { Header } from './header';
import styles from './styles.module.scss';
import { PropsWithChildren } from 'react';

export const AdminPanel = ({ children }: PropsWithChildren<{}>) => {
    const isAdminPanelAvailable = useStore(userModel.stores.$isAdminPanelAvailable);

    useProtectedRoute({
        byAdminRights: true,
    });

    if (!isAdminPanelAvailable) {
        return null;
    }
    return (
        <div className={styles['admin-panel']}>
            <EntityManagerModal />

            <Header />

            <div className={styles['admin-panel__main']}>
                <SideNavigation />

                <div className={styles['admin-page']}>{children}</div>
            </div>
        </div>
    );
};
