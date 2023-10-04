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
  positionX: number;
  positionY: number;
  cardPositionX: number;
  cardPositionY: number;
}
