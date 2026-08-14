interface CollectionPriceProps {
    price: string;
}

const CollectionPrice = ({ price }: CollectionPriceProps) => {
    return (
        <span className="text-xs font-bold tracking-widest text-white">
            {price}
        </span>
    );
};

export default CollectionPrice;
