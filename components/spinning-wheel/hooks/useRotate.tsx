import { useState } from "preact/hooks";
import { Slice } from "deco-sites/hugo-estudos/components/spinning-wheel/types.ts";

const useRotate = (slices: Slice[]) => {
  const [rotate, setRotate] = useState(false);
  const [rotationValue, setRotationValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const draw = async () => {
    setLoading(true);
    try {
      //   console.log("SLICES", JSON.stringify(slices));
      const resp = await fetch("/api/draw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slices),
      });
      const { index, drawnSlice, coupon } = await resp.json() as {
        index: number;
        drawnSlice: Slice;
        coupon: string;
      };

      setRotate(true);

      await new Promise((resolve) => setTimeout(resolve, 10100));
      setRotationValue(index * (360 / slices.length));

      if (drawnSlice.discountValue === 20) {
        setRotate(false);
        return;
      }

      //   console.log({ drawnSlice, coupon });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return { rotate, rotationValue, loading, draw };
};

export default useRotate;
