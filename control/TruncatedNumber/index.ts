import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { TruncatedNumberComponent, ITruncatedNumberProps } from './components'
import { NumberUtility } from './utilities'

import { IInputs, IOutputs } from './generated/ManifestTypes'

export class TruncatedNumber implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private truncatedNumberComponent: TruncatedNumberComponent
    private container: HTMLDivElement

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        // Add control initialization code

        const contextValues = this.getValuesFromContext(context)
        const numberUtility = new NumberUtility({ ...contextValues })
        const props: ITruncatedNumberProps = {
            ...contextValues,
            numberUtility,
            notifyOutputChanged,
        }

        this.truncatedNumberComponent = ReactDOM.render(
            React.createElement(
                TruncatedNumberComponent,
                props
            ),
            container
        )
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.truncatedNumberComponent.setValue(context.parameters.value.raw?.toString() || '')
    }

    public getOutputs(): IOutputs {
        return {
            value: this.truncatedNumberComponent.getValue() ?? undefined,
        }
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container)
    }

    private getValuesFromContext = (context: ComponentFramework.Context<IInputs>): IContextValues => {
        const value = context.parameters.value.raw

        const { editable, readable } = context.parameters.value.security || { editable: true, readable: true }

        const { numberDecimalSeparator, numberGroupSeparator, numberGroupSizes } = context.userSettings.numberFormattingInfo

        const { MaxValue, MinValue } = context.parameters.value.attributes || { MaxValue: 0, MinValue: 0 }

        const precision = (context.parameters.value.attributes as any).Precision || 4

        return {
            editable,
            readable,
            value,
            decimalSeparator: numberDecimalSeparator,
            groupSeparator: numberGroupSeparator,
            groupSize: numberGroupSizes[0],
            maxValue: MaxValue,
            minValue: MinValue,
            precision,
        }
    }
}

interface IContextValues {
    value: number | null
    editable: boolean
    readable: boolean
    decimalSeparator: string
    groupSeparator: string
    groupSize: number
    maxValue: number
    minValue: number
    precision: number
}