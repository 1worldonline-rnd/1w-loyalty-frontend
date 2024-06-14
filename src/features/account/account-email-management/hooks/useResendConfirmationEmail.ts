import { useState } from 'react';
import { accountApi } from '@/shared/api';

export const useResendConfirmationEmail = (email: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [resentSuccessfully, setResentSuccessfully] = useState(false);

    const resendConfirmationEmail = async () => {
        if (email) {
            setIsLoading(true);

            try {
                const { status } = await accountApi.fetchResendConfirmationEmail(email);

                if (status === 200) {
                    setResentSuccessfully(true);
                }
            } catch (e) {
                // eslint-disable-next-line no-alert
                alert(e);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        isLoading,
        resentSuccessfully,
        resendConfirmationEmail,
    };
};
