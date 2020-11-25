import Component1 from "../components/app/router_components/component1/component1";
import Component2 from "../components/app/router_components/component2/component2";
import Component3 from "../components/app/router_components/component3/component3";
import Description from "../components/app/router_components/description/description";


export type RouterComponents = {
  [key: string]: {
    view: string;
    component: React.FC;
  };
};

export const components: RouterComponents = {
  description: {
    view: 'description',
    component: Description,
  },
  component1: {
    view: 'component1',
    component: Component1,
  },
  component2: {
    view: 'component2',
    component: Component2,
  },
  component3: {
    view: 'component3',
    component: Component3,
  }
};