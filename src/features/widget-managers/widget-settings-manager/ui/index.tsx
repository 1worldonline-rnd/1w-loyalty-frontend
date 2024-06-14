import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { useWidgetSettingsManagerForm } from '../hooks/useWidgetSettingsManagerForm';
import { ErrorMessage, Loader } from '@/shared/ui';
import { Button, Select, Input, Radio } from '@/shared/rsuite/admin-panel';
import { AngularIcon, CircleIcon, EmptyCircleIcon, MoonIcon, OctagonIcon, SunIcon } from '@/shared/ui/icons';
import { widgetConfigModel } from '@/entities/widget-config';
import * as htmlToImage from 'html-to-image';
import classNames from 'classnames';
import { ColorFieldsInput } from '@/shared/ui/color-fields-input';

export const WidgetSettingsManager = styled(({ className }: PropsWithClassName) => {
    const { form: f, areValuesChanged, webfontOptions } = useWidgetSettingsManagerForm();
    const presetButtonsColors = ['#FE5D26', '#02B18E', '#456EF7', '#FE4948'];
    const [previewKey, setPreviewKey] = useState(uuidv4());
    const widgetId = useStore(widgetConfigModel.stores.$activeWidgetConfigId);
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);

    const { settings: settingsErrors, tracker: trackerErrors } = f.errors;
    const { settings: settingsTouched, tracker: trackerTouched } = f.touched;

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.editing' });

    const readySvg = useRef<HTMLDivElement>(null);
    const readySvgDark = useRef<HTMLDivElement>(null);
    const readySvgLight = useRef<HTMLDivElement>(null);

    const getFontFamilyValue = (field: 'fontFamily' | 'logoLetterFontFamily') => {
        if (f.values.settings[field]) {
            return {
                label: f.values.settings[field]!,
                value: f.values.settings[field]!,
            };
        }
        return undefined;
    };

    const doBase64Image = async () => {
        if (readySvg.current) {
            const divElement = readySvg.current;

            if (divElement) {
                htmlToImage
                    .toPng(divElement, { cacheBust: true })
                    .then(function (base64Image) {
                        f.setFieldValue('settings.logoPointSrc', base64Image);
                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                    });
            }
        }
        if (readySvgDark.current) {
            const divElement = readySvgDark.current;

            if (divElement) {
                htmlToImage
                    .toPng(divElement, { cacheBust: true })
                    .then(function (base64Image) {
                        f.setFieldValue('settings.logoPointSrcDark', base64Image);
                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                    });
            }
        }
        if (readySvgLight.current) {
            const divElement = readySvgLight.current;

            if (divElement) {
                htmlToImage
                    .toPng(divElement, { cacheBust: true })
                    .then(function (base64Image) {
                        f.setFieldValue('settings.logoPointSrcLight', base64Image);
                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                    });
            }
        }
    };

    useEffect(() => {
        doBase64Image();
    }, [f.values.settings]);

    return (
        <>
            <head>
                <link
                    rel="stylesheet"
                    crossOrigin="anonymous"
                    href={`https://fonts.googleapis.com/css2?family=${f.values.settings.logoLetterFontFamily}:wght@400&display=swap`}
                />
            </head>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    if (f.isValid) {
                        f.submitForm().then(() => setPreviewKey(uuidv4()));
                    } else {
                        f.submitForm();
                    }
                }}
                className={className}
            >
                <fieldset className="fieldset">
                    <h3 className="fieldset__legend">{t('general-settings-fieldset-legend')}</h3>
                    <p className="fieldset__subtitle">{t('general-settings-fieldset-subtitle')}</p>
                    <fieldset className="field">
                        <legend className="field__label">{t('widgets-theme-field-label')}</legend>

                        <Radio
                            checked={f.values.settings.theme === 'light'}
                            onChange={() => {
                                f.setFieldValue('settings.theme', 'light');
                            }}
                            LabelIcon={<SunIcon />}
                            className="theme-field"
                        >
                            {t('light-theme-checkbox-label')}
                        </Radio>
                        <Radio
                            checked={f.values.settings.theme === 'dark'}
                            onChange={() => {
                                f.setFieldValue('settings.theme', 'dark');
                            }}
                            LabelIcon={<MoonIcon />}
                        >
                            {t('dark-theme-checkbox-label')}
                        </Radio>
                    </fieldset>
                    <div className="split-fields bg-color-fields">
                        <label className="field">
                            <span className="field__label">{t('light-theme-bg-input-label')}</span>
                            <ColorFieldsInput
                                {...f.getFieldProps('settings.lightBgColor')}
                                handleColorChange={(newValue) => {
                                    f.setFieldValue('settings.lightBgColor', newValue);
                                }}
                                colorValue={f.getFieldProps('settings.lightBgColor').value}
                                isError={Boolean(
                                    settingsTouched?.lightBgColor && settingsErrors?.lightBgColor
                                )}
                            />
                        </label>

                        <label className="field">
                            <span className="field__label">{t('dark-theme-bg-input-label')}</span>
                            <ColorFieldsInput
                                {...f.getFieldProps('settings.darkBgColor')}
                                handleColorChange={(newValue) => {
                                    f.setFieldValue('settings.darkBgColor', newValue);
                                }}
                                colorValue={f.getFieldProps('settings.darkBgColor').value}
                                isError={Boolean(settingsTouched?.darkBgColor && settingsErrors?.darkBgColor)}
                            />
                        </label>
                    </div>

                    <div className="split-fields">
                        <label className="field">
                            <span className="field__label">{t('font-field-label')}</span>
                            <Select
                                size="md"
                                options={webfontOptions}
                                value={getFontFamilyValue('fontFamily')}
                                onChange={(option) => {
                                    if (option) {
                                        f.setFieldValue('settings.fontFamily', option.value);
                                    }
                                }}
                                placeholder=""
                            />
                        </label>

                        <fieldset className="field">
                            <legend className="field__label">{t('widget-color-field-label')}</legend>

                            <div className="color-fields">
                                <ColorFieldsInput
                                    className="color-fields__input"
                                    {...f.getFieldProps('settings.widgetColor')}
                                    handleColorChange={(newValue) => {
                                        f.setFieldValue('settings.widgetColor', newValue);
                                    }}
                                    colorValue={f.getFieldProps('settings.widgetColor').value}
                                    isError={Boolean(
                                        settingsTouched?.widgetColor && settingsErrors?.widgetColor
                                    )}
                                />
                                <div className="preset-colors">
                                    {presetButtonsColors.map((color) => (
                                        <button
                                            type="button"
                                            key={color}
                                            onClick={() => {
                                                f.setFieldValue('settings.widgetColor', color);
                                            }}
                                            style={{
                                                backgroundColor: color,
                                            }}
                                        ></button>
                                    ))}
                                </div>
                            </div>

                            {settingsErrors?.widgetColor && settingsTouched?.widgetColor && (
                                <ErrorMessage>{settingsErrors?.widgetColor}</ErrorMessage>
                            )}
                        </fieldset>
                    </div>
                </fieldset>

                <fieldset className="fieldset">
                    <div className="fieldset__tracker">
                        <h3 className="fieldset__legend fieldset__legend-margin">
                            {t('tracker-widget-fieldset-legend')}
                        </h3>

                        <label className="field field--required">
                            <span className="field__label">{t('redirect-link-field-label')}</span>

                            <Input
                                size="lg"
                                data-error={Boolean(
                                    trackerTouched?.redirectUrl && trackerErrors?.redirectUrl
                                )}
                                {...f.getFieldProps('tracker.redirectUrl')}
                                onChange={(newValue) => {
                                    f.setFieldValue('tracker.redirectUrl', newValue);
                                }}
                            />

                            {trackerErrors?.redirectUrl && trackerTouched?.redirectUrl && (
                                <ErrorMessage>{trackerErrors.redirectUrl}</ErrorMessage>
                            )}
                        </label>

                        {/* <label className="field">
                            <span className="field__label">{t('points-name-field-label')}</span>

                            <Input
                                size="lg"
                                data-error={Boolean(trackerTouched?.pointsName && trackerErrors?.pointsName)}
                                {...f.getFieldProps('tracker.pointsName')}
                                onChange={(newValue) => {
                                    f.setFieldValue('tracker.pointsName', newValue);
                                }}
                            />

                            {trackerErrors?.pointsName && trackerTouched?.pointsName && (
                                <ErrorMessage>{trackerErrors?.pointsName}</ErrorMessage>
                            )}
                        </label> */}

                        <label className="field field--required">
                            <span className="field__label">{t('header-text-field-label')}</span>

                            <Input
                                size="lg"
                                data-error={Boolean(
                                    settingsTouched?.headerTitle && settingsErrors?.headerTitle
                                )}
                                {...f.getFieldProps('settings.headerTitle')}
                                onChange={(newValue) => {
                                    f.setFieldValue('settings.headerTitle', newValue);
                                }}
                            />

                            {settingsErrors?.headerTitle && settingsTouched?.headerTitle && (
                                <ErrorMessage>{settingsErrors?.headerTitle}</ErrorMessage>
                            )}
                        </label>

                        <label className="field field--required">
                            <span className="field__label">
                                {/* {t('header-text-field-label')} */}
                                Slogan
                            </span>

                            <Input
                                size="lg"
                                data-error={Boolean(
                                    settingsTouched?.welcomeSlogan && settingsErrors?.welcomeSlogan
                                )}
                                {...f.getFieldProps('settings.welcomeSlogan')}
                                onChange={(newValue) => {
                                    f.setFieldValue('settings.welcomeSlogan', newValue);
                                }}
                            />

                            {settingsErrors?.welcomeSlogan && settingsTouched?.welcomeSlogan && (
                                <ErrorMessage>{settingsErrors?.welcomeSlogan}</ErrorMessage>
                            )}
                        </label>

                        <label className="field field--required">
                            <span className="field__label">{t('description-text-field-label')}</span>

                            <Input
                                size="lg"
                                as="textarea"
                                rows={3}
                                data-error={Boolean(
                                    settingsTouched?.description && settingsErrors?.description
                                )}
                                {...f.getFieldProps('settings.description')}
                                onChange={(e: any) => {
                                    f.setFieldValue('settings.description', e?.target?.value);
                                }}
                            />

                            {settingsErrors?.description && settingsTouched?.description && (
                                <ErrorMessage>{settingsErrors?.description}</ErrorMessage>
                            )}
                        </label>

                        <label className="field field--required">
                            <span className="field__label">
                                {/* {t('header-text-field-label')} */}
                                CTA Button text
                            </span>

                            <Input
                                size="lg"
                                data-error={Boolean(
                                    settingsTouched?.welcomeBtnText && settingsErrors?.welcomeBtnText
                                )}
                                {...f.getFieldProps('settings.welcomeBtnText')}
                                onChange={(newValue) => {
                                    f.setFieldValue('settings.welcomeBtnText', newValue);
                                }}
                            />

                            {settingsErrors?.welcomeBtnText && settingsTouched?.welcomeBtnText && (
                                <ErrorMessage>{settingsErrors?.welcomeBtnText}</ErrorMessage>
                            )}
                        </label>
                        <label className="field">
                            <span className="field__label">
                                {/* {t('header-text-field-label')} */}
                                Details content
                            </span>

                            <Input
                                size="lg"
                                as="textarea"
                                rows={3}
                                data-error={Boolean(
                                    settingsTouched?.welcomeDetails && settingsErrors?.welcomeDetails
                                )}
                                {...f.getFieldProps('settings.welcomeDetails')}
                                onChange={(e: any) => {
                                    f.setFieldValue('settings.welcomeDetails', e?.target?.value);
                                }}
                            />
                        </label>

                        <label className="field field--required">
                            <span className="field__label">{t('image-logo-field-label')}</span>

                            <Input
                                size="lg"
                                data-error={Boolean(settingsTouched?.imageLogo && settingsErrors?.imageLogo)}
                                {...f.getFieldProps('settings.imageLogo')}
                                onChange={(newValue) => {
                                    f.setFieldValue('settings.imageLogo', newValue);
                                }}
                            />

                            {settingsErrors?.imageLogo && settingsTouched?.imageLogo && (
                                <ErrorMessage>{settingsErrors?.imageLogo}</ErrorMessage>
                            )}
                        </label>

                        <div className="points-icon">
                            <h3 className="fieldset__legend">{t('letter-points-icon')}</h3>

                            <div className="color-fields">
                                <label className="field field--required">
                                    <span className="field__label">{t('letter-point-letter')}</span>

                                    <Input
                                        size="lg"
                                        maxLength={2}
                                        data-error={Boolean(
                                            settingsTouched?.logoPointLetter &&
                                                settingsErrors?.logoPointLetter
                                        )}
                                        {...f.getFieldProps('settings.logoPointLetter')}
                                        onChange={(newValue) => {
                                            f.setFieldValue('settings.logoPointLetter', newValue);
                                        }}
                                    />

                                    {settingsErrors?.logoPointLetter && settingsTouched?.logoPointLetter && (
                                        <ErrorMessage>{settingsErrors?.logoPointLetter}</ErrorMessage>
                                    )}
                                </label>

                                <label className="field field--required">
                                    <span className="field__label">{t('letter-point-icon')}</span>

                                    <div className="icons-container">
                                        <div
                                            className={classNames('icon-select', {
                                                'icon-select--active':
                                                    f.values.settings.logoPointIcon === 'EmptyCircleIcon',
                                            })}
                                            onClick={() =>
                                                f.setFieldValue('settings.logoPointIcon', 'EmptyCircleIcon')
                                            }
                                        >
                                            <EmptyCircleIcon mainColor={'#FE5D26'} />
                                        </div>

                                        <div
                                            className={classNames('icon-select', {
                                                'icon-select--active':
                                                    f.values.settings.logoPointIcon === 'CircleIcon',
                                            })}
                                            onClick={() =>
                                                f.setFieldValue('settings.logoPointIcon', 'CircleIcon')
                                            }
                                        >
                                            <CircleIcon mainColor={'#FE5D26'} />
                                        </div>
                                        <div
                                            className={classNames('icon-select', {
                                                'icon-select--active':
                                                    f.values.settings.logoPointIcon === 'OctagonIcon',
                                            })}
                                            onClick={() =>
                                                f.setFieldValue('settings.logoPointIcon', 'OctagonIcon')
                                            }
                                        >
                                            <OctagonIcon mainColor={'#FE5D26'} />
                                        </div>
                                        <div
                                            className={classNames('icon-select', {
                                                'icon-select--active':
                                                    f.values.settings.logoPointIcon === 'AngularIcon',
                                            })}
                                            onClick={() =>
                                                f.setFieldValue('settings.logoPointIcon', 'AngularIcon')
                                            }
                                        >
                                            <AngularIcon mainColor={'#FE5D26'} />
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <label className="field field--required">
                                <span className="field__label">{t('letter-font-family')}</span>
                                <Select
                                    size="md"
                                    options={webfontOptions}
                                    value={getFontFamilyValue('logoLetterFontFamily')}
                                    onChange={(option) => {
                                        if (option) {
                                            f.setFieldValue('settings.logoLetterFontFamily', option.value);
                                        }
                                    }}
                                    placeholder=""
                                />
                            </label>

                            <div className="color-fields">
                                <label className="field field--required">
                                    <span className="field__label">{t('letter-font-size')}</span>
                                    <Input
                                        size="lg"
                                        data-error={Boolean(
                                            settingsTouched?.logoLetterFontSize &&
                                                settingsErrors?.logoLetterFontSize
                                        )}
                                        {...f.getFieldProps('settings.logoLetterFontSize')}
                                        onChange={(newValue) => {
                                            f.setFieldValue('settings.logoLetterFontSize', newValue);
                                        }}
                                    />

                                    {settingsErrors?.logoLetterFontSize &&
                                        settingsTouched?.logoLetterFontSize && (
                                            <ErrorMessage>{settingsErrors?.logoLetterFontSize}</ErrorMessage>
                                        )}
                                </label>

                                <label className="field field--required">
                                    <span className="field__label">{t('letter-offset')}</span>
                                    <div className="color-fields__input">
                                        <Input
                                            style={{ flex: 1 }}
                                            size="lg"
                                            data-error={Boolean(
                                                settingsTouched?.margin && settingsErrors?.margin
                                            )}
                                            {...f.getFieldProps('settings.margin')}
                                            onChange={(newValue) => {
                                                f.setFieldValue('settings.margin', newValue);
                                            }}
                                        />

                                        {settingsErrors?.margin && settingsTouched?.margin && (
                                            <ErrorMessage>{settingsErrors?.margin}</ErrorMessage>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="split-fields">
                            <label className="field field--required">
                                <span className="field__label">{t('horizontal-offset-field-label')}</span>

                                <Input
                                    size="lg"
                                    data-error={Boolean(
                                        trackerTouched?.offset?.horizontalOffset &&
                                            trackerErrors?.offset?.horizontalOffset
                                    )}
                                    {...f.getFieldProps('tracker.offset.horizontalOffset')}
                                    onChange={(newValue) => {
                                        f.setFieldValue('tracker.offset.horizontalOffset', newValue);
                                    }}
                                />

                                {trackerErrors?.offset?.horizontalOffset && (
                                    <ErrorMessage>{trackerErrors?.offset?.horizontalOffset}</ErrorMessage>
                                )}
                            </label>

                            <label className="field field--required">
                                <span className="field__label">{t('vertical-offset-field-label')}</span>

                                <Input
                                    size="lg"
                                    data-error={Boolean(
                                        trackerTouched?.offset?.verticalOffset &&
                                            trackerErrors?.offset?.verticalOffset
                                    )}
                                    {...f.getFieldProps('tracker.offset.verticalOffset')}
                                    onChange={(newValue) => {
                                        f.setFieldValue('tracker.offset.verticalOffset', newValue);
                                    }}
                                />

                                {trackerErrors?.offset?.verticalOffset && (
                                    <ErrorMessage>{trackerErrors?.offset?.verticalOffset}</ErrorMessage>
                                )}
                            </label>
                        </div>
                        <div className="buttons">
                            <Button appearance="primary" size="md" type="submit" disabled={!areValuesChanged}>
                                {f.isSubmitting ? <Loader /> : t('save-tracker-settings-button-submit')}
                            </Button>
                        </div>
                    </div>

                    <div className="preview">
                        <h3 className="preview__title">{t('widget-preview-title').toUpperCase()}</h3>
                        <div className="preview__wrapper">
                            <div className="preview__widget">
                                {f.values.settings.imageLogo ? (
                                    <div
                                        className="result-container-logo"
                                        style={{
                                            bottom: activeWidgetConfig?.tracker.offset.verticalOffset
                                                ? activeWidgetConfig?.tracker.offset.verticalOffset - 1 + 'px'
                                                : '0px',
                                            right: activeWidgetConfig?.tracker.offset.horizontalOffset
                                                ? activeWidgetConfig?.tracker.offset.horizontalOffset -
                                                  1 +
                                                  'px'
                                                : '0 px',
                                            backgroundColor:
                                                f.values.settings.theme === 'dark'
                                                    ? f.values.settings.darkBgColor
                                                    : f.values.settings.lightBgColor,
                                        }}
                                    >
                                        <div className="result-logo">
                                            <img src={f.values.settings.imageLogo} />
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="result-container"
                                        style={{
                                            bottom: activeWidgetConfig?.tracker.offset.verticalOffset
                                                ? activeWidgetConfig?.tracker.offset.verticalOffset - 1 + 'px'
                                                : '0px',
                                            right: activeWidgetConfig?.tracker.offset.horizontalOffset
                                                ? activeWidgetConfig?.tracker.offset.horizontalOffset -
                                                  1 +
                                                  'px'
                                                : '0 px',

                                            backgroundColor:
                                                f.values.settings.theme === 'dark'
                                                    ? f.values.settings.darkBgColor
                                                    : f.values.settings.lightBgColor,
                                        }}
                                    >
                                        <div className="result">
                                            {f.values.settings.logoPointIcon === 'EmptyCircleIcon' && (
                                                <EmptyCircleIcon mainColor={f.values.settings.widgetColor} />
                                            )}
                                            {f.values.settings.logoPointIcon === 'CircleIcon' && (
                                                <CircleIcon mainColor={f.values.settings.widgetColor} />
                                            )}
                                            {f.values.settings.logoPointIcon === 'OctagonIcon' && (
                                                <OctagonIcon mainColor={f.values.settings.widgetColor} />
                                            )}
                                            {f.values.settings.logoPointIcon === 'AngularIcon' && (
                                                <AngularIcon mainColor={f.values.settings.widgetColor} />
                                            )}

                                            {f.values.settings.logoPointLetter && (
                                                <span
                                                    style={{
                                                        fontSize: f.values.settings.logoLetterFontSize + 'px',
                                                        fontFamily: `"${f.values.settings.logoLetterFontFamily}",sans-serif`,
                                                        marginTop: f.values.settings.margin + 'px',
                                                        color:
                                                            f.values.settings.logoPointIcon ===
                                                            'EmptyCircleIcon'
                                                                ? f.values.settings.widgetColor
                                                                : 'white',
                                                    }}
                                                >
                                                    {f.values.settings.logoPointLetter}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <iframe
                                    src={new URL(
                                        `?widgetId=${widgetId}&isPreview=true`,
                                        process.env.NEXT_PUBLIC_POINT_BALANCE_WIDGET_URL
                                    ).toString()}
                                    className="preview__iframe"
                                    key={previewKey}
                                    frameBorder={0}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="logos-container">
                        <div className="logo-main">
                            <div ref={readySvg} className="result">
                                {f.values.settings.logoPointIcon === 'EmptyCircleIcon' && (
                                    <EmptyCircleIcon mainColor={f.values.settings.widgetColor} />
                                )}
                                {f.values.settings.logoPointIcon === 'CircleIcon' && (
                                    <CircleIcon mainColor={f.values.settings.widgetColor} />
                                )}
                                {f.values.settings.logoPointIcon === 'OctagonIcon' && (
                                    <OctagonIcon mainColor={f.values.settings.widgetColor} />
                                )}
                                {f.values.settings.logoPointIcon === 'AngularIcon' && (
                                    <AngularIcon mainColor={f.values.settings.widgetColor} />
                                )}

                                {f.values.settings.logoPointLetter && (
                                    <span
                                        style={{
                                            fontSize:
                                                Number(f.values.settings.logoLetterFontSize) * 2.5 + 'px',
                                            fontFamily: `"${f.values.settings.logoLetterFontFamily}",sans-serif`,
                                            marginTop: f.values.settings.margin + 'px',
                                            color:
                                                f.values.settings.logoPointIcon === 'EmptyCircleIcon'
                                                    ? f.values.settings.widgetColor
                                                    : 'white',
                                        }}
                                    >
                                        {f.values.settings.logoPointLetter}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="logo-light">
                            <div ref={readySvgLight} className="result">
                                {f.values.settings.logoPointIcon === 'EmptyCircleIcon' && (
                                    <EmptyCircleIcon mainColor={'#3A4054'} />
                                )}
                                {f.values.settings.logoPointIcon === 'CircleIcon' && (
                                    <CircleIcon mainColor={'#3A4054'} />
                                )}
                                {f.values.settings.logoPointIcon === 'OctagonIcon' && (
                                    <OctagonIcon mainColor={'#3A4054'} />
                                )}
                                {f.values.settings.logoPointIcon === 'AngularIcon' && (
                                    <AngularIcon mainColor={'#3A4054'} />
                                )}

                                {f.values.settings.logoPointLetter && (
                                    <span
                                        style={{
                                            fontSize:
                                                Number(f.values.settings.logoLetterFontSize) * 2.5 + 'px',
                                            fontFamily: `"${f.values.settings.logoLetterFontFamily}",sans-serif`,
                                            marginTop: f.values.settings.margin + 'px',
                                            color:
                                                f.values.settings.logoPointIcon === 'EmptyCircleIcon'
                                                    ? '#3A4054'
                                                    : 'white',
                                        }}
                                    >
                                        {f.values.settings.logoPointLetter}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="logo-dark">
                            <div ref={readySvgDark} className="result">
                                {f.values.settings.logoPointIcon === 'EmptyCircleIcon' && (
                                    <EmptyCircleIcon mainColor={'#ACB1BA'} />
                                )}
                                {f.values.settings.logoPointIcon === 'CircleIcon' && (
                                    <CircleIcon mainColor={'#ACB1BA'} />
                                )}
                                {f.values.settings.logoPointIcon === 'OctagonIcon' && (
                                    <OctagonIcon mainColor={'#ACB1BA'} />
                                )}
                                {f.values.settings.logoPointIcon === 'AngularIcon' && (
                                    <AngularIcon mainColor={'#ACB1BA'} />
                                )}

                                {f.values.settings.logoPointLetter && (
                                    <span
                                        style={{
                                            fontSize:
                                                Number(f.values.settings.logoLetterFontSize) * 2.5 + 'px',
                                            fontFamily: `"${f.values.settings.logoLetterFontFamily}",sans-serif`,
                                            marginTop: f.values.settings.margin + 'px',
                                            color:
                                                f.values.settings.logoPointIcon === 'EmptyCircleIcon'
                                                    ? '#ACB1BA'
                                                    : 'white',
                                        }}
                                    >
                                        {f.values.settings.logoPointLetter}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </>
    );
})`
    ${styles}
`;
