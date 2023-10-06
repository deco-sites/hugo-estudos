import { Product } from "apps/commerce/types.ts";
import { Card } from "deco-sites/hugo-estudos/components/image-look/Types.ts";
import { useEffect, useState } from "preact/compat";

interface Props {
  product: Product;
  card: Card;
}

const InfoCard = (
  { product, card: { cardPositionX, cardPositionY } }: Props,
) => {
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    setTimeout(
      () => setisVisible(true),
      50,
    );
  }, []);

  if (!product) return null;
  return (
    <div
      class={`absolute bg-white text-black shadow-2xl w-max min-w-[200px] max-w-full border-black  border top-[50%] left-[50%] p-2 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transform: `translate(${cardPositionY}% , ${cardPositionX}%)` }}
    >
      <a href={product.url} target="_blank">
        <p className="font-bold overflow-hidden text-ellipsis max-w-full mb-1.5">
          {product.name}
        </p>
        <p class="font-normal mb-1.5">
          {"$" + product.offers?.lowPrice.toFixed(2)}
        </p>
        <button className="cursor-pointer font-normal pointer-events-none p-1 bg-secondary rounded-md text-white">
          Ver mais
        </button>
      </a>
    </div>
  );
};

export default InfoCard;
