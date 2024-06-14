export const getSecondsUntilNextDayByUTC = () => {
    // calculate current UTC time
    const now = new Date();
    const currentUTC = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
    );
    // calculate UTC time for the next day
    const nextDayUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    nextDayUTC.setUTCDate(nextDayUTC.getUTCDate() + 1);
    // calculate difference and return
    return Number(nextDayUTC) - Number(currentUTC);
};
