const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const { getFromZipCloud } = require("./api/api.js");

// CORSを有効に
app.use(cors()); 

// ミドルウェア
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

app.get("/zip", async (req, res) => {
  const { zipcode } = req.query;
  try {
    const data = await getFromZipCloud(zipcode);
    console.log("server側 data:", data)
    res.send(data);
  } catch (error) {
    console.error("Failed to getFromZipCloud", error.message);
    res.send(error.message);
  }
});
