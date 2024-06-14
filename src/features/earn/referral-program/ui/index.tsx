import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { $referralProgram } from '../model';
import { If, TextWithEllipsis } from '@/shared/ui';
import { styles } from './styles';
import { useTranslation } from 'next-i18next';
import { FlexboxGrid } from 'rsuite';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { CopyIcon } from './icons';
import { Tooltip } from '@/shared/ui';

export const ReferralProgram = styled(({ className }: PropsWithClassName) => {
    const { t } = useTranslation('features.earn.referral-program');

    const referralProgram = useStore($referralProgram);

    const copyReferralLinkUrl = () => {
        if (referralProgram) {
            navigator.clipboard.writeText(referralProgram.url);
        }
    };

    return (
        <If condition={referralProgram}>
            <div className={className}>
                <h2 className="title">{t('title')}</h2>

                <div className="body">
                    <p className="description">{t('description')}</p>

                    <FlexboxGrid className="referral-link-wrapper">
                        <div className="referral-link">
                            <p className="referral-link__label">{t('referral-link-label')}</p>

                            <FlexboxGrid style={{ flexWrap: 'nowrap' }}>
                                <Tooltip content={t('message-success-copied')}>
                                    <Button onClick={copyReferralLinkUrl} className="icon-button-copy-link">
                                        <CopyIcon />
                                    </Button>
                                </Tooltip>

                                <TextWithEllipsis className="referral-link__value">
                                    {referralProgram?.url}
                                </TextWithEllipsis>
                            </FlexboxGrid>
                        </div>

                        <Tooltip content={t('message-success-copied')}>
                            <Button
                                onClick={copyReferralLinkUrl}
                                className="button-copy-link"
                                appearance="primary"
                            >
                                <CopyIcon />
                                {t('button-copy-link')}
                            </Button>
                        </Tooltip>
                    </FlexboxGrid>

                    <div className="users-counter">
                        <span>{referralProgram?.registeredUsersCount}</span>
                        <span>{t('users-counter-label')}</span>
                    </div>
                </div>
            </div>
        </If>
    );
})`
    ${styles}
`;
