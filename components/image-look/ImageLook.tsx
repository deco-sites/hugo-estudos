import type { ImageWidget } from "apps/admin/widgets.ts";
import ImageLookButton from "deco-sites/hugo-estudos/islands/ImageLookButton.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Image {
  src: ImageWidget;
  alt: string;
  buttons: Buttons[];
}

export interface Buttons {
  // productId: string;
  product: Product | null;
  positionX: number;
  positionY: number;
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
  return (
    <section>
      {images.map((image) => (
        <div className="relative w-auto inline-block">
          <img src={image.src} alt={image.alt} width={200} height={200} />
          {image.buttons.map((button, index) => {
            if (!button.product) return;
            return (
              <ImageLookButton
                key={button.product.productID + index}
                positionX={button.positionX}
                positionY={button.positionY}
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
