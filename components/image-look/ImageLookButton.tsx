import {
  lazy,
  memo,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "preact/compat";
import { Buttons } from "deco-sites/hugo-estudos/components/image-look/Types.ts";
import Spinner from "deco-sites/hugo-estudos/components/ui/Spinner.tsx";

const InfoCard = lazy(() =>
  import("deco-sites/hugo-estudos/components/image-look/InfoCard.tsx")
);

const ImageLookButton = (
  { positionX, positionY, product, card }: Buttons,
) => {
  const [openInfoCard, setOpenInforCard] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current && !buttonRef.current.contains(event.target as Node)
    ) {
      setOpenInforCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!product) return null;
  return (
    <button
      class={`absolute bg-secondary border-2 border-white font-bold flex justify-center leading-5 items-center text-white z-10 translate-x-[-50%] translate-y-[-50%] w-5 h-5 rounded-full ${
        openInfoCard ? "z-50 animate-none" : "z-10 animate-pulse"
      }`}
      ref={buttonRef}
      style={{
        top: `${positionY}%`,
        left: `${positionX}%`,
      }}
      onClick={() => setOpenInforCard((prev) => !prev)}
    >
      +
      {openInfoCard && (
        <Suspense fallback={<Spinner />}>
          <InfoCard product={product} card={card} />
        </Suspense>
      )}
    </button>
  );
};

export default memo(ImageLookButton);
