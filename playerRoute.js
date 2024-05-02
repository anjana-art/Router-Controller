const express = require("express");
const fs = require('fs');
const playerRoute = express.Router();
const playerController = require("./playerController");
const {getPlayersData, readFileData, getAllPlayers} = require("./playerController")

playerRoute.get("", getPlayersData, getAllPlayers);
playerRoute.post("/api/v1/players", getPlayersData, playerController.createPlayer);
playerRoute.get("/api/v1/players/:id", getPlayersData, playerController.getPlayerById);
playerRoute.patch("/api/v1/players/:id", getPlayersData, playerController.updatePlayer);
playerRoute.delete("/api/v1/players/:id", getPlayersData, playerController.deletePlayer);

module.exports = {
    playerRoute
}