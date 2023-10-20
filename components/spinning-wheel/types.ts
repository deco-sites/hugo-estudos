import { ImageWidget } from "apps/admin/widgets.ts";

export interface Slice {
  discountValue: number;
  positionDegree: number;
}
export interface Props {
  img: ImageWidget;
  slices: Slice[];
}
