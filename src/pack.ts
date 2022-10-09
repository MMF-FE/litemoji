function pack(...args: number[]) {
    const format = 'N'

    let formatPointer = 0
    let argumentPointer = 0
    let result = ''
    let i = 0
    let instruction
    let quantifier: number | string

    while (formatPointer < format.length) {
        instruction = format.charAt(formatPointer)
        quantifier = ''
        formatPointer++
        while (
            formatPointer < format.length &&
            format.charAt(formatPointer).match(/[\d*]/) !== null
        ) {
            quantifier += format.charAt(formatPointer)
            formatPointer++
        }
        if (quantifier === '') {
            quantifier = '1'
        }

        if (quantifier === '*') {
            quantifier = args.length - argumentPointer
        }
        if (quantifier > args.length - argumentPointer) {
            throw new Error(
                'Warning:  pack() Type ' + instruction + ': too few args'
            )
        }

        for (i = 0; i < quantifier; i++) {
            result += String.fromCharCode(
                (args[argumentPointer] >> 24) & 0xff
            )
            result += String.fromCharCode(
                (args[argumentPointer] >> 16) & 0xff
            )
            result += String.fromCharCode(
                (args[argumentPointer] >> 8) & 0xff
            )
            result += String.fromCharCode(
                args[argumentPointer] & 0xff
            )
            argumentPointer++
        }
    }
    if (argumentPointer < args.length) {
        const msg2 =
            'Warning: pack(): ' +
            (args.length - argumentPointer) +
            ' args unused'
        throw new Error(msg2)
    }

    return result
}

export default pack
