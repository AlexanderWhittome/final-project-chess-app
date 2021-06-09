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

//get endpoint for get game by id

app.get("/game/:gameId", (req, res) => {
  console.log("asd");
  res.json({
    gameId: "someid",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  });
});

app.put("/game/move", (req, res) => {
  const { startingSquare, endingSquare } = req.body;
  console.log("asd");
  console.log(req.body);
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
