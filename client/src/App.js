import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chessboard from "./Components/Chessboard";

const EMPTY_BOARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const getSquareFromClickEvent = (e) => {
  const [kind, squareName] = e.target.id.split("-");

  if (kind === "square") {
    return { squareName, isPiece: false };
  } else {
    const [innerKind, innerSquareName] = e.target.parentElement.id.split("-");

    if (innerKind === "square") {
      return { squareName: innerSquareName, isPiece: true };
    } else {
      return {};
    }
  }
};

function App() {
  const [fen, setFen] = useState(null);
  const [clickedSquare, setClickedSquare] = useState({});
  const [blockUserInput, setBlockUserInput] = useState(false);
  const [error, setError] = useState(null);
  const [isRestarting, setIsRestarting] = useState(true);

  const isWhitesTurn = !!fen && fen.split(" ")[1] === "w";

  const selectedSquare = clickedSquare.startingSquare || null;

  const handleRestart = () => {
    return setIsRestarting(true);
  };

  const handleClick = (e) => {
    // need to get which square from event and then do

    console.log(e.target);

    const { squareName, isPiece } = getSquareFromClickEvent(e); // need to figure this out from "e"

    // setClickedSquare({ startingSquare: "e2", endingSquare: "e4" });

    setClickedSquare((current) => {
      if (!current.startingSquare) {
        if (!isPiece) {
          return {};
        }
        return { startingSquare: squareName };
      } else {
        return { ...current, endingSquare: squareName };
      }
    });
  };

  // useEffect(() => {
  //   document.addEventListener("click", handleClick);
  // }, []);

  useEffect(() => {
    if (!isRestarting) {
      return;
    }

    console.log("hello");

    setIsRestarting(false);
    fetch("/game", { method: "POST" })
      .then((res) => res.text())
      .then((fen) => {
        console.log(fen, "fen");
        setFen(fen);
      });
  }, [isRestarting]);

  useEffect(() => {
    const { startingSquare, endingSquare } = clickedSquare;

    if (blockUserInput || !startingSquare || !endingSquare) {
      return;
    }

    setBlockUserInput(true);

    setClickedSquare({});

    fetch("/game/move", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        startingSquare,
        endingSquare,
      }),
    })
      .then((res) => {
        console.log("taco", res);
        if (res.ok) {
          return res.text();
        } else {
          throw "something went wrong";
        }
      })
      .then((fen) => {
        setFen(fen);
        setBlockUserInput(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [clickedSquare, blockUserInput]);

  if (!fen) {
    return <div>please wait</div>;
  }

  return (
    <Wrapper>
      <Chessboard setFen={setFen} fen={fen} selectedSquare={selectedSquare} />
      {error && <div>{error}</div>}
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
`;

export default App;
