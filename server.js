const express = require("express");
const app = express();
const fs = require("fs");
const  playerRoute  = require('./playerRoute.js');

const PORT = 5002;
app.use(express.json());

app.use("/api/v1/players", playerRoute);

app.listen(PORT, () => {
    console.log(`server is running in PORT ${PORT}`);
})
