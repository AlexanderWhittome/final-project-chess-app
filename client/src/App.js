import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chessboard from "./Components/Chessboard";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000/");

function App() {
  const [gameState, setGameState] = useState({});
  const [clickedSquare, setClickedSquare] = useState({});
  const [blockUserInput, setBlockUserInput] = useState(false);
  const [error, setError] = useState(null);
  const [isRestarting, setIsRestarting] = useState(true);
  const {
    fen,
    checkmate,
    stalemate,
    threefoldRepetition,
    insufficientMaterial,
  } = gameState;
  const isWhitesTurn = !!fen && fen.split(" ")[1] === "w";

  const selectedSquare = clickedSquare.startingSquare || null;

  const handleRestart = () => {
    return setIsRestarting(true);
  };

  useEffect(() => {
    console.log(gameState, "game state");
  }, [gameState]);

  useEffect(() => {
    if (!isRestarting) {
      return;
    }

    setIsRestarting(false);
    fetch("/game", { method: "POST" })
      .then((res) => res.text())
      .then((fen) => {
        setGameState({ fen });

        socket.emit("move", fen);
      });
  }, [isRestarting]);

  if (!fen) {
    return <div>please wait</div>;
  }

  return (
    <Wrapper>
      <Chessboard
        socket={socket}
        setGameState={setGameState}
        fen={fen}
        selectedSquare={selectedSquare}
      />
      {error && <div>{error}</div>}
      {checkmate && <h1 className="checkmate">Checkmate</h1>}
      {stalemate && (
        <h1 className="stalemate">Stalemate. Game ends in a draw</h1>
      )}
      {threefoldRepetition && (
        <h1 className="threefoldRepetition">
          Threefold repetition. Game ends in a draw
        </h1>
      )}
      {insufficientMaterial && (
        <h1 className="threefoldRepetition">
          Insufficient material. Game ends in a draw
        </h1>
      )}
      <div className="whose-move">
        {isWhitesTurn ? "White to move" : "Black to move"}
      </div>
      <button onClick={handleRestart} className="restart">
        Restart game
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  background-color: darkslategray;

  .whose-move {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Courier New", Courier, monospace;
    font-size: 24px;
    margin-top: 10px;
    font-weight: bold;
  }

  .restart {
    position: absolute;
    background-color: limegreen;
    top: 10px;
    left: 10px;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
    margin-left: 10px;
    font-weight: bold;
  }

  .checkmate,
  .stalemate,
  .threefoldRepetition,
  .insufficientMaterial {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    font-size: 36px;
  }
`;

export default App;
