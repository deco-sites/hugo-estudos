import ImageLookButton from "deco-sites/hugo-estudos/islands/ImageLookButton.tsx";
// import { Image } from "deco-sites/hugo-estudos/components/image-look/Types.ts";
import { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Card {
  cardPositionX: number;
  cardPositionY: number;
}

export interface Image {
  src: ImageWidget;
  alt: string;
  buttons: Buttons[];
}

export interface Buttons {
  // productId: string;
  product: Product | null;
  // positionX: number;
  // positionY: number;
  // cardPositionX: number;
  // cardPositionY: number;
}

export interface Props {
  /**
   * @title Title
   * @description Title of the block
   */
  title: string;
  /**
   * @title Image list
   * @description List of images to show in the block
   */
  images: Image[];
}

function ImageLook({ images, title }: Props) {
  const positionX = 10;
  const positionY = 10;
  return (
    <div className="container flex justify-center items-center gap-2">
      {images.map((image) => (
        <div className="relative w-auto inline-block">
          <img src={image.src} alt={image.alt} width={500} height={500} />
          {image.buttons.map((button, index) => {
            if (!button.product) return;
            return (
              <ImageLookButton
                key={button.product.productID + index}
                // positionX={button.positionX}
                // positionY={button.positionY}
                positionX={positionX}
                positionY={positionY}
                product={button.product}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ImageLook;
