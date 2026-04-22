import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const [challenges, setChallenges] = useState({
    taps: 0,
    doubleTaps: 0,
    longPress: false,
    dragged: false,
    swipeRight: false,
    swipeLeft: false,
    pinch: false,
    tripleTap: false, 
  });

  const [darkMode, setDarkMode] = useState(false);

  const addScore = (value) => {
    setScore((prev) => prev + value);
  };

  return (
    <GameContext.Provider
      value={{
        score,
        addScore,
        challenges,
        setChallenges,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);