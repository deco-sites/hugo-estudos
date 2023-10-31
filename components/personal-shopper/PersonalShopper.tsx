import PersonalShopperStream from "deco-sites/hugo-estudos/islands/PersonalShopperStream.tsx";

export interface Props {
  category : string
}

const PersonalShopper = ({category}: Props) => {
  return <PersonalShopperStream category={category} />;
};

export default PersonalShopper;
