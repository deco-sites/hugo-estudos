import Image from "apps/website/components/Image.tsx";
import { Props } from "deco-sites/hugo-estudos/components/spinning-wheel/types.ts";

const Roulette = ({ img, slices, positionDegree }: Props) => {
  console.log({ slices });
  const handleCLick = () => {
    const indiceAleatorio = Math.floor(Math.random() * slices.length);
    console.log({
      index: indiceAleatorio,
      value: slices[indiceAleatorio].discountValue,
    });
    //TODO: ajustar a rotação multiplicando indiceAleatorio + 1 x positionDegree
  };
  return (
    <Image
      onClick={handleCLick}
      src={img}
      width={300}
      height={300}
    />
  );
};

export default Roulette;
