import styled from 'styled-components';
import { useStore } from 'effector-react';
import { styles } from './styles';
import { userModel } from '@/entities/user';
import { WalletAuthorized } from './wallet-authorized';
import { WalletSignUp } from './wallet-sign-up';
import { PropsWithClassName } from '@/shared/utility-types';

export const Wallet = styled(({ className }: PropsWithClassName) => {
    const isAuthorized = useStore(userModel.stores.$isAuthorized);
    const Component = isAuthorized ? WalletAuthorized : WalletSignUp;

    if (isAuthorized === null) {
        return null;
    }
    return (
        <div className={className}>
            <Component />
        </div>
    );
})`
    ${styles}
`;
