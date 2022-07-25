export type TextType = "text";
export type NumberType = "number";

export type InputTypes = TextType | NumberType

export interface Input {
    type: InputTypes
    selector: string;
    label: string;
    value?: any;
}