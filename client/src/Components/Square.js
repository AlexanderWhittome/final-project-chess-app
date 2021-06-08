import React from "react";
import styled from "styled-components";

const Square = () => {
  return <Wrapper>yes</Wrapper>;
};

const Wrapper = styled.div`
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

export default Square;
