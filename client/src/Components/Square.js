import React, { useState } from "react";
import styled from "styled-components";

const Square = ({
  id,
  piece,
  darkSquare,
  lightSquare,
  // isSelected,
  pieceSelected,
  setPieceSelected,
  setFen,
  square,
  file,
}) => {
  const handleCapture = () => {
    if (pieceSelected.id.toLowerCase() === "p") {
      return `${pieceSelected.file}x${square}`;
    }

    return `${pieceSelected.id.toUpperCase()}x${square}`;
  };

  const handleMove = () => {
    // if (piece) {
    //   return { move: handleCapture() };
    // }

    return {
      from: `${pieceSelected.square}`,
      to: `${square}`,

      piece:
        pieceSelected.id.toLowerCase() === "p"
          ? ""
          : pieceSelected.id.toUpperCase(),

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
      body: JSON.stringify({
        ...handleMove(),
      }),
    })
      .then((res) => res.text())
      .then((fen) => {
        console.log(fen, "goodfen");
        setFen(fen);
        setPieceSelected(null);
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
