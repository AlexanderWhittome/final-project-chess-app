import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Chessboard from "./Components/Chessboard";
import { GameContext } from "./GameProvider";

function App() {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    fetch("/game", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "new-game-created",
          payload: { gameId: data.gameId, fen: data.fen },
        });
      })
      .catch((error) => {
        dispatch({
          type: "error-occured",
          payload: { error },
        });
      });
  }, []);

  console.log(state);

  return (
    <Wrapper>
      <Chessboard />
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
