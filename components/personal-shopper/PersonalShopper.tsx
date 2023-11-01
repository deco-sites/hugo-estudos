import PersonalShopperStream from "deco-sites/hugo-estudos/islands/PersonalShopperStream.tsx";

export interface Props {
  productId : string
}

const PersonalShopper = ({productId}: Props) => {
  return <PersonalShopperStream productId={productId} />;
};

export default PersonalShopper;
