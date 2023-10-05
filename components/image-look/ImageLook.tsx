import { Props } from "deco-sites/hugo-estudos/components/image-look/Types.ts";
import ImageLookButton from "deco-sites/hugo-estudos/islands/ImageLookButton.tsx";

function ImageLook({ images, title }: Props) {
  return (
    <section className="flex justify-center items-center gap-2">
      {images.map((image) => (
        <div className="relative w-auto inline-block">
          <img src={image.src} alt={image.alt} width={500} height={500} />
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
      ))}
    </section>
  );
}

export default ImageLook;
