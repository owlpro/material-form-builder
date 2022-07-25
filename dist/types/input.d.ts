export declare type TextType = "text";
export declare type NumberType = "number";
export declare type InputTypes = TextType | NumberType;
export interface Input {
    type: InputTypes;
    selector: string;
    label: string;
    value?: any;
}
