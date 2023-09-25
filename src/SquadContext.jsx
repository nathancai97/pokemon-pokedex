import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const SquadContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSquadContext = () => {
  const context = useContext(SquadContext);
  if (!context) {
    throw new Error("useSquadContext must be used within a SquadProvider");
  }
  return context;
};

export const SquadProvider = ({ children }) => {
  const [squad, setSquad] = useState([]);

  const addToSquad = (pokemon) => {
    // Check if the pokemon is already in the squad
    if (squad.length < 6 && !squad.some((p) => p.id === pokemon.id)) {
      const newSquad = [...squad, pokemon];
      setSquad(newSquad);
      // Store the updated squad in local storage
      localStorage.setItem('pokemonSquad', JSON.stringify(newSquad));
    }
  };

  // When initializing the squad (e.g., in a useEffect)
  useEffect(() => {
    // Retrieve the squad data from local storage
    const storedSquad = JSON.parse(localStorage.getItem("pokemonSquad"));
    if (storedSquad) {
      setSquad(storedSquad);
    }
  }, []);

  const removeFromSquad = (pokemon) => {
    const updatedSquad = squad.filter((p) => p !== pokemon);
    setSquad(updatedSquad);
  };

  const isBattleEnabled = squad.length >= 2;

  return (
    <SquadContext.Provider
      value={{ squad, addToSquad, removeFromSquad, isBattleEnabled }}
    >
      {children} {/* Include children prop */}
    </SquadContext.Provider>
  );
};

SquadProvider.propTypes = {
  children: PropTypes.node.isRequired, // PropTypes validation for children prop
};
