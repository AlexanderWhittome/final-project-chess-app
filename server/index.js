const { Chess } = require("chess.js");
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid").v4;
const { initialiseMongoClient, db } = require("./db");

initialiseMongoClient();

let chess = new Chess();

const app = express();

app.use(bodyParser.json());

app.post("/game", (req, res) => {
  //generate new game id
  //add new document to game collection in mongo
  chess = new Chess();
  const fen = chess.fen();
  console.log(fen, "server fen");
  db().collection("games").insertOne({ fen });

  res.send(fen);
});

app.put("/game/move", (req, res) => {
  try {
    const { move, from, to, piece, captured, promotion } = req.body;
    const moves = move ? move : { from, to, piece, captured, promotion };
    console.log(moves);
    chess.move(moves);
    console.log(move, "move");
    res.json({
      fen: chess.fen(),
      checkmate: chess.in_checkmate(),
      stalemate: chess.in_stalemate(),
      threefoldRepetition: chess.in_threefold_repetition(),
      insufficientMaterial: chess.insufficient_material(),
    });
  } catch (error) {
    console.log("ERROR!!!", error);

    res.status(500).end();
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

app.listen(8000, () => console.log(`Listening on port 8000`));
