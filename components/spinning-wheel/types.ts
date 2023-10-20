import { ImageWidget } from "apps/admin/widgets.ts";

export interface Slice {
  discountValue: number;
}
export interface Props {
  img: ImageWidget;
  slices: Slice[];
  positionDegree: number;
}
