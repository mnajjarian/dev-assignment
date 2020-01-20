const fs = require('fs');
const items = process.env.HOME + '/status.real' || './status.real';
let str = fs.readFileSync(items, 'utf8');

module.exports = {
    str
};