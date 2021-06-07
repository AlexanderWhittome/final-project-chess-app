const express = require("express");
const bodyParser = require("body-parser");
const { initialiseMongoClient, db } = require("./db");
const uuid = require("uuid").v4;
initialiseMongoClient();

const app = express();

app.use(bodyParser.json());

app.post("/game", (req, res) => {
  //generate new game id
  //add new document to game collection in mongo
  const gameId = uuid();
  const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  db().collection("games").insertOne({ _id: gameId, fen });

  res.json({
    gameId,
    fen,
  });
});

app.put("/game/:gameId", (req, res) => {
  //get fen from req payload, update mongo and send back updated fen
  res.json({
    gameId: "someid",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  });
});

//get endpoint for get game by id

app.get("/game/:gameId", (req, res) => {
  res.json({
    gameId: "someid",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

app.listen(8000, () => console.log(`Listening on port 8000`));
