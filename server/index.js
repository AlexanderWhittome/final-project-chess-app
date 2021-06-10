const { Chess } = require("chess.js");
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid").v4;
const { initialiseMongoClient, db } = require("./db");

initialiseMongoClient();

const chess = new Chess();

const app = express();

app.use(bodyParser.json());

app.post("/game", (req, res) => {
  //generate new game id
  //add new document to game collection in mongo

  const fen = chess.fen();

  db().collection("games").insertOne({ fen });

  res.send(fen);
});

app.put("/game/move", (req, res) => {
  const { startingSquare, endingSquare } = req.body;
  console.log(startingSquare, endingSquare);
  chess.move(`${startingSquare}-${endingSquare}`, { sloppy: true });

  // chess.move("e4");
  // chess.move("e5");
  // chess.move("Nf3");
  // chess.move("Nc6");
  // chess.move("Bc4");
  // chess.move("a8-b8", { sloppy: true });
  // chess.move("e1-e2", { sloppy: true });
  // chess.move("g8-e6", { sloppy: true });

  res.send(chess.fen());
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

app.listen(8000, () => console.log(`Listening on port 8000`));
