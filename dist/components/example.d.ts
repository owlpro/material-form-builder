import { Component } from "react";
interface State {
    loading: boolean;
}
export interface ExampleComponentPropsInterface {
    text: string;
}
export declare class ExampleComponent extends Component<ExampleComponentPropsInterface, State> {
    state: Readonly<State>;
    render(): JSX.Element;
}
export {};
