import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Input } from 'rsuite';
import { uk, ru, fr, pt, de, es, pl, ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { Locale } from '@/shared/constants';
import { CalendarIcon } from '@/shared/ui/icons';

const locales = {
    [Locale.uk]: uk,
    [Locale.ru]: ru,
    [Locale.fr]: fr,
    [Locale.pt]: pt,
    [Locale.de]: de,
    [Locale.es]: es,
    [Locale.pl]: pl,
    [Locale.pt]: ptBR,
};

const getLocale = (locale: Locale) => {
    if (locale !== Locale.en) {
        return locales[locale];
    }
    return undefined;
};

export const DatePicker = styled((props: ReactDatePickerProps) => {
    const { locale = Locale.en } = useRouter();

    return (
        <>
            <style jsx global>{`
                .loyalty-date-picker,
                .loyalty-date-picker > div {
                    display: flex;
                }

                .loyalty-date-picker > div > input {
                    min-height: 40px;
                    border-radius: 5px;
                    border: 1px solid var(--grey-3-color);
                }

                .loyalty-date-picker-container {
                    position: relative;
                    display: flex;
                    flex-grow: 1;
                }

                .loyalty-date-picker-container__calendar-icon {
                    position: absolute;
                    top: 55%;
                    right: 11px;
                    transform: translateY(-50%);
                    fill: var(--grey-1-color);
                    pointer-events: none;
                }

                .react-datepicker {
                    border: none;
                }

                .react-datepicker__month-container {
                    font-family: 'Proxima Nova';
                    font-weight: 400;
                    font-size: 14px;
                    box-shadow: 0px 2px 5px 0px #1718291c;
                    padding: 9px;
                }

                react-datepicker__navigation--previous {
                }

                .react-datepicker__navigation-icon--previous::before,
                .react-datepicker__navigation-icon--next::before {
                    top: 75%;
                    right: -16px;
                }

                .react-datepicker__navigation-icon--previous::before {
                    right: -16px;
                }

                .react-datepicker__navigation-icon--next::before {
                    left: -16px;
                }

                .react-datepicker__navigation-icon::before {
                    border-color: var(--text-dark-color);
                    border-width: 2px 2px 0 0;
                }

                .react-datepicker__current-month {
                    font-family: 'Proxima Nova';
                    font-weight: 600;
                    margin-bottom: 12px;
                }

                .react-datepicker__day-name {
                    font-family: 'Proxima Nova';
                    font-weight: 600;
                }

                .react-datepicker__day:hover {
                    border-radius: 50%;
                }

                .react-datepicker__day--selected,
                .react-datepicker__day--keyboard-selected {
                    border-radius: 50%;
                    background-color: var(--text-dark-color);
                }

                .react-datepicker__day--selected:hover,
                .react-datepicker__day--keyboard-selected:hover {
                    border-radius: 50%;
                    background-color: var(--text-dark-color);
                }

                .react-datepicker__header {
                    border: none;
                    background-color: white;
                }

                .react-datepicker__triangle {
                    display: none;
                }

                .react-datepicker__day--outside-month {
                    color: var(--grey-9-color);
                }
            `}</style>

            <div className="loyalty-date-picker-container">
                <ReactDatePicker
                    customInput={<Input size="md" style={{ borderRadius: 6 }} />}
                    locale={getLocale(locale as Locale)}
                    dateFormat="MMMM d, yyyy"
                    className={props.className}
                    placeholderText={'MMMM DD, YYYY'}
                    wrapperClassName="loyalty-date-picker"
                    {...props}
                />
                <span className={'loyalty-date-picker-container__calendar-icon'}>
                    <CalendarIcon />
                </span>
            </div>
        </>
    );
})``;
