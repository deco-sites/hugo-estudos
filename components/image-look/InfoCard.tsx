import { Product } from "apps/commerce/types.ts";
import { Card } from "deco-sites/hugo-estudos/components/image-look/Types.ts";

interface Props {
  product: Product;
  card: Card;
}

const InfoCard = (
  { product, card: { cardPositionX, cardPositionY } }: Props,
) => {
  if (!product) return null;
  return (
    <div
      className="absolute bg-white shadow-2xl w-max min-w-[200px] max-w-full border-black  border top-[50%] left-[50%] p-2"
      // style={{ top: `${cardPositionY}%`, left: `${cardPositionX}` }}
      style={{ transform: `translate(${cardPositionY}% , ${cardPositionX}%)` }}
    >
      <a href={product.url} target="_blank">
        <p className="whitespace-nowrap font-bold overflow-hidden text-ellipsis max-w-full">
          {product.name}
        </p>
        <p>{product.offers?.lowPrice}</p>
        <button className="cursor-pointer pointer-events-none">
          Ver mais
        </button>
      </a>
    </div>
  );
};

export default InfoCard;
