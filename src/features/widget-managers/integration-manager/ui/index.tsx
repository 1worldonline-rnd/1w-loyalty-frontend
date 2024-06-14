import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { useWidgetEmbedCode } from '../hooks/useWidgetEmbedCode';
import { Animation } from 'rsuite';
import { CopyButton } from '@/shared/ui/copy-button';

export const IntegrationManager = styled(({ className }: PropsWithClassName) => {
    const { loyaltyWidgetEmbedCode, trackerWidgetEmbedCode, storageManagerEmbedCode } = useWidgetEmbedCode();
    const [isInstructionOpen, setInstructionOpen] = useState(false);

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.editing' });

    return (
        <div className={className}>
            <section className="code">
                <h3 className="code__title">{t('loyalty-page-embed-code-field-label')}</h3>
                <a className="code__instruction-btn" onClick={() => setInstructionOpen(!isInstructionOpen)}>
                    {t('instructions-for-dynamic-theme-switching')}
                </a>
                <Animation.Collapse in={isInstructionOpen}>
                    <div>
                        <p className="code__description">
                            If you have a toggle on your website for switching between light and dark themes,
                            you can dynamically switch the widget's theme accordingly.{' '}
                        </p>
                        <p className="code__description">
                            Simply call the global function <code>switch1WOLPTheme</code> and pass either
                            'light' or 'dark' as the argument, like this:{' '}
                            <code>switch1WOLPTheme("dark")</code>.This will switch the widget to the dark
                            theme. You can place this function call in the same method where you're switching
                            your website's theme.
                        </p>
                    </div>
                </Animation.Collapse>

                <div className="code__input">
                    <pre className="code__text">{loyaltyWidgetEmbedCode}</pre>

                    <CopyButton textToCopy={loyaltyWidgetEmbedCode} />
                </div>
            </section>

            <section className="code">
                <h3 className="code__title">{t('tracker-widget-embed-code-field-label')}</h3>

                <div className="code__input">
                    <pre className="code__text">{trackerWidgetEmbedCode} </pre>

                    <CopyButton textToCopy={trackerWidgetEmbedCode} />
                </div>
            </section>

            <section className="code">
                <h3 className="code__title">Embed code for cookies and local storage data compliance</h3>

                <p className="code__description">
                    Widgets work by default. If you want to change the default behavior, change the value for
                    the attribute <code>{'<content>'}</code> of <code>{'<meta>'}</code> tag. If value equals 1 is working, 0
                    is not working.
                    Connect the script and call the appropriate method depending on the user's choice.
                </p>

                <div className="code__input">
                    <pre className="code__text">{storageManagerEmbedCode} </pre>

                    <CopyButton textToCopy={storageManagerEmbedCode} />
                </div>
            </section>
        </div>
    );
})`
    ${styles}
`;
