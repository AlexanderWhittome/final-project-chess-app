import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chessboard from "./Components/Chessboard";

const EMPTY_BOARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const getIndexFromClickEvent = (e) => {
  const [square, index] = e.target.id.split("-");

  if (square === "square") {
    return parseInt(index);
  } else {
    const [innerSquare, innerIndex] = e.target.parentElement.id.split("-");

    if (innerSquare === "square") {
      return parseInt(innerIndex);
    }
  }
};

function App() {
  const [state, setState] = useState({ isLoading: true });
  const [action, setAction] = useState({});
  useEffect(() => {
    fetch("/game", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setState({ gameId: data.gameId, fen: data.fen, isLoading: false });

        document.addEventListener("mousedown", (e) => {
          e.preventDefault();
          const index = getIndexFromClickEvent(e);
          // console.log(index, "mousedown");

          if (typeof index !== "number") {
            return;
          }
          setAction({ startingSquare: index });
        });

        document.addEventListener("mouseup", (e) => {
          const index = getIndexFromClickEvent(e);
          // console.log(index, "mouseup");
          if (typeof index !== "number") {
            return;
          }
          setAction((currentVal) => {
            if (typeof index !== "number") {
              return {};
            }

            return { ...currentVal, endingSquare: index };
          });
        });
      })
      .catch((error) => {
        setState({ error, isLoading: false });
      });
  }, []);

  useEffect(() => {
    if (!action.startingSquare || !action.endingSquare) {
      return;
    }

    fetch("/game/move", {
      header: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        startingSquare: action.startingSquare,
        endingSquare: action.endingSquare,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setState({ gameId: data.gameId, fen: data.fen, isLoading: false });
      });

    console.log(action, "action");
  }, [action]);

  if (state.error || (!state.isLoading && !state.fen)) {
    return <div>{state.error || "something went wrong"}</div>;
  }

  if (state.isLoading) {
    return <div>please wait</div>;
  }

  return (
    <Wrapper>
      <Chessboard fen={state.fen} />
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
