import type { ImageWidget } from "apps/admin/widgets.ts";
import { Product } from "apps/commerce/types.ts";

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
  product: Product | null;
  positionX: number;
  positionY: number;
  card: Card;
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
