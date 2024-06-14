export const getUTCDate = (date = new Date()): Date =>
    new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

export const getRegularDateString = (date = new Date()): string => {
    return new Intl.DateTimeFormat('de-DE', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    }).format(date);
};

export const formatSeconds = (s: number): string => new Date(s * 1000).toISOString().slice(11, 19);
