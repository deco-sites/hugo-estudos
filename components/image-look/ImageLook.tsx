import { Props } from "deco-sites/hugo-estudos/components/image-look/Types.ts";
import ImageLookButton from "deco-sites/hugo-estudos/islands/ImageLookButton.tsx";

function ImageLook({ images, title }: Props) {
  const positionX = 10;
  const positionY = 10;
  return (
    <section className="flex justify-center items-center flex-wrap my-5 gap-2">
      {images.map((image) => (
        <>
          <h2 class="container w-full text-center font-bold text-xl my-4">
            {title}
          </h2>
          <div className="relative w-auto inline-block">
            <img
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              loading="lazy"
            />
            {image.buttons.map((button, index) => {
              if (!button.product) return;
              return (
                <ImageLookButton
                  key={button.product.productID + index}
                  positionX={button.positionX}
                  positionY={button.positionY}
                  card={button.card}
                  product={button.product}
                />
              );
            })}
          </div>
        </>
      ))}
    </div>
  );
}

export default ImageLook;
