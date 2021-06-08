import React, { useReducer } from "react";

export const GameContext = React.createContext(null);

const EMPTY_BOARD = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const initialState = {
  gameId: "",
  fen: EMPTY_BOARD,
  error: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "new-game-created":
      return {
        ...state,
        gameId: payload.gameId,
        fen: payload.fen,
      };

    case "error-occured":
      return {
        ...state,
        error: payload.error,
        fen: EMPTY_BOARD,
      };
  }
};

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
