export const EARLY_ACCESS_STORAGE_KEY = 'ba_early_access';

export const isEarlyAccess = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
        return window.localStorage.getItem(EARLY_ACCESS_STORAGE_KEY) === 'granted';
    } catch {
        return false;
    }
};

export const getPriceValue = (price: string): number => {
    return parseInt(price.replace(/[^0-9.]/g, ''), 10);
};
