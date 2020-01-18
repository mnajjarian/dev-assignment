const fs = require('fs');
const items = './status.real';
let str = fs.readFileSync(items, 'utf8');

module.exports = {
    str
};