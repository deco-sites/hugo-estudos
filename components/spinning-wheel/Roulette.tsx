import Image from "apps/website/components/Image.tsx";
import { Props } from "deco-sites/hugo-estudos/components/spinning-wheel/types.ts";

const Roulette = ({ img, slices }: Props) => {
  const handleCLick = () => {
    const indiceAleatorio = Math.floor(Math.random() * slices.length);
    alert(slices[indiceAleatorio].discountValue);
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
