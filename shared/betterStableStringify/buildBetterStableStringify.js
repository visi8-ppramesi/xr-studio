const types = ['nodejs', 'browser']
const path = require('path'), fs = require('fs')
const filePath = path.resolve('shared', 'betterStableStringify', 'betterStableStringify.js')
const script = fs.readFileSync(filePath, 'utf8')

types.forEach((type) => {
    if(type === 'nodejs'){
        const formattedScript = script.replace(/^\/\/browser\s(.+\s)+\/\/browser end$/gm, '')
        const filePath = path.resolve('shared', 'betterStableStringify', 'nodejs', 'betterStableStringify.js')
        fs.writeFileSync(filePath, formattedScript)
    }else if(type === 'browser'){
        const formattedScript = script.replace(/^\/\/nodejs\s(.+\s)+\/\/nodejs end$/gm, '')
        const filePath = path.resolve('shared', 'betterStableStringify', 'browser', 'betterStableStringify.js')
        fs.writeFileSync(filePath, formattedScript)
    }
})
process.exit(0)