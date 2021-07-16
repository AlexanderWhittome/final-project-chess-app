import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Square = ({
  socket,
  id,
  piece,
  darkSquare,
  lightSquare,
  // isSelected,
  pieceSelected,
  setPieceSelected,
  setGameState,
  square,
  file,
}) => {
  useEffect(() => {
    socket.on("send move", (fen) => {
      setGameState({ fen });
      console.log(fen, "fen");
    });
  }, []);

  const handleMove = () => {
    const isPawn = pieceSelected.id.toLowerCase() === "p";
    let promotion;
    if (isPawn && (square[1] === "8" || square[1] === "1")) {
      promotion = "q";
    }
    console.log("square", square, promotion);
    return {
      from: `${pieceSelected.square}`,
      to: `${square}`,
      promotion,
      piece: isPawn ? "" : pieceSelected.id.toUpperCase(),

      captured: piece,
    };
  };

  const handlePieceClick = () => {
    if (!piece && !pieceSelected) {
      return;
    }

    if (!pieceSelected) {
      return setPieceSelected({ id: piece.pieceId, file, square });
    }

    fetch("/game/move", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(handleMove()),
    })
      .then((res) => res.json())
      .then((data) => {
        const { fen } = data;
        console.log(data, "data");
        setGameState(data);
        setPieceSelected(null);

        socket.emit("move", fen);
      });
  };

  return (
    <Wrapper
      onClick={handlePieceClick}
      id={id}
      darkSquare={darkSquare}
      lightSquare={lightSquare}
      isSelected={
        pieceSelected &&
        pieceSelected.id &&
        piece &&
        pieceSelected.square === square
      }
    >
      {piece && <img src={piece.image} />}
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

  background-color: ${({ darkSquare, isSelected }) => {
    if (isSelected) {
      return "red";
    }

    return darkSquare ? "salmon" : "paleturquoise";
  }};
`;

export default Square;
