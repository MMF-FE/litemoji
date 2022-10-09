/**
 * 同步 litemoji shortcodes
 */
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const targetUrl =
    'https://raw.githubusercontent.com/elvanto/litemoji/master/src/shortcodes-array.php'
const outFile = path.join(__dirname, '../src/shortcodes.ts')

fetch(targetUrl)
    .then((res) => res.text())
    .then((phpCode) => {
        let code = String(phpCode)
            .replace('<?php', '')
            .replace(/ =>/g, ':')
            .replace(';', '')
            .replace('return ', '')
            .replace('[', '{')
            .replace(']', '}')
            // .replace(/\+/g, '\\\\+')

        code = `export default ${code.trim()}`

        fs.writeFileSync(outFile, code, 'utf8')
        console.log('sync done')
    })
