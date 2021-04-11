export type NumberUtilityOptions = {
    maxValue: number,
    minValue: number,
    precision: number,
    decimalSeparator: string,
    groupSeparator: string,
    groupSize: number,
}

export class NumberUtility {
    constructor(private options: NumberUtilityOptions) { }

    formatNumberString = (s: string): string => {
        if (s !== null && s !== '') {
            const cleaned = this.removeGroupingCharacters(s)
            const n = parseFloat(cleaned)
            if (!isNaN(n)) return this.formatNumber(n)
            return s // Return the invalid string
        }
        return '---'
    }

    removeGroupingCharacters = (s: string): string => {
        if (!s) return ''
        const isNegative = s.indexOf('-') > -1
        s = s.replace(/-/g, '')
        while (s.indexOf(this.options.groupSeparator) !== -1) {
            s = s.replace(this.options.groupSeparator, '')
        }
        if (isNegative) {
            s = '-' + s
        }
        return s
    }

    tryGetValidNumber = (s: string): number | null => {
        if (s === '') return null
        let n = parseFloat(s)
        if (!isNaN(n)) n = this.round(n, this.options.precision)
        return n
    }

    isValidNumber = (n: number | null): boolean => {
        return n === null || !isNaN(n) && n >= this.options.minValue && n <= this.options.maxValue
    }

    private formatNumber = (n: number): string => {
        n = this.round(n, this.options.precision)
        if (isNaN(n)) return '---'

        const str = n.toString()
        const parts = str.split(this.options.decimalSeparator)

        parts[0] = this.addNumberGrouping(parts[0])

        if (parts[1]) parts[1] = parts[1].substring(0, this.options.precision)

        return parts.join(this.options.decimalSeparator)
    }

    private addNumberGrouping = (s: string): string => {
        if (s.indexOf('e') > -1 || s.indexOf('E') > -1) return s

        const isNegative = s.indexOf('-') > -1
        s = s.replace(/-/g, '')

        const reverse = this.reverseString(s)

        let result = ''
        for (let i = 0; i < reverse.length; i++) {
            result += reverse.charAt(i)
            if ((i + 1) % this.options.groupSize === 0 && (i + 1) !== reverse.length) {
                result += this.options.groupSeparator
            }
        }
        return (isNegative ? '-' : '') + this.reverseString(result)
    }

    private reverseString = (s: string) => s.split('').reverse().join('')

    private round = (n: number, digits?: number): number => parseFloat(n.toFixed(digits))
}