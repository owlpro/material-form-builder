export interface BaseInput<Input> {
    selector: string;
    required?: boolean;
    wrapper?: (children: JSX.Element) => JSX.Element
}