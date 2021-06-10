const { Chess } = require("chess.js");
const express = require("express");
const bodyParser = require("body-parser");
const { initialiseMongoClient, db } = require("./db");
const uuid = require("uuid").v4;
initialiseMongoClient();

const app = express();

app.use(bodyParser.json());
const chess = new Chess();
app.post("/game", (req, res) => {
  //generate new game id
  //add new document to game collection in mongo

  const fen = chess.fen();

  const gameId = uuid();
  db().collection("games").insertOne({ _id: gameId, fen });

  res.json({
    gameId,
    fen,
  });
});

//get endpoint for get game by id

app.get("/game/:gameId", (req, res) => {
  console.log("asd");
  res.json({
    gameId: "someid",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  });
});

app.post("/game/move", (req, res) => {
  const { startingSquare, endingSquare, coordinates } = req.body;

  chess.move("e4");
  chess.move("e5");
  chess.move("Nf3");
  chess.move("Nc6");
  chess.move("Bc4");
  chess.move("Qc7");
  console.log("asd");
  console.log(req.body);
  res.json({
    gameId: "someid",
    fen: chess.fen(),
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

app.listen(8000, () => console.log(`Listening on port 8000`));
