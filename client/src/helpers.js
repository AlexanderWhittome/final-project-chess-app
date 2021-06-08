import blackRook from "./assets/images/Chess_rdt60.png";

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
  }
};
