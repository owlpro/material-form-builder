import { PickerChangeHandlerContext, TimeValidationError } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';
import { Component, MouseEvent } from "react";
import { mergeSlot, stringify, withLegacySlotProps } from 'src/helpers/general';
import { InputImplement } from '../../types';
import { TimeInputProps, TimeInputValueType } from './types';


interface IState {
    value: TimeInputValueType,
    error: boolean
}

export class TimeInput extends Component<TimeInputProps, IState> implements InputImplement<TimeInputValueType> {
    state: IState = {
        value: this.props.defaultValue || null,
        error: false
    }

    validationTimeout: any;

    shouldComponentUpdate(nextProps: TimeInputProps, nextState: IState) {
        switch (true) {
            case this.state.value !== nextState.value:
            case this.state.error !== nextState.error:
            case stringify(nextProps?.updateListener ?? {}) !== stringify(this.props?.updateListener ?? {}):
                return true;
            default: return false;
        }
    }

    setValue(value: TimeInputValueType, disableOnChangeEvent?: boolean): Promise<TimeInputValueType> {
        if (value === this.state.value) return Promise.resolve(value)

        return new Promise((resolve) => {
            this.setState({ ...this.state, value }, () => {
                if (!disableOnChangeEvent) this.props._call_parent_for_update?.()
                this.props.onChangeValue?.(value as TimeInputValueType)
                resolve(value)
            })
        })
    }

    getValue(): TimeInputValueType {
        return this.state.value || null;
    }

    clear(): Promise<TimeInputValueType> {
        return this.setValue(this.props.defaultValue || null)
    }

    validation(): boolean {
        if (!this.state.value && this.props.required) {
            clearTimeout(this.validationTimeout)
            this.setState({ ...this.state, error: true })
            this.validationTimeout = setTimeout(() => {
                this.setState({ ...this.state, error: false })
            }, 3000)
            return false;
        }
        return true;
    }

    onChange = (value: Dayjs | null, context: PickerChangeHandlerContext<TimeValidationError>) => {
        // let value = inputValue && inputValue.toDate ? inputValue.toDate() : inputValue;
        this.setValue(value || null).then(() => {
            this.props.onChange?.(value, context)
        })
    };

    private onClick = (event: MouseEvent<HTMLDivElement>) => {
        clearTimeout(this.validationTimeout)
        this.setState({ ...this.state, error: false })
        this.props.InputProps?.onClick?.(event)
    }

    inputRef: HTMLInputElement | null | undefined;

    public click = () => {
        this.inputRef?.click()
    }

    public focus = () => {
        this.inputRef?.focus()
    }

    public blur = () => {
        // the focused element is a section next to the hidden input, not the input itself
        const active = document.activeElement
        if (active instanceof HTMLElement && this.inputRef?.parentElement?.contains(active)) active.blur()
    }


    render() {
        const { slotProps, fullWidth, updateListener, selector, type, defaultValue, onChangeValue, variant, required, visible, _call_parent_for_update, dateAdapter, InputProps, ...restProps } = this.props;
        const { textField: textFieldSlotProps, ...restSlotProps } = slotProps ?? {};
        const fieldProps = withLegacySlotProps(InputProps ?? {});
        return (
            <TimePicker
                {...restProps}
                ampm={this.props.ampm || false}
                value={this.state.value}
                onChange={this.onChange}
                inputRef={el => { this.inputRef = el }}
                slotProps={{
                    ...restSlotProps,
                    textField: mergeSlot(
                        mergeSlot({ fullWidth: fullWidth ?? false, variant: variant ?? "standard", required: required ?? false, ...fieldProps }, textFieldSlotProps),
                        { error: this.state.error, onClick: this.onClick }
                    )
                }}
            />
        )
    }
}