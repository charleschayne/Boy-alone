export const PROMO_CODES: Record<string, number> = {
    BA10: 0.10,
    BA20: 0.20,
};

export const getPromoDiscountRate = (code: string): number => {
    const normalized = (code || '').trim().toUpperCase();
    return PROMO_CODES[normalized] ?? 0;
};
