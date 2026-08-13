'use client';

import { useEffect, useState } from 'react';
import { isEarlyAccess } from '@/lib/earlyAccess';

interface CollectionPriceProps {
    price: string;
    earlyAccessPrice?: string;
}

const CollectionPrice = ({ price, earlyAccessPrice }: CollectionPriceProps) => {
    const [earlyAccess, setEarlyAccess] = useState(false);

    useEffect(() => {
        setEarlyAccess(isEarlyAccess());
    }, []);

    if (earlyAccess && earlyAccessPrice) {
        return (
            <span className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest text-white/60 line-through">
                    {price}
                </span>
                <span className="text-xs font-bold tracking-widest text-white">
                    {earlyAccessPrice}
                </span>
            </span>
        );
    }

    return (
        <span className="text-xs font-bold tracking-widest text-white">
            {price}
        </span>
    );
};

export default CollectionPrice;