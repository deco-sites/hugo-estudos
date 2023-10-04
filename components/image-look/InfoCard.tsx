import { Product } from "apps/commerce/types.ts";

interface InfoCardProps {
  product: Product;
  cardPositionX: number;
  cardPositionY: number;
}

const InfoCard = ({ product, cardPositionX, cardPositionY }: InfoCardProps) => {
  if (!product) return null;
  return (
    <div
      className="absolute"
      style={{ top: `${cardPositionY}%`, left: `${cardPositionX}%` }}
    >
      <a href={product.url} target="_blank">
        <p>{product.name}</p>
        <p>{product.offers?.lowPrice}</p>
      </a>
    </div>
  );
};

export default InfoCard;
