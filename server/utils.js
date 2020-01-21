const fs = require('fs');
const items = process.env.HOME + '/var/lib/dpkg/status';
let str = fs.readFileSync(items, 'utf8');


const strToArr = str.trim().split(/\n\n+/);

const getPackages = () => {
  let packs = [];
  let arr = [];
  let obj = {};

  for (let i = 0; i < strToArr.length; i++) {
    const pack = strToArr[i].replace(/\s{2,}/gi, " ").split(/\n/);
    packs.push(pack);
  }
  for (let i = 0; i < packs.length; i++) {
    for (let j = 0; j < packs[i].length; j++) {
      obj[packs[i][j].split(": ")[0].replace("-", "")] = packs[i][j].split(
        ": "
      )[1];
    }
    arr.push(obj);
    obj = {};
  }
  return arr;
};

const sortPackage = getPackages().sort((a, b) =>
  a.Package.toUpperCase() < b.Package.toUpperCase() ? -1 : 1
);

const packages = getPackages();

module.exports = {
    packages
};