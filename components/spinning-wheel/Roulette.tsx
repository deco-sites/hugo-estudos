import Image from "apps/website/components/Image.tsx";
import { Props } from "deco-sites/hugo-estudos/components/spinning-wheel/types.ts";
import { useEffect, useState } from "preact/hooks";
//TODO: position degre para 360/qtd de slices
const Roulette = ({ img, slices, positionDegree = 52 }: Props) => {
  const [rotate, setRotate] = useState(false);
  const [rotationValue, setRotationValue] = useState(0);

  console.log({ slices });
  const handleCLick = async () => {
    setRotate(true);
    const indiceAleatorio = Math.floor(Math.random() * slices.length);
    console.log({
      index: indiceAleatorio,
      value: slices[indiceAleatorio].discountValue,
    });
    // await new Promise((resolve) => setTimeout(resolve, 1010));
    await new Promise((resolve) => setTimeout(resolve, 1050));
    setRotationValue(indiceAleatorio * positionDegree);
  };

  useEffect(() => {
    console.log(rotationValue);
  }, [rotationValue]);

  return (
    <Image
      style={{
        transform: `rotate(${rotationValue}deg)`,
      }}
      class={`transition duration-[5000ms] ease-out ${rotate && "rotate"} `}
      onClick={handleCLick}
      src={img}
      width={300}
      height={300}
    />
  );
};

export default Roulette;
