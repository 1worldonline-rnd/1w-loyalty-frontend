import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import { useStore } from 'effector-react';
import type { PropsWithClassName } from '@/shared/utility-types';
import { styles } from './styles';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { ApprovingPassword } from '@/shared/ui/approving-password';
import { $accountDataArchive, deleteReportFx, getActiveReportFx, $isFetchingReport } from '../model';
import { useTranslation } from 'next-i18next';

const getReadableDate = (date: string) => {
    new Intl.DateTimeFormat('ru').format(new Date(date));
};

export const GettingCopyAccountData = styled((props: PropsWithClassName) => {
    const { className } = props;
    const [isRequestedArchive, setIsRequestedArchive] = useState(false);
    const accountDataArchive = useStore($accountDataArchive);
    const isFetchingReport = useStore($isFetchingReport);
    const { t } = useTranslation('common', {
        keyPrefix: 'account-settings-page.obtain-a-copy-of-data',
    });

    const downloadArchive = () => {
        if (typeof window !== 'undefined' && accountDataArchive) {
            const win = window.open(accountDataArchive.reportUrl, '_blank');

            const timer = setInterval(() => {
                if (win?.closed) {
                    clearInterval(timer);
                    deleteReportFx(accountDataArchive.id);
                }
            }, 100);
        }
    };

    return (
        <section className={className}>
            <h2 className="account-page__section-title">{t('obtain-a-copy-of-data')}</h2>

            <form className="account-page__section-content">
                {accountDataArchive === null &&
                    (isRequestedArchive ? (
                        <ApprovingPassword
                            label={t('enter-password')}
                            onApply={(password) => {
                                if (password) {
                                    getActiveReportFx(password)
                                        .then(() => {
                                            setIsRequestedArchive(false);
                                        })
                                        .catch((error) => {
                                            if (axios.isAxiosError(error) && error.response?.status === 404) {
                                                setIsRequestedArchive(false);
                                            }
                                        });
                                }
                            }}
                            onCancel={() => setIsRequestedArchive(false)}
                            isLoading={isFetchingReport}
                        />
                    ) : (
                        <Button
                            className="btn-request-archive"
                            size="md"
                            appearance="black"
                            type="button"
                            onClick={() => setIsRequestedArchive(true)}
                        >
                            {t('request-archive')}
                        </Button>
                    ))}

                {accountDataArchive?.status === 'notAccepted' && (
                    <strong style={{ fontSize: 16, fontWeight: 700, lineHeight: '20px' }}>
                        {/* {t('Request archive')} */}
                        An archive with your data is being formed, when it&apos;s ready, we will notify you by
                        email.
                    </strong>
                )}

                {accountDataArchive?.status === 'completed' && (
                    <div className="account-data__completed-archive">
                        <p>
                            <strong>
                                Your archive for {getReadableDate(accountDataArchive.created)} is ready.
                            </strong>
                            <br />
                            Remember, there is a one-time request to download personal data. After the click
                            the file will be downloaded to your deivice. You can repeat this flow again later.
                        </p>

                        <Button
                            size="md"
                            appearance="black"
                            className="btn-download-archive"
                            onClick={downloadArchive}
                        >
                            Download
                        </Button>
                    </div>
                )}

                <figure className="description">
                    <figcaption>{t('personal-data')}</figcaption>
                    <ul>
                        <li>{t('user-account')}</li>
                        <li>{t('user-activity')}</li>
                        <li>{t('user-generated')}</li>
                        <li>{t('user-purchase')}</li>
                    </ul>
                </figure>
            </form>
        </section>
    );
})`
    ${styles}
`;
