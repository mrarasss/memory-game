const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/game/card/:number", async (req, res) => {
    const { number } = req.params;
    const randomNumbers = [];
    for (let i = 1; i <= Number(number); i++) {
        randomNumbers.push(Math.floor(Math.random() * 100) + 1);
    }

    return res.status(200).send(randomNumbers);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
