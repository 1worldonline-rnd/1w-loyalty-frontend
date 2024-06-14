export const isAvailableLocalStorage = () => {
    let isAvailable = true;
    try {
        isAvailable = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    } catch {
        return false;
    }
    return isAvailable;
};
