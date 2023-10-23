import Image from "apps/website/components/Image.tsx";
import { Props } from "deco-sites/hugo-estudos/components/spinning-wheel/types.ts";
import useRotate from "deco-sites/hugo-estudos/components/spinning-wheel/hooks/useRotate.tsx";
//TODO: position degre para 360/qtd de slices
const Roulette = ({ img, slices }: Props) => {
  const { draw, rotate, rotationValue } = useRotate(slices);

  return (
    <div class="relative w-auto h-auto inline-block">
      <Image
        style={{
          transform: `rotate(${rotationValue}deg)`,
        }}
        class={`transition duration-[1000ms] ease-out ${rotate && "rotate"} `}
        src={img}
        width={300}
        height={300}
      />
      <button class="absolute top top-1/2 left-1/2 bg-white" onClick={draw}>
        Sortear
      </button>
    </div>
  );
};

export default Roulette;
