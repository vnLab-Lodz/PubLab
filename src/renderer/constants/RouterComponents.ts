import Component1 from "../components/RouterComponents/Component1/Component1";
import Component2 from "../components/RouterComponents/Component2/Component2";
import Component3 from "../components/RouterComponents/Component3/Component3";
import Description from "../components/RouterComponents/Description/Description";
import { COMPONENTS_LIST } from "../constants/ComponentsList"


export type RouterComponents = {
  [key: string]: {
    view: string;
    component: React.FC;
  };
};


export const components: RouterComponents = {
  description: {
    view: COMPONENTS_LIST.DESCRIPTION,
    component: Description,
  },
  component1: {
    view: COMPONENTS_LIST.COMPONENT1,
    component: Component1,
  },
  component2: {
    view: COMPONENTS_LIST.COMPONENT2,
    component: Component2,
  },
  component3: {
    view: COMPONENTS_LIST.COMPONENT3,
    component: Component3,
  }
};