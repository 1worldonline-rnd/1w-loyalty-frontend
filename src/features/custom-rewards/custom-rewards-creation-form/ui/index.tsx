import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { Loader, TextBadge } from '@/shared/ui';
import type { PropsWithClassName } from '@/shared/utility-types';
import { Button, Checkbox, ErrorMessage, Input, Select } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';
import { Option, useCustomRewardCreationForm } from '../hooks/useCustomRewardCreationForm';
import { BaseOption } from '@/shared/rsuite/admin-panel/select';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';
import { useEffect } from 'react';
import { getPreferenceIncentivesFx } from '@/entities/preference-incentives/model/effects';
import { LinkIcon } from '@/shared/ui/icons';
import type { ImuIncentiveWithGeneratedUUID } from '../types';
import { customRewardsModel } from '../../model';
import { useTranslation } from 'next-i18next';

export const CustomRewardCreationForm = styled(({ className }: PropsWithClassName) => {
    const partnerId = useStore(userModel.stores.$partnerId);
    const isPartnerImusLoading = useStore(customRewardsModel.effects.getPartnerImusByPartnerIdFx.pending);
    const { t } = useTranslation('common', { keyPrefix: 'modals' });

    useEffect(() => {
        if (!partnerId) return;
        getPreferenceIncentivesFx(partnerId);
    }, []);

    const {
        form: f,
        setSelectedIMUType,
        handleIMUSelection,
        selectedIMU,
        imuTypeOptions,
        imuOptions,
        imuIncentives,
        imuIncentivesSeparated,
        isEditing,
        isImusLoading,
    } = useCustomRewardCreationForm();

    const incentiveNameFormat = (name: string) => {
        if (name === 'Sharing Data on Facebook' || name === 'Share Facebook') {
            return 'Facebook'
        } else if (name === 'Sharing Data on Twitter' || name === 'Share Twitter') {
            return 'Twitter'
        } else {
            return name
        }
    }

    const renderIncentiveInputs = (incentive: ImuIncentiveWithGeneratedUUID, index: number) => {
        // type casting is needed because formik always assumes
        // f.errors is flat object but in our case it is nested
        const incentivesErrors = f.errors.incentives as
            | {
                [key: string]: {
                    points?: string;
                    required?: boolean;
                };
            }
            | undefined;
        const errorPoints = incentivesErrors?.[incentive.generatedUUID]?.points;

        // type casting is needed because formik always assumes
        // f.touched is the same structure as f.values but it actually flat
        // const incentivesTouched = f.touched as {
        //     [key: string]: boolean;
        // };
        // const touchedPoints = incentivesTouched?.[incentive.generatedUUID];

        // only one quiz result can be required
        const isSomeOtherQuizResultRequired = Object.entries(f.values.incentives || {}).some(
            ([name, fields]) => fields.isRequired && fields.actionType === 40 && name !== incentive.generatedUUID
        );

        return (
            <div className="field-wrapper" key={index}>
                <div className="field" key={incentive.actionType}>
                    <label>
                        <span>{incentiveNameFormat(incentive.name)}</span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Input
                                value={f.values.incentives?.[incentive.generatedUUID].points}
                                size="lg"
                                hasError={Boolean(f.touched.incentives && errorPoints)}
                                onChange={(value) => {
                                    f.setFieldValue('incentives.' + incentive.generatedUUID, {
                                        ...f.values.incentives?.[incentive.generatedUUID],
                                        points: value,
                                    });
                                }}
                                onBlur={f.handleBlur}
                                name={incentive.name}
                            />
                            <div className="field field--checkbox">
                                <label>
                                    <span>{t('required')}</span>
                                    <Checkbox
                                        size="S"
                                        checked={Boolean(f.values.incentives?.[incentive.generatedUUID].isRequired)}
                                        onChange={(_, checked) => {
                                            f.setFieldValue('incentives.' + incentive.generatedUUID, {
                                                ...f.values.incentives?.[incentive.generatedUUID],
                                                isRequired: checked,
                                            });
                                        }}
                                        disabled={incentive.actionType === 40 && isSomeOtherQuizResultRequired}
                                    />
                                </label>
                            </div>
                        </div>

                    </label>

                    {errorPoints && <ErrorMessage>{errorPoints}</ErrorMessage>}
                </div>

            </div>
        );
    };

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            {isPartnerImusLoading &&
                <div className='loader'>
                    <Loader />
                </div>
            }

            <div className="field field--select field--required">
                <label>
                    <span>Select IMU type</span>

                    <Select
                        size="md"
                        options={imuTypeOptions}
                        onChange={(option) => {
                            if (option) {
                                setSelectedIMUType(option.value);

                                const newInitialValues = {
                                    imuData: {
                                        imuType: option,
                                        imu: null,
                                    },
                                    incentives: null,
                                };

                                f.resetForm({ values: newInitialValues });
                            }
                        }}
                        value={f.values.imuData.imuType}
                        isDisabled={isEditing}
                    />
                </label>

                {f.touched.imuData?.imuType && f.errors.imuData?.imuType && (
                    <ErrorMessage>{f.errors.imuData.imuType}</ErrorMessage>
                )}
            </div>

            <div className="imu-select-wrapper">
                <div className="field field--required field--select">
                    <label>
                        <span>Select IMU</span>

                        <Select<BaseOption>
                            size="md"
                            options={imuOptions.map((imuOption) => ({
                                ...imuOption,
                                icon: <TextBadge>{f.values.imuData.imuType?.label.slice(0, 1)}</TextBadge>,
                            }))}
                            onChange={(option) => {
                                if (option) {
                                    handleIMUSelection(option as Option);
                                }
                            }}
                            value={f.values.imuData.imu}
                            isDisabled={!f.values.imuData.imuType || isEditing}
                            loadingMessage={() => 'Loading...'}
                            noOptionsMessage={() => (isImusLoading ? 'Loading...' : 'No IMUs found')}
                        />
                    </label>

                    {f.touched.imuData?.imu && f.errors.imuData?.imu && (
                        <ErrorMessage>{f.errors.imuData?.imu}</ErrorMessage>
                    )}
                </div>
                {selectedIMU && (
                    <Button
                        as="a"
                        className="imu-link-btn"
                        href={`${process.env.NEXT_PUBLIC_PORTAL_URL}#!/admin/partners/quiz-manager/configuration/${selectedIMU.id}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <LinkIcon />
                    </Button>
                )}
            </div>

            {imuIncentivesSeparated.quiz.length ?
                <div className="reward-prices">
                    <h4>Quiz result</h4>
                    {imuIncentivesSeparated.quiz ? (
                        imuIncentivesSeparated?.quiz.map(renderIncentiveInputs)
                    ) : (
                        <p>Select IMU to set custom reward prices</p>
                    )}
                </div>
                : null}

            {imuIncentivesSeparated.sharing.length ?
                <div className="reward-prices">
                    <h4>Sharing</h4>
                    {imuIncentivesSeparated.sharing ? (
                        imuIncentivesSeparated?.sharing.map(renderIncentiveInputs)
                    ) : (
                        <p>Select IMU to set custom reward prices</p>
                    )}
                </div>
                : null}

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
                    Cancel
                </Button>

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? <Loader width={16} /> : isEditing ? 'Update' : 'Create'}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 12px;
    position: relative;

    .loader {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 10;
        align-items: center;
        justify-content: center;
        background-color: #fafafa;
        opacity: 0.6;
    }

    .field--select,
    .imu-select-wrapper,
    .buttons,
    .reward-prices {
        grid-column: 1 / 3;
    }

    .field-wrapper {
        display: flex;
        flex-direction: column;
        gap: 7px;
    }

    .imu-select-wrapper {
        display: flex;
        align-items: center;
        gap: 6px;

        & .field--select {
            flex: 1;
        }
    }

    .field,
    .field label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .field--checkbox label {
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
        gap: 0;
    }

    .field label span {
        font-weight: 600;
        color: var(--text-dark-color);
    }

    .field--required label span::after {
        content: ' *';
        color: rgb(var(--error-color));
    }

    .reward-prices {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

        padding-block-start: 18px;
        border-block-start: 1px solid var(--grey-5-color);

        color: var(--grey-0-color);

        h4{
            width: 100%;
            color: var(--text-light-color);
            font-size: 16px;
            font-weight: 600;
            line-height: normal;
        }

        & > .field-wrapper {
            flex: 1 0 217px;
        }
    }

    .imu-link-btn {
        display: flex;
        padding: 11px 12px;
        align-items: center;
        border-radius: 5px;
        background-color: var(--grey-7-color);
        color: var(--text-dark-color);
        align-self: flex-end;
    }

    .buttons {
        gap: 8px;
    }
`;
