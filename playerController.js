const fs = require("fs");

const readFileData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./players.json", 'utf-8', (err, data) => {
        if (err) {
            reject(err);
        }

        return resolve(data);
    })
    
    });
}

const getPlayersData = async (req, res, next) => {
    const players = await readFileData();
    req.players = players;
    console.log("req.players", req.players);
    next();
}




let createPlayer = (req, res) => {
  //create a new player
  //let players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));

  const id = players[players.length - 1].id + 1; // create id of next player
  const newPlayer = Object.assign({ id: id }, req.body);
  //  newPlayer = req.body;
  console.log(newPlayer);
  players.push(newPlayer);
  fs.writeFile("./players.json", JSON.stringify(players), (err) => {
    res.status(201).json({
      status: "success",
      data: players,
    });
  });
};

let deletePlayer = (req, res) => {
  //delete player by id
  //let players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));

  const id = req.params.id;
  const player = players.find((el) => el.id === id);
  if (player === undefined) {
    return res.status(404).json({
      status: "fail",
      message: "id not exist",
    });
  }
  var index = players.findIndex((obj) => obj.id == id);
  players.splice(index, 1);

  fs.writeFile("./players.json", JSON.stringify(players), (err) => {
    res.status(200).json({
      status: "success delete",
      data: player,
    });
  });
};

let getAllPlayers = (req, res) => {
  // let players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));
  console.log("getAllPlayers", req.players);

  res.status(200).json({
    status: "success",
    data: req.players,
  });
};

let getPlayerById = (req, res) => {
  //get player by id
  //  let players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));

  const id = req.params.id;
  const player = players.find((el) => el.id === id);
  if (player === undefined) {
    return res.status(404).json({
      status: "fail",
      message: "id not exist",
    });
  }
  res.status(200).json({
    status: "success",
    data: player,
  });
};

let updatePlayer = (req, res) => {
  //updated player by id
  //let players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));

  const id = req.params.id;
  const player = players.find((el) => el.id === id);
  if (player === undefined) {
    return res.status(404).json({
      status: "fail",
      message: "id not exist",
    });
  }

  players[id].firstName = req.body.firstName;
  player.lastName = req.body.lastName;
  player.age = req.body.age;
  player.team = req.body.team;
  players[id] = player;

  fs.writeFile("./players.json", JSON.stringify(players), (err) => {
    res.status(200).json({
      status: "success",
      data: players[id],
    });
  });
};

module.exports = {
  createPlayer,
  deletePlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  readFileData
};
