const express = require("express");
const { str } = require("./utils");
const app = express();

//const string = str.replace("^\\s+","")

const onePack = str.trim().split(/\n\n+/);

const packages = onePack[0].replace(/\s{2,}/gi, ' ').split(/\n/)[10].split(': ')

const arr = packages;

const splitter = item => item.split('/\w:/');

const sortPack = () => {
    let packs = []
    let arr = []
    let obj = {}
    const checkArray = (obj) => arr.filter(p => p.package !== obj);
    for(let i = 0; i < onePack.length; i++) {
        const pack = onePack[i].replace(/\s{2,}/gi, ' ').split(/\n/)
        packs.push(pack)
    }
    for(let i = 0; i < packs.length; i++) {
        for(let j = 0; j < packs[i].length; j++) {
            obj[packs[i][j].split(': ')[0].replace('-', '')] = packs[i][j].split(': ')[1]
        }
        arr.push(obj)
        obj = {}
    }
    return arr
}

const packObj = sortPack();
app.get("/", (req, res) => {
  res.json(packObj)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
