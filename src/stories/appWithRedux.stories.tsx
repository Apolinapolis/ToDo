import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: "App component",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const appWithReduxExample = () => {return < AppWithRedux />}