import React from "react";
import styled from "styled-components";

const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Chessboard = () => {
  let board = [];

  for (let i = ranks.length - 1; i >= 0; i--) {
    for (let j = 0; j < files.length; j++) {
      const num = j + i + 2;

      if (num % 2 === 0) {
        board.push(<div className="square dark-square"></div>);
      } else {
        board.push(<div className=" square light-square"></div>);
      }
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
  }

  .light-square {
    background-color: paleturquoise;
  }

  .dark-square {
    background-color: navy;
  }
`;

export default Chessboard;
