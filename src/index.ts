import shortCodes from './shortcodes'
import pack from './pack'
import iconv from 'iconv-lite'

// @ts-ignore
iconv.skipDecodeWarning = true

function hexdec(hexString: string) {
    hexString = String(hexString).replace(/[^a-f0-9]/gi, '')
    return parseInt(hexString, 16)
}

type CovFun = (content: string) => string

const emojiMatchList: CovFun[] = []
const htmlMatchList: CovFun[] = []
const removeMatchList: CovFun[] = []

const _excludeShortcodes: string[] = []

/**
 * config
 * @param key 
 * @param value 
 */
export function config(key: string, value: string[]) {
    switch (key) {
        case 'excludeShortcodes':
            value.forEach(v => {
                if (!_excludeShortcodes.includes(v)) {
                    _excludeShortcodes.push(`:${v}:`)
                }
            })
            break
        default:
            console.warn('Unknown key:', key)
    }
}

/**
 * load dict and init function
 */
const shortCodesMatchList: CovFun[] = Object.keys(shortCodes).map((k) => {
    const codes = shortCodes[k as keyof typeof shortCodes].split('-')
    const key = `:${k}:`

    const code = codes
        .map((v) => {
            const s = pack(hexdec(v))
            // @ts-ignore
            return iconv.decode(s, 'UTF-32BE')
        })
        .join('')

    const htmlCode = codes.map((v) => `&#x${v};`).join('')

    htmlMatchList.push((content: string) => {
        if (!_excludeShortcodes.includes(key) && content.includes(key)) {
            return content.replaceAll(key, htmlCode)
        }
        return content
    })

    emojiMatchList.push((content: string) => {
        if (!_excludeShortcodes.includes(key) && content.includes(code)) {
            return content.replaceAll(code, key)
        }
        return content
    })

    removeMatchList.push((content: string) => {
        if (!_excludeShortcodes.includes(key) && content.includes(code)) {
            return content.replaceAll(code, '')
        }
        return content
    })

    return (content: string) => {
        if (!_excludeShortcodes.includes(key) && content.includes(key)) {
            return content.replaceAll(key, code)
        }
        return content
    }
})

export function encodeUnicode(content: string) {
    let out = content
    shortCodesMatchList.forEach((cov) => (out = cov(out)))
    return out
}

export function encodeShortcode(content: string) {
    let out = content
    emojiMatchList.forEach((cov) => (out = cov(out)))
    return out
}

export function encodeHtml(content: string) {
    let out = content
    htmlMatchList.forEach((cov) => (out = cov(out)))
    return out
}

export function removeEmoji(content: string) {
    let out = content
    removeMatchList.forEach((cov) => (out = cov(out)))
    return out
}
