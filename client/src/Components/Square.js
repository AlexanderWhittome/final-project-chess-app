import React from "react";
import styled from "styled-components";

const Square = ({ id, piece, darkSquare, lightSquare }) => {
  return (
    <Wrapper id={id} darkSquare={darkSquare} lightSquare={lightSquare}>
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
