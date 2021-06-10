import React from "react";
import styled from "styled-components";
// import { Chess } from "chess.js";
import { getArrayOfImages } from "../helpers";
import Square from "./Square";
const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Chessboard = ({ fen, setState }) => {
  const arrayOfImages = getArrayOfImages(fen);
  let board = [];

  let counter = 0;

  for (let i = ranks.length - 1; i >= 0; i--) {
    for (let j = 0; j < files.length; j++) {
      const num = j + i;

      const id = `square-${files[j]}${ranks[i]}`;

      if (num % 2 === 0) {
        board.push(
          <Square id={id} darkSquare piece={arrayOfImages[counter]} />
        );
      } else {
        board.push(
          <Square id={id} lightSquare piece={arrayOfImages[counter]} />
        );
      }

      counter++;
    }
  }

  return <Wrapper>{board}</Wrapper>;
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 100px);
  grid-template-rows: repeat(8, 100px);
  width: 800px;
  height: 800px;

  .square {
    width: 100px;
    height: 100px;

    & img {
      height: 100%;
      width: 100%;
    }
  }

  .light-square {
    background-color: paleturquoise;
  }

  .dark-square {
    background-color: navy;
  }
`;

export default Chessboard;
