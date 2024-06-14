export const formatDate = (utcIsoDate: string, locale: string = 'en') => {
    const targetDate = new Date(utcIsoDate);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    };
    return new Intl.DateTimeFormat(locale, options).format(targetDate);
};
