import * as React from 'react'
import { Key } from 'ts-keycode-enum'

import { NumberUtility } from '../utilities'

export interface ITruncatedNumberProps {
    readable: boolean
    editable: boolean
    value: number | null
    numberUtility: NumberUtility
    notifyOutputChanged: () => void
}

interface ITruncatedNumberState {
    value: string
    active: boolean
}

export class TruncatedNumberComponent extends React.Component<ITruncatedNumberProps, ITruncatedNumberState> {

    private label: React.RefObject<HTMLLabelElement>
    private input: React.RefObject<HTMLInputElement>

    constructor(props: ITruncatedNumberProps) {
        super(props)

        this.label = React.createRef<HTMLLabelElement>()
        this.input = React.createRef<HTMLInputElement>()
        this.state = {
            value: props.value?.toString() || '',
            active: false,
        }
    }

    render() {
        return (
            <div className={'truncated-number' + this.getActiveClass() + this.getErrorClass()}>
                <div className={'wrapper' + this.getErrorClass()}>
                    <label
                        className={this.getLabelHiddenClass() + this.getErrorClass()}
                        onClick={this.onClick}
                        ref={this.label}
                    >
                        {this.getFormattedValue()}
                    </label>

                    <input
                        className={this.getInputHiddenClass() + this.getErrorClass()}
                        disabled={!this.props.editable}
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        value={this.state.value}
                        ref={this.input}
                    />
                </div>
            </div>
        )
    }

    getValue = (): number | null => this.props.numberUtility.tryGetValidNumber(this.state.value)

    setValue = (value: string) => {
        // Ignore NaN so the invalid text in the field is not replaced with NaN
        if (value !== 'NaN') {
            this.setState({ value })
        }
    }

    private getActiveClass = (): string => this.state.active ? ' active' : ''

    private getFormattedValue = (): string => {
        if (!this.props.readable) {
            return '***'
        }
        return this.props.numberUtility.formatNumberString(this.state.value || '')
    }

    private getLabelHiddenClass = (): string => this.state.active ? ' hidden' : ''

    private getInputHiddenClass = (): string => this.state.active ? '' : ' hidden'

    private onClick = (): void => this.setActive()

    private onFocus = (): void => this.setActive()

    private getErrorClass = (): string => this.isError() ? ' error' : ''

    private isError = (): boolean => {
        const { numberUtility } = this.props
        const { value } = this.state
        const n = numberUtility.tryGetValidNumber(value)
        return !numberUtility.isValidNumber(n)
    }

    private onBlur = (): void => {
        const value = this.props.numberUtility.removeGroupingCharacters(this.state.value || '')
        this.setState({ value, active: false, })
        this.props.notifyOutputChanged()
    }

    private onChange = (): void => {
        const value = this.input.current?.value || ''
        if (this.state.value === value) return
        return this.setState({ value })
    }

    private onKeyPress = (ev: React.KeyboardEvent): void => {
        if (ev.keyCode === Key.Enter) return this.setState({ active: false })
    }

    private setActive = () => {
        setTimeout(() => {
            this.input.current?.focus()
            this.input.current?.select()
        }, 20)
        return this.setState({ active: true })
    }
}