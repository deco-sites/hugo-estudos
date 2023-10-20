import Image from "apps/website/components/Image.tsx";
import { Props } from "deco-sites/hugo-estudos/components/spinning-wheel/types.ts";

const Roulette = ({ img, slices }: Props) => {
  console.log({ slices });
  const handleCLick = () => {
    console.log("click");
    const indiceAleatorio = Math.floor(Math.random() * slices.length);
    console.log(slices[indiceAleatorio].discountValue);
  };
  return (
    <Image
      onClick={() => handleCLick}
      src={img}
      width={300}
      height={300}
    />
  );
};

export default Roulette;
