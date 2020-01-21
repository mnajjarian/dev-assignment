const express = require("express");
const cors = require("cors");
const path = require('path');
const { packages } = require("./utils");
const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.json(packages);
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