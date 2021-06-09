import blackRook from "./assets/images/Chess_rdt60.png";
import whiteRook from "./assets/images/Chess_rlt60.png";
import blackBishop from "./assets/images/Chess_bdt60.png";
import whiteBishop from "./assets/images/Chess_blt60.png";
import blackKnight from "./assets/images/Chess_ndt60.png";
import whiteKnight from "./assets/images/Chess_nlt60.png";
import blackKing from "./assets/images/Chess_kdt60.png";
import whiteKing from "./assets/images/Chess_klt60.png";
import blackQueen from "./assets/images/Chess_qdt60.png";
import whiteQueen from "./assets/images/Chess_qlt60.png";
import blackPawn from "./assets/images/Chess_pdt60.png";
import whitePawn from "./assets/images/Chess_plt60.png";
export const getArrayOfImages = (fen) => {
  console.log(fen, "asdasdasdasd");

  let arr = [];
  fen
    .split("/")
    .join("")
    .split("")
    .forEach((e) => {
      const num = parseInt(e);
      console.log(num);
      if (num) {
        for (let i = 0; i < num; i++) {
          arr.push(null);
        }
      } else {
        console.log("taco");
        arr.push(getImageFromCharacter(e));
      }
    });
  console.log(arr);
  return arr;
};

const getImageFromCharacter = (char) => {
  switch (char) {
    case "r":
      return blackRook;
    case "R":
      return whiteRook;
    case "n":
      return blackKnight;
    case "N":
      return whiteKnight;
    case "b":
      return blackBishop;
    case "B":
      return whiteBishop;
    case "q":
      return blackQueen;
    case "Q":
      return whiteQueen;
    case "k":
      return blackKing;
    case "K":
      return whiteKing;
    case "p":
      return blackPawn;
    case "P":
      return whitePawn;
  }
};
