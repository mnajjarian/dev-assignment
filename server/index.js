const express = require("express");
const cors = require("cors");
const path = require('path');
const { str } = require("./utils");
const app = express();

app.use(cors());

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



app.get("/api", (req, res) => {
  res.json(sortPackage);
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
