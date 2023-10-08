import { Props } from "deco-sites/hugo-estudos/components/image-look/Types.ts";
import ImageLookButton from "deco-sites/hugo-estudos/islands/ImageLookButton.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

function ImageLook({ images, title }: Props) {
  return (
    <div className="flex justify-center items-center flex-wrap my-5 gap-2">
      {images.map((image) => (
        <>
          <h2 class="container w-full text-center font-bold text-xl my-4">
            {title}
          </h2>
          <div className="relative w-auto inline-block">
            {
              /* <img
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              loading="eager"
            /> */
            }
            <Picture
              preload
              class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
              <Source
                src={image.src}
                width={300}
                height={300}
                media="(max-width: 767px)"
              />
              <Source
                src={image.src}
                width={500}
                height={500}
                media="(min-width: 767px)"
              />
              <img src={image.src} alt={image.alt ?? title} loading="eager" //TODO: loading: mudar para receber pelo admin a opção
              />
            </Picture>
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
