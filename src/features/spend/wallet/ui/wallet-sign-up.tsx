/* eslint-disable @next/next/no-img-element */
import { useTranslation } from 'next-i18next';
import { LogotypeWithoutText } from '@/shared/ui/logotype-without-text';
import { TokenIcon } from '@/shared/ui/icons';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { Button } from '@/shared/rsuite/loyalty-platform';

export const WalletSignUp = () => {
    const { push } = useCustomRouter();

    const redirectToSignUp = () => {
        push({
            pathname: Route.signUp,
        });
    };

    const { t } = useTranslation('common', {
        keyPrefix: 'account-settings-page.wallet',
    });

    return (
        <div className="wallet-sign-up">
            <div className="icons">
                <div className="icon icon--token">
                    <TokenIcon />
                </div>
                <div className="icon icon--logotype">
                    <LogotypeWithoutText />
                </div>
                <div className="icon icon--emoji">
                    <img
                        src="/loyalty/images/emoji-party-popper.webp"
                        alt="Emoji party popper"
                        width="32px"
                        height="32px"
                    />
                </div>
            </div>

            <p>{t('sign-up-tittle')}</p>

            <Button size="lg" onClick={redirectToSignUp}>
                {t('not-available-yet')}
            </Button>
        </div>
    );
};
