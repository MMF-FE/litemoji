# LitEmoji 🔥

js implementation of [LitEmoji](https://github.com/elvanto/litemoji)

## Installation

```
yarn add @yzfe/litemoji
```

## Usage

```ts
import * as litemoji from '@yzfe/litemoji'

console.log(litemoji.encodeShortcode('Baby you light my 🔥! 😃'))
// 'Baby you light my :fire:! :smiley:'
console.log(litemoji.encodeHtml('Baby you light my :fire:! :smiley:'))
// 'Baby you light my &#x1F525;! &#x1F603;'
console.log(litemoji.encodeUnicode('Baby you light my :fire:! :smiley:'))
// 'Baby you light my 🔥! 😃'
console.log(litemoji.removeEmoji('Baby you light my 🔥! 😃!!!'))
// 'Baby you light my ! !!!'
```

# Configuration

```ts
import * as litemoji from '@yzfe/litemoji'

// Exclude specific shortcodes when converting from unicode and HTML entities
litemoji.config('excludeShortcodes', ['mobile', 'android']))

console.log(litemoji.encodeShortcode('📱'))
// ':iphone:'
```

## Contributing

Pull requests are welcome.

## License

[MIT License](LICENSE)
