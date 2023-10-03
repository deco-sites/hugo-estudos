import { Product } from "apps/commerce/types.ts";
import { memo, useState } from "preact/compat";
import InfoCard from "deco-sites/hugo-estudos/components/image-look/InfoCard.tsx";
// import { useState } from "preact/hooks";

export interface Props {
  positionX: number;
  positionY: number;
  product: Product;
}

const ImageLookButton = ({ positionX, positionY, product }: Props) => {
  const [openInfoCard, setOpenInforCard] = useState(false);

  return (
    <button
      className={`absolute bg-red-200 translate-x-[-50%] translate-y-[-50%] w-5 h-5 rounded-full w-`}
      style={{
        top: `${positionX}%`,
        left: `${positionY}%`,
      }}
      onClick={() => setOpenInforCard((prev) => !prev)}
    >
      +
      {openInfoCard && <InfoCard product={product} />}
    </button>
  );
};

export default memo(ImageLookButton);
