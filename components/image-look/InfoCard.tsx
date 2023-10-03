import { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

const InfoCard = ({ product }: Props) => {
  if (!product) return null;
  return (
    <div className="absolute">
      <a href={product.url} target="_blank">
        <p>{product.name}</p>
        <p>{product.offers?.lowPrice}</p>
      </a>
    </div>
  );
};

export default InfoCard;
