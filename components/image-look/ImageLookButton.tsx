import { memo, useState } from "preact/compat";
import InfoCard from "deco-sites/hugo-estudos/components/image-look/InfoCard.tsx";
import { Buttons } from "deco-sites/hugo-estudos/components/image-look/Types.ts";
// import { useState } from "preact/hooks";

const ImageLookButton = (
  { positionX, positionY, product, cardPositionX, cardPositionY }: Buttons,
) => {
  const [openInfoCard, setOpenInforCard] = useState(false);
  if (!product) return null;
  return (
    <button
      className={`absolute bg-red-200 translate-x-[-50%] translate-y-[-50%] w-5 h-5 rounded-full w-`}
      style={{
        top: `${positionY}%`,
        left: `${positionX}%`,
      }}
      onClick={() => setOpenInforCard((prev) => !prev)}
    >
      +
      {openInfoCard && (
        <InfoCard
          product={product}
          cardPositionX={cardPositionX}
          cardPositionY={cardPositionY}
        />
      )}
    </button>
  );
};

export default memo(ImageLookButton);
