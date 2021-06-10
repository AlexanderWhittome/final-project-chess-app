import React from "react";
import styled from "styled-components";

const Square = ({
  coordinates,
  piece,
  counter,
  darkSquare,
  lightSquare,
  setState,
}) => {
  const movePiece = () => {
    fetch("/game/move", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ coordinates }),
    })
      .then((res) => res.json())
      .then((data) => setState({ fen: data.fen }));

    console.log(coordinates, "move piece");
  };

  return (
    <Wrapper
      darkSquare={darkSquare}
      lightSquare={lightSquare}
      onClick={movePiece}
    >
      {piece && <img src={piece} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100px;
  height: 100px;

  & img {
    height: 100%;
    width: 100%;
  }

  background-color: ${({ darkSquare }) =>
    darkSquare ? "salmon" : "paleturquoise"};
`;

export default Square;
