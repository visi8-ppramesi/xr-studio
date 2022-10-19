const path = require('path')
const fs = require('fs')

const map = JSON.parse(fs.readFileSync(path.resolve('mapping', 'map.json'), 'utf-8') || '{}')

module.exports = map