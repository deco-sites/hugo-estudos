import { Props } from "deco-sites/hugo-estudos/components/spinning-wheel/types.ts";
import Roulette from "deco-sites/hugo-estudos/islands/Roulette.tsx";

const SpinningWheel = (props: Props) => {
  return <Roulette {...props} />;
};

export default SpinningWheel;
