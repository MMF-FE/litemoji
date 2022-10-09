const litemoji = require('../dist')


console.log(litemoji.encodeUnicode('Baby you :mobile: :android: :+1: :globe_with_meridians: :haiti: light my :fire:! :smiley: :smiley:  :smiley::smiley::smiley:') )

console.log(litemoji.encodeShortcode('Baby you light my 📱 🔥 🔥 🔥! 😃'))

console.log(litemoji.encodeHtml('Baby you light my :fire:! :smiley:'))

console.log(litemoji.removeEmoji('Baby you light my 🔥! 😃!!!'))


console.log(litemoji.encodeShortcode('📱'))
litemoji.config('excludeShortcodes', ['mobile', 'android'])
console.log(litemoji.encodeShortcode('📱'))
