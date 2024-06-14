import styled from 'styled-components';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import {
    PreferencesDailyIcon,
    // PreferencesDailyIcon,
    // PreferencesEarnIcon,
    PreferencesOtherIcon,
    PreferencesProfileIcon,
    PreferencesWidgetIcon,
} from '@/shared/ui/icons';
import { usePreferencesForm } from '../hooks/usePreferencesForm';
import { Button, Checkbox, Input, Select } from '@/shared/rsuite/admin-panel';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { userModel } from '@/entities/user';
import { FlexboxGrid } from 'rsuite';
import { Loader } from '@/shared/ui';
import { incentivesModel } from '@/entities/preference-incentives';

export enum PreferencePeriod {
    once = 'once',
    day = 'day',
}

const selectOptionPerDay = {
    value: PreferencePeriod.day,
    label: 'Per Day',
};

const selectOptionOnce = {
    value: PreferencePeriod.once,
    label: 'Once',
};

const selectOptions = [selectOptionPerDay, selectOptionOnce];

export const PreferencesForm = styled(({ className }: PropsWithClassName) => {
    const partnerId = useStore(userModel.stores.$partnerId);
    const { form: f, handleSharingCheckboxChange } = usePreferencesForm();
    const { t } = useTranslation('common', { keyPrefix: 'preferences' });

    useEffect(() => {
        if (!partnerId) return;
        incentivesModel.effects.getPreferenceIncentivesFx(partnerId);
    }, []);

    const tableHead = <div className="TH">
        <div className="row-item">{t('event')}</div>
        <div className="row-item">{t('required-event')}</div>
        <div className="row-item">{t('limit-count')}</div>
        <div className="row-item">{t('reward-points')}</div>
    </div>;

    const disabledInput = <Input
        className="input"
        size="sm"
        disabled={true}
        value=''
        style={{
            width: '75px',
        }}
    />;

    return (
        <form className={className} onSubmit={f.handleSubmit}>
            <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                <h2 className="title">{t('partner-loyalty-preferences')}</h2>

                <Button size="md" appearance="primary" type="submit" disabled={f.isSubmitting}>
                    {f.isSubmitting ? <Loader width={20} /> : t('save-preferences')}
                </Button>
            </FlexboxGrid>

            <div className="divider"></div>

            <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                <h3 className="title"> {t('default-events-rewards')}</h3>
            </FlexboxGrid>
            <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                <p>{t('all-rewards-are-set')}</p>
            </FlexboxGrid>

            <div className="preference-item">
                    <div className="reward-title">
                        <PreferencesDailyIcon />
                        <span>{t('daily-login')}</span>
                    </div>
                    <div className="table-container daily-login">
                        <span className="daily-login-row-title">{t('reward-points')}</span>
                        <div className="daily-login-rewards">
                            { f.values.progressiveDailyPoints.map((item, index) => {
                                    return (
                                        <label className="daily-login-row" key={index}>
                                            <span className="reward-title">{item.name}</span>
                                            <Input
                                                size="lg"
                                                {...f.getFieldProps(`progressiveDailyPoints.${index}.points`)}
                                                onChange={(newValue) => {
                                                    f.setFieldValue(`progressiveDailyPoints.${index}.points`, newValue);
                                                }}
                                                hasError={Boolean(
                                                    f.touched.progressiveDailyPoints?.[index]?.points && f.errors.progressiveDailyPoints?.[index]
                                                )}
                                            />
                                        </label>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>

            <div className="preference-item">
                <div className="reward-title">
                    <PreferencesWidgetIcon />
                    <span>{t('poller-widget')}</span>
                </div>
                <div className="table-container">
                    <div className="table">
                        {tableHead}
                        <div className="TB">
                            <div className="TR">
                                {f.values.poller.map((item, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="row-item title">{item.name}</div>
                                            <div className="row-item">
                                                <Checkbox
                                                    size="S"
                                                    checked={item.isRequired}
                                                    onChange={() => {
                                                        f.setFieldValue(
                                                            `poller.${index}.isRequired`,
                                                            !item.isRequired
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="row-item inputs">
                                                {f.values.poller[index].userLimits.daily === -1 ? disabledInput :
                                                    <Input
                                                        className="input"
                                                        size="sm"
                                                        disabled={f.values.poller[index].userLimits.daily === -1}
                                                        style={{
                                                            width: '75px',
                                                        }}
                                                        {...f.getFieldProps(`poller.${index}.userLimits.daily`)}
                                                        onChange={(newValue) => {
                                                            f.setFieldValue(
                                                                `poller.${index}.userLimits.daily`,
                                                                newValue
                                                            );
                                                        }}
                                                        hasError={Boolean(
                                                            f.touched.poller?.[index]?.userLimits?.daily &&
                                                            // @ts-ignore
                                                            f.errors.poller?.[index]?.userLimits?.daily
                                                        )}
                                                    />}
                                                <Select
                                                    className="select"
                                                    size="sm"
                                                    options={selectOptions}
                                                    value={
                                                        f.values.poller[index].userLimits.daily === -1
                                                            ? selectOptionOnce
                                                            : selectOptionPerDay
                                                    }
                                                    isDisabled={!f.values.poller[index].isUserLimitsEditable}
                                                    onChange={(option) => {
                                                        if (option) {
                                                            f.setFieldValue(
                                                                `poller.${index}.userLimits.daily`,
                                                                option.value === PreferencePeriod.once
                                                                    ? -1
                                                                    : ''
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="row-item">
                                                <Input
                                                    className="input"
                                                    style={{
                                                        width: '75px',
                                                    }}
                                                    size="sm"
                                                    {...f.getFieldProps(`poller.${index}.points`)}
                                                    onChange={(newValue) => {
                                                        f.setFieldValue(`poller.${index}.points`, newValue);
                                                    }}
                                                    hasError={Boolean(
                                                        f.touched.poller?.[index]?.points &&
                                                        // @ts-ignore
                                                        f.errors.poller?.[index]?.points
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="preference-item">
                <div className="reward-title">
                    <PreferencesWidgetIcon />
                    <span>{t('quiz-widget')}</span>
                </div>
                <div className="table-container">
                    <div className="table">
                        {tableHead}
                        <div className="TB">
                            <div className="TR">
                                {f.values.quiz.map((item, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="row-item title">{item.name}</div>
                                            <div className="row-item">
                                                <Checkbox
                                                    size="S"
                                                    checked={item.isRequired}
                                                    onChange={() => {
                                                        f.setFieldValue(
                                                            `quiz.${index}.isRequired`,
                                                            !item.isRequired
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="row-item inputs">
                                                {f.values.quiz[index].userLimits.daily === -1 ? disabledInput : <Input
                                                    className="input"
                                                    size="sm"
                                                    disabled={f.values.quiz[index].userLimits.daily === -1}
                                                    style={{
                                                        width: '75px',
                                                    }}
                                                    {...f.getFieldProps(`quiz.${index}.userLimits.daily`)}
                                                    onChange={(newValue) => {
                                                        f.setFieldValue(
                                                            `quiz.${index}.userLimits.daily`,
                                                            newValue
                                                        );
                                                    }}
                                                    hasError={Boolean(
                                                        f.touched.quiz?.[index]?.userLimits?.daily &&
                                                        // @ts-ignore
                                                        f.errors.quiz?.[index]?.userLimits?.daily
                                                    )}
                                                />}
                                                <Select
                                                    className="select"
                                                    size="sm"
                                                    options={selectOptions}
                                                    value={
                                                        f.values.quiz[index].userLimits.daily === -1
                                                            ? selectOptionOnce
                                                            : selectOptionPerDay
                                                    }
                                                    isDisabled={!f.values.quiz[index].isUserLimitsEditable}
                                                    onChange={(option) => {
                                                        if (option) {
                                                            f.setFieldValue(
                                                                `quiz.${index}.userLimits.daily`,
                                                                option.value === PreferencePeriod.once
                                                                    ? -1
                                                                    : ''
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="row-item">
                                                <Input
                                                    className="input"
                                                    style={{
                                                        width: '75px',
                                                    }}
                                                    size="sm"
                                                    {...f.getFieldProps(`quiz.${index}.points`)}
                                                    onChange={(newValue) => {
                                                        f.setFieldValue(`quiz.${index}.points`, newValue);
                                                    }}
                                                    hasError={Boolean(
                                                        f.touched.quiz?.[index]?.points &&
                                                        // @ts-ignore
                                                        f.errors.quiz?.[index]?.points
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="preference-item">
                <div className="reward-title">
                    <PreferencesWidgetIcon />
                    <span>{t('survey-widget')}</span>
                </div>
                <div className="table-container">
                    <div className="table">
                        {tableHead}
                        <div className="TB">
                            <div className="TR">
                                {f.values.survey.map((item, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="row-item title">{item.name}</div>
                                            <div className="row-item">
                                                <Checkbox
                                                    size="S"
                                                    checked={item.isRequired}
                                                    onChange={() => {
                                                        f.setFieldValue(
                                                            `survey.${index}.isRequired`,
                                                            !item.isRequired
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="row-item inputs">
                                                {f.values.survey[index].userLimits.daily === -1 ? disabledInput :
                                                    <Input
                                                        className="input"
                                                        size="sm"
                                                        disabled={f.values.survey[index].userLimits.daily === -1}
                                                        style={{
                                                            width: '75px',
                                                        }}
                                                        {...f.getFieldProps(`survey.${index}.userLimits.daily`)}
                                                        onChange={(newValue) => {
                                                            f.setFieldValue(
                                                                `survey.${index}.userLimits.daily`,
                                                                newValue
                                                            );
                                                        }}
                                                        hasError={Boolean(
                                                            f.touched.survey?.[index]?.userLimits?.daily &&
                                                            // @ts-ignore
                                                            f.errors.survey?.[index]?.userLimits?.daily
                                                        )}
                                                    />}
                                                <Select
                                                    className="select"
                                                    size="sm"
                                                    options={selectOptions}
                                                    value={
                                                        f.values.survey[index].userLimits.daily === -1
                                                            ? selectOptionOnce
                                                            : selectOptionPerDay
                                                    }
                                                    isDisabled={!f.values.survey[index].isUserLimitsEditable}
                                                    onChange={(option) => {
                                                        if (option) {
                                                            f.setFieldValue(
                                                                `survey.${index}.userLimits.daily`,
                                                                option.value === PreferencePeriod.once
                                                                    ? -1
                                                                    : ''
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="row-item">
                                                <Input
                                                    className="input"
                                                    style={{
                                                        width: '75px',
                                                    }}
                                                    size="sm"
                                                    {...f.getFieldProps(`survey.${index}.points`)}
                                                    onChange={(newValue) => {
                                                        f.setFieldValue(`survey.${index}.points`, newValue);
                                                    }}
                                                    hasError={Boolean(
                                                        f.touched.survey?.[index]?.points &&
                                                        // @ts-ignore
                                                        f.errors.survey?.[index]?.points
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="preference-item">
                <div className="reward-title">
                    <PreferencesProfileIcon />
                    <span>{t('profile-events')}</span>
                </div>
                <div className="table-container">
                    <div className="table">
                        <div className="TH">
                            <div className="row-item">{t('event')}</div>
                            <div className="row-item"></div>
                            <div className="row-item">{t('limit-count')}</div>
                            <div className="row-item">{t('reward-points')}</div>
                        </div>
                        <div className="TB">
                            <div className="TR">
                                {f.values.profileEvents.map((item, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="row-item title">{item.name}</div>
                                            <div className="row-item"></div>
                                            <div className="row-item inputs">
                                                {f.values.profileEvents[index].userLimits.daily === -1 ? disabledInput :
                                                    <Input
                                                        className="input"
                                                        size="sm"
                                                        disabled={
                                                            f.values.profileEvents[index].userLimits.daily === -1
                                                        }
                                                        style={{
                                                            width: '75px',
                                                        }}
                                                        {...f.getFieldProps(
                                                            `profileEvents.${index}.userLimits.daily`
                                                        )}
                                                        onChange={(newValue) => {
                                                            f.setFieldValue(
                                                                `profileEvents.${index}.userLimits.daily`,
                                                                newValue
                                                            );
                                                        }}
                                                        hasError={Boolean(
                                                            f.touched.profileEvents?.[index]?.userLimits?.daily &&
                                                            // @ts-ignore
                                                            f.errors.profileEvents?.[index]?.userLimits?.daily
                                                        )}
                                                    />}
                                                <Select
                                                    className="select"
                                                    size="sm"
                                                    options={selectOptions}
                                                    value={
                                                        f.values.profileEvents[index].userLimits.daily === -1
                                                            ? selectOptionOnce
                                                            : selectOptionPerDay
                                                    }
                                                    isDisabled={
                                                        !f.values.profileEvents[index].isUserLimitsEditable
                                                    }
                                                    onChange={(option) => {
                                                        if (option) {
                                                            f.setFieldValue(
                                                                `profileEvents.${index}.userLimits.daily`,
                                                                option.value === PreferencePeriod.once
                                                                    ? -1
                                                                    : ''
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="row-item">
                                                <Input
                                                    className="input"
                                                    style={{
                                                        width: '75px',
                                                    }}
                                                    size="sm"
                                                    {...f.getFieldProps(`profileEvents.${index}.points`)}
                                                    onChange={(newValue) => {
                                                        f.setFieldValue(
                                                            `profileEvents.${index}.points`,
                                                            newValue
                                                        );
                                                    }}
                                                    hasError={Boolean(
                                                        f.touched.profileEvents?.[index]?.points &&
                                                        // @ts-ignore
                                                        f.errors.profileEvents?.[index]?.points
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="preference-item">
                <div className="reward-title">
                    <PreferencesOtherIcon />
                    <span>{t('other')}</span>
                </div>
                <div className="table-container">
                    <div className="table">
                        {tableHead}
                        <div className="TB">
                            <div className="TR">
                                {f.values.other.map((item, index, { length }) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="row-item title">{item.name}</div>
                                            <div className="row-item">
                                                {item.name.includes('Sharing') && (
                                                    <Checkbox
                                                        size="S"
                                                        checked={item.isRequired}
                                                        onChange={() => {
                                                            handleSharingCheckboxChange(!item.isRequired);
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div className="row-item inputs">
                                                {f.values.other[index].userLimits.daily === -1 ? disabledInput :
                                                    <Input
                                                        className="input"
                                                        size="sm"
                                                        disabled={f.values.other[index].userLimits.daily === -1}
                                                        style={{
                                                            width: '75px',
                                                        }}
                                                        {...f.getFieldProps(`other.${index}.userLimits.daily`)}
                                                        onChange={(newValue) => {
                                                            f.setFieldValue(
                                                                `other.${index}.userLimits.daily`,
                                                                newValue
                                                            );
                                                        }}
                                                        hasError={Boolean(
                                                            f.touched.other?.[index]?.userLimits?.daily &&
                                                            // @ts-ignore
                                                            f.errors.other?.[index]?.userLimits?.daily
                                                        )}
                                                    />}
                                                <Select
                                                    className="select"
                                                    size="sm"
                                                    options={selectOptions}
                                                    value={
                                                        f.values.other[index].userLimits.daily === -1
                                                            ? selectOptionOnce
                                                            : selectOptionPerDay
                                                    }
                                                    isDisabled={!f.values.other[index].isUserLimitsEditable}
                                                    onChange={(option) => {
                                                        if (option) {
                                                            f.setFieldValue(
                                                                `other.${index}.userLimits.daily`,
                                                                option.value === PreferencePeriod.once
                                                                    ? -1
                                                                    : ''
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="row-item">
                                                <Input
                                                    className="input"
                                                    style={{
                                                        width: '75px',
                                                    }}
                                                    size="sm"
                                                    {...f.getFieldProps(`other.${index}.points`)}
                                                    onChange={(newValue) => {
                                                        f.setFieldValue(`other.${index}.points`, newValue);
                                                    }}
                                                    hasError={Boolean(
                                                        f.touched.other?.[index]?.points &&
                                                        // @ts-ignore
                                                        f.errors.other?.[index]?.points
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
})`
    ${styles}
`;
