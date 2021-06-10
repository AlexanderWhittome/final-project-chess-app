import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chessboard from "./Components/Chessboard";

const EMPTY_BOARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

// const getIndexFromClickEvent = (e) => {
//   const [square, index] = e.target.id.split("-");

//   if (square === "square") {
//     return parseInt(index);
//   } else {
//     const [innerSquare, innerIndex] = e.target.parentElement.id.split("-");

//     if (innerSquare === "square") {
//       return parseInt(innerIndex);
//     }
//   }
// };

function App() {
  const [fen, setFen] = useState(null);
  const [clickedSquare, setClickedSquare] = useState({});
  const [blockUserInput, setBlockUserInput] = useState(false);

  const handleClick = (e) => {
    // need to get which square from event and then do
    e.stopPropagation();

    const squareThatWasClickOn = "a8"; // need to figure this out from "e"

    setClickedSquare({ startingSquare: "e2", endingSquare: "e4" });

    // setClickedSquare((current) => {
    //   if (!current.startingSquare) {
    //     return { startingSquare: squareThatWasClickOn };
    //   } else {
    //     return { ...current, endingSquare: squareThatWasClickOn };
    //   }
    // });
    console.log(e.target, "target");
  };

  useEffect(() => {
    fetch("/game", { method: "POST" })
      .then((res) => res.text())
      .then((fen) => {
        setFen(fen);
        console.log(fen, "fen");
        document.addEventListener("click", handleClick);
      });
  }, []);

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
      .then((res) => res.text())
      .then((fen) => {
        console.log("THE FEN,", fen);
        setFen(fen);
        setBlockUserInput(false);
      });
  }, [clickedSquare, blockUserInput]);

  if (!fen) {
    return <div>please wait</div>;
  }

  return (
    <Wrapper>
      <Chessboard fen={fen} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  background-color: darkslategray;
`;

export default App;
