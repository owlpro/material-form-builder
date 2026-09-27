import React, { Component, createElement, Fragment } from 'react';
import { clonePlain, isPlainObject, selectFromObject, setToObject } from './helpers/general';
// import type { InputRefs } from "./types";
import { Input, InputProps, OutputValues, InputActions, ObjectLiteral, AnyInput } from "./types";

import { AutocompleteInput } from './inputs/autocomplete';
import { CheckboxInput } from './inputs/checkbox';
import { CustomInput } from './inputs/custom';
import { DateInput } from './inputs/date';
import { DatetimeInput } from './inputs/datetime';
import { FileInput } from './inputs/file';
import { GroupInput } from './inputs/group';
import { ItemsInput } from './inputs/items';
import { MaskInput } from './inputs/mask';
import { MobileInput } from './inputs/mobile';
import { NumberInput } from './inputs/number';
import { OtpInput } from './inputs/otp';
import { PasswordInput } from './inputs/password';
import { SelectInput } from './inputs/select';
import { TextInput } from './inputs/text';
import { TimeInput } from './inputs/time';
import { ToggleInput } from './inputs/toggle';
import { SwitchInput } from './inputs/switch';

const removeSelector = (data: ObjectLiteral, selector: string): void => {
    // A caller may supply either a nested object or a literal dotted key.
    if (Object.prototype.hasOwnProperty.call(data, selector)) delete data[selector];
    const parts = selector.split('.');
    let current: any = data;
    for (let index = 0; index < parts.length; index++) {
        if (!isPlainObject(current) && !Array.isArray(current)) return;
        const part = parts[index]!;
        const query = /^(.+)\[([^=\]]+)=([^\]]+)\]$/.exec(part);
        if (query) {
            const list = (current as any)[query[1]!];
            if (!Array.isArray(list)) return;
            const itemIndex = list.findIndex((item: any) => String(item?.[query[2]!.trim()]) === query[3]!.trim());
            if (itemIndex < 0) return;
            if (index === parts.length - 1) list.splice(itemIndex, 1);
            else current = list[itemIndex];
        } else if (index === parts.length - 1) {
            delete (current as any)[part];
        } else {
            current = (current as any)[part];
        }
    }
};

interface FormBuilderImplements {
    getValues: (validation: boolean) => OutputValues;
    setValues: (values: ObjectLiteral) => Promise<void>;
    clear: () => Promise<void>;
}

interface IState {
    isMounted: boolean,
    time: number | null,
    inInternalSettingProcess: boolean
}

export interface FormBuilderProps {
    inputs: InputProps[],
    onChange?: Function,
    onMount?: Function
}

export class FormBuilder<TValues extends ObjectLiteral = ObjectLiteral> extends Component<FormBuilderProps, IState> implements FormBuilderImplements {
    state: IState = {
        isMounted: false,
        time: null,
        inInternalSettingProcess: false
    }
    // @ts-ignore
    private _typecheck_only!: TValues; // ✅ TS6133 fix


    private inputRefs: Record<string, AnyInput> = {};
    private inputs: { [key in InputProps['type']]: React.ElementType } = {
        text: TextInput,
        number: NumberInput,
        items: ItemsInput,
        custom: CustomInput,
        checkbox: CheckboxInput,
        mobile: MobileInput,
        otp: OtpInput,
        password: PasswordInput,
        select: SelectInput,
        date: DateInput,
        time: TimeInput,
        datetime: DatetimeInput,
        mask: MaskInput,
        file: FileInput,
        autocomplete: AutocompleteInput,
        toggle: ToggleInput,
        group: GroupInput,
        switch: SwitchInput,
    }

    private defaultValues: ObjectLiteral | null = null;
    private didMountEvent: Function[] = [];
    private setValuesQueue: Promise<unknown> = Promise.resolve();
    private isApplyingValues = false;
    private pendingVisibilityUpdates: Promise<{ status: 'fulfilled' } | { status: 'rejected', error: unknown }>[] = [];

    componentDidMount() {
        this.setState({ ...this.state, isMounted: true }, async () => {
            await Promise.all(this.didMountEvent.map((func: Function) => func()))
            this.props.onMount?.(this.getValues(false))
        })
    }

    componentWillUnmount(): void {
        this.setState({ ...this.state, isMounted: false })
    }

    componentDidUpdate(): void {
        this.props.inputs.forEach((item) => {
            const prevVisible = this.lastVisibilityOfInputs[item.selector]?.prev
            const nowVisible = this.lastVisibilityOfInputs[item.selector]?.now
            if (prevVisible !== nowVisible && nowVisible && this.defaultValues) {
                const value = Object.prototype.hasOwnProperty.call(this.defaultValues, item.selector)
                    ? this.defaultValues[item.selector]
                    : selectFromObject(item.selector, this.defaultValues);
                if (value === undefined) return;
                const update = this.setValue(item.selector, value);
                if (this.isApplyingValues) {
                    this.pendingVisibilityUpdates.push(update.then(
                        () => ({ status: 'fulfilled' as const }),
                        error => ({ status: 'rejected' as const, error })
                    ));
                } else {
                    void update.catch(() => undefined);
                }
            }
        })
    }

    public getValues = (validation = true): OutputValues => this.collectValues(validation, false);

    private collectValues = (validation: boolean, includeHidden: boolean): OutputValues => {
        const data: ObjectLiteral = this.defaultValues ? clonePlain(this.defaultValues) : {};
        const invalidInputs: InputProps[] = [];

        // Keep unrepresented keys such as `id`, but never use saved values for known inputs.
        if (!includeHidden) this.props.inputs.forEach(input => removeSelector(data, input.selector));

        this.props.inputs.forEach(inputProps => {
            if (!includeHidden && this.lastVisibilityOfInputs[inputProps.selector]?.now === false) return;
            const input = this.inputRefs[inputProps.selector] as AnyInput;
            if (input) {
                if (validation) {
                    const isValid = input.validation?.() ?? true;
                    if ((inputProps.required || inputProps.type === "items" || inputProps.type === "group" || inputProps.type === "custom") && !isValid) {
                        invalidInputs.push(inputProps)
                    }
                }
                let value = input.getValue(validation);
                if (inputProps.getMutator && typeof inputProps.getMutator === "function") {
                    // @ts-ignore
                    let mutatedValue = inputProps.getMutator(value)
                    value = mutatedValue !== undefined ? mutatedValue : value;
                }

                setToObject(inputProps.selector, value, data)
            }
        })
        return {
            data,
            validation: {
                status: invalidInputs.length < 1,
                inputs: invalidInputs
            },
            api: {
                refs: this.inputRefs
            }
        }
    }

    private async setObjectValues(object: ObjectLiteral, path: string[] = []): Promise<any> {
        const objectKeys: string[] = Object.keys(object);
        for (let i = 0; i < objectKeys.length; i++) {
            const key = objectKeys[i]
            if (!key) return
            const value = object[key]
            const joinedSelector = [...path, key].join('.');
            const directInput = this.props.inputs.find(i => i.selector === joinedSelector)
            if (directInput && (directInput.type === "group" || (directInput.type === "custom" && directInput.allowObject))) {
                await this.setNormalValue(joinedSelector, value)
            } else if (isPlainObject(value)) {
                await this.setObjectValues(value, [...path, key])
            } else {
                const selector = [...path, key].join('.');
                await this.setNormalValue(selector, value)
            }
        }
    }

    private async setNormalValue(selector: string, value: any) {
        const regex = new RegExp('^(' + selector + ')\\[.*\\=.*\\]\\..*')
        const keyValueSelectors = Object.keys(this.inputRefs).filter(i => regex.test(i))
        if (Array.isArray(value) && keyValueSelectors.length) {
            return await Promise.all(keyValueSelectors.map(async keyValueSelector => {
                let valueItem = selectFromObject(keyValueSelector.replace(selector, ''), value)
                const input: any = this.inputRefs[keyValueSelector]
                if (!input || valueItem === undefined) return false;

                const inputProps = this.props.inputs.find(i => i.selector === keyValueSelector)
                if (inputProps?.setMutator && typeof inputProps.setMutator === "function") {
                    const mutatedValue = inputProps.setMutator(valueItem);
                    valueItem = mutatedValue !== undefined ? mutatedValue : valueItem;
                }
                return input.setValue(valueItem)
            }))
        } else {
            const input = this.inputRefs[selector]
            if (!input) return null;
            const inputProps = this.props.inputs.find(i => i.selector === selector)
            if (inputProps?.setMutator && typeof inputProps.setMutator === "function") {
                const mutatedValue = inputProps.setMutator(value);
                value = mutatedValue !== undefined ? mutatedValue : value;
            }
            return await input?.setValue(value)
        }
    }

    private async setValue(selector: string, value: any) {
        const directInput = this.props.inputs.find(i => i.selector === selector)
        if (directInput && (directInput.type === "group" || (directInput.type === "custom" && directInput.allowObject))) {
            return await this.setNormalValue(selector, value)
        }

        if (isPlainObject(value)) {
            return await this.setObjectValues(value, [selector])
        } else {
            return await this.setNormalValue(selector, value)
        }
    }

    private enqueueOperation = (operation: () => Promise<any>): Promise<any> => {
        const run = () => {
            const queued = this.setValuesQueue.then(operation);
            this.setValuesQueue = queued.then(() => undefined, () => undefined);
            return queued;
        };
        if (!this.state.isMounted) {
            return new Promise((resolve, reject) => {
                this.didMountEvent.push(() => run().then(resolve, reject));
            });
        }
        return run();
    }

    public setValues = (value: ObjectLiteral): Promise<any> => this.enqueueOperation(() => this.syncSetValues(value));

    private syncSetValues = async (value: ObjectLiteral): Promise<any> => {
        this.defaultValues = clonePlain(value);
        this.isApplyingValues = true;
        await new Promise<void>(resolve => {
            this.setState(state => ({ ...state, inInternalSettingProcess: true }), resolve);
        });

        let settingError: unknown;
        let hasSettingError = false;
        try {
            for (const selector in value) {
                await this.setValue(selector, value[selector]);
            }
        } catch (error) {
            settingError = error;
            hasSettingError = true;
        }

        await new Promise<void>(resolve => {
            this.setState(state => ({ ...state, inInternalSettingProcess: false }), resolve);
        });

        while (this.pendingVisibilityUpdates.length) {
            const updates = this.pendingVisibilityUpdates.splice(0);
            const results = await Promise.all(updates);
            const rejected = results.find(result => result.status === 'rejected');
            if (rejected?.status === 'rejected' && !hasSettingError) {
                settingError = rejected.error;
                hasSettingError = true;
            }
        }
        this.isApplyingValues = false;

        if (hasSettingError) throw settingError;
        this.props.onChange?.(this.getValues(false));
        return true;
    }

    public clear = (): Promise<any> => this.enqueueOperation(this.syncClear);

    private syncClear = async (): Promise<any> => {
        this.defaultValues = null;
        await new Promise<void>(resolve => {
            this.setState(state => ({ ...state, inInternalSettingProcess: true }), resolve);
        });
        let clearingError: unknown;
        let hasClearingError = false;
        try {
            for (const selector in this.inputRefs) {
                const input = this.inputRefs[selector];
                if (input) await input.clear();
            }
        } catch (error) {
            clearingError = error;
            hasClearingError = true;
        }
        await new Promise<void>(resolve => {
            this.setState(state => ({ ...state, inInternalSettingProcess: false }), resolve);
        });
        if (hasClearingError) throw clearingError;
        this.props.onChange?.(this.getValues(false));
        return true;
    }

    private lastVisibilityOfInputs: ObjectLiteral = {}

    private checkVisibility = (input: InputProps): boolean => {
        let visible: boolean | undefined = true;

        if (typeof input.visible === "function") {
            visible = input.visible(this.collectValues(false, true).data);
        } else {
            visible = input.visible;
        }

        const output = visible === true || visible === undefined ? true : false;

        const prev = this.lastVisibilityOfInputs[input.selector]?.now;
        if (prev !== undefined) {
            this.lastVisibilityOfInputs = { ...this.lastVisibilityOfInputs, [input.selector]: { prev, now: output } };
        } else {
            this.lastVisibilityOfInputs = { ...this.lastVisibilityOfInputs, [input.selector]: { prev, now: output } };
        }

        return output;
    }

    private onUpdateInputs = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (!this.state.inInternalSettingProcess) {
                this.setState({ ...this.state, time: new Date().getTime() }, () => {
                    this.props.onChange?.(this.getValues(false))
                    resolve(true)
                })
            } else {
                resolve(true)
            }
        })
    }

    private executeAction = async (selector: string, action: string, value?: any): Promise<any> => {
        return new Promise(async (resolve) => {
            let output;
            if (this.state.isMounted) {
                if (value !== undefined) {
                    // @ts-ignore
                    output = await this.inputRefs[`${selector}`][`${action}`](value)
                } else {
                    // @ts-ignore
                    output = await this.inputRefs[`${selector}`][`${action}`]()
                }
                resolve(output)
            } else {
                if (value !== undefined) {
                    this.didMountEvent.push(async () => {
                        // @ts-ignore
                        let output = await this.inputRefs[`${selector}`][`${action}`](value)
                        resolve(output)
                    })
                } else {
                    this.didMountEvent.push(async () => {
                        // @ts-ignore
                        let output = await this.inputRefs[`${selector}`][`${action}`]()
                        resolve(output)
                    })
                }
            }
        })
    }

    private renderInput = (input: InputProps): JSX.Element | null => {
        if (!this.checkVisibility(input)) return null;
        const { wrapper, getMutator, setMutator, ref, ...props } = input

        const actions: InputActions<any> = {
            setValue: (value: any): Promise<any> => this.executeAction(input.selector, 'setValue', value),
            getValue: (validation?: boolean): Promise<any> => this.executeAction(input.selector, 'getValue', validation),
            clear: (): Promise<any> => this.executeAction(input.selector, 'clear'),
            click: (): Promise<any> => this.executeAction(input.selector, 'click'),
            focus: (): Promise<any> => this.executeAction(input.selector, 'focus'),
            blur: (): Promise<any> => this.executeAction(input.selector, 'blur')
        };

        const refSetter = (el: Input) => {
            this.inputRefs[input.selector] = el as AnyInput;
            if (typeof ref === "function") {
                ref(el);
            } else if (ref && typeof ref === "object") {
                ref.current = el;
            }
        }

        const element = createElement(this.inputs[input.type]!, { ref: (el: Input) => refSetter(el), ...props, _call_parent_for_update: this.onUpdateInputs });
        const output = (
            <Fragment key={input.reactKey ?? input.selector}>
                {wrapper ? wrapper(element as JSX.Element, actions as InputActions) : element}
            </Fragment>
        )
        return output;
    }

    render(): JSX.Element {
        return (
            <Fragment>
                {this.props.inputs.map(this.renderInput)}
            </Fragment>
        )
    }
}
