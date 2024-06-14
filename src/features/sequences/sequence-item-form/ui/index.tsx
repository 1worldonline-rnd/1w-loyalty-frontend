import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { useSequenceItemForm } from '../hooks/useSequenceItemForm';
import { Loader } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button, ErrorMessage, Input, Select } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';
import { getRewardedIMUsFx } from '@/entities/feed/model/effects';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';
import { feedModel } from '@/entities/feed';

export const SequenceItemForm = styled(({ className }: PropsWithClassName) => {
    const { form: f, imuOptions, rewardedIMUs } = useSequenceItemForm();
    const partnerId = useStore(userModel.stores.$partnerId);
    const { mode } = useStore(adminPanelModel.stores.$adminModal);
    const isSequenceFeedItemsPending = useStore(feedModel.effects.getRewardedIMUsFx.pending);
    const { t } = useTranslation('common', { keyPrefix: 'sequences' });

    const selectImu = (option: { label: string; value: string }) => {
        f.setFieldValue('imuType', option.value);

        if (partnerId) {
            getRewardedIMUsFx({ partnerId: partnerId, imuType: option.value.toUpperCase() });
        }
    };

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <div className="field field--select">
                <label>
                    <span>{t('step-name')}</span>

                    <Input
                        hasError={Boolean(f.touched.name && f.errors.name)}
                        size="lg"
                        {...f.getFieldProps('name')}
                        onChange={(newValue: string) => f.setFieldValue('name', newValue)}
                    />
                </label>

                {f.touched.name && f.errors.name && <ErrorMessage>{f.errors.name}</ErrorMessage>}
            </div>

            <div className="field field--required">
                <label>
                    <span>{t('article-url')}</span>

                    <Input
                        hasError={Boolean(f.touched.url && f.errors.url)}
                        size="lg"
                        {...f.getFieldProps('url')}
                        onChange={(newValue: string) => f.setFieldValue('url', newValue)}
                    />
                </label>

                {f.touched.url && f.errors.url && <ErrorMessage>{f.errors.url}</ErrorMessage>}
            </div>

            <div className="field ">
                <label>
                    <span>{t('read-reward')}</span>

                    <Input
                        size="lg"
                        {...f.getFieldProps('incentive.points')}
                        onChange={(newValue: string) => f.setFieldValue('incentive.points', newValue)}
                    />
                </label>
                {f.touched?.incentive?.points && f.errors?.incentive?.points &&
                    <ErrorMessage>{f.errors?.incentive?.points}</ErrorMessage>
                }
            </div>

            <div className="field field--select">
                <label>
                    <span>{t('reading-time')}</span>

                    <Input
                        size="lg"
                        {...f.getFieldProps('incentive.timeToReward')}
                        onChange={(newValue: string) => f.setFieldValue('incentive.timeToReward', newValue)}
                    />
                </label>

                {f.touched?.incentive?.timeToReward && f.errors?.incentive?.timeToReward &&
                    <ErrorMessage>{f.errors?.incentive?.timeToReward}</ErrorMessage>
                }
            </div>

            <div className="field field--select field--required">
                <label>
                    <span>{t('select-imu')}</span>

                    <Select
                        options={imuOptions}
                        onChange={(option) => {
                            if (option) selectImu(option);
                        }}
                        value={imuOptions.find((imu) => imu.value === f.values.imuType)}
                    />
                </label>
            </div>

            <div className="field field--select field--required loader-container">
                {isSequenceFeedItemsPending ? <div className='loader-field'><Loader width={16} /></div> : null}
                <label>
                    <span>{t('custom-rewarded-widget')}</span>

                    <Select
                        isDisabled={!f.values.imuType || isSequenceFeedItemsPending}
                        options={rewardedIMUs}
                        onChange={(option) => {
                            if (option) f.setFieldValue('imuId', option.value);
                        }}
                        value={rewardedIMUs.find((imu) => imu.value === f.values.imuId)}
                    />
                </label>
            </div>

            <FlexboxGrid className="buttons" align="middle" justify="end">
                <Button
                    size="sm"
                    appearance="subtle"
                    type="button"
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: false,
                        });
                    }}
                >
                    {t('cancel')}
                </Button>

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? <Loader width={16} /> : mode === 'update' ? t('edit') : t('create')}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 12px;

    .field--select,
    .buttons {
        grid-column: 1 / 3;
    }

    .field,
    .field label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .field label span {
        font-weight: 600;
        color: var(--text-dark-color);
    }

    .buttons {
        gap: 8px;
    }

    .field--required label span::after {
        content: ' *';
        color: rgb(var(--error-color));
    }

    .loader-container{
        position: relative;
        .loader-field {
            background: #fff;
            opacity: 0.9;
            position: absolute;
            z-index: 10;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
        }
    }
`;
