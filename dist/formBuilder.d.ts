import React, { Component } from 'react';
import { Input } from './types/input';
interface IProps {
    inputs: Input[];
}
export declare class FormBuilder extends Component<IProps> {
    private inputRefs;
    private inputs;
    onClick: () => void;
    renderInput: (input: Input, index: number) => React.CElement<{}, React.Component<{}, any, any>>;
    render(): JSX.Element;
}
export {};
