import React, { useState, useEffect } from "react";

const filterPokemon = (pokemon, filterValue) => {
  return pokemon.filter((item) =>
    item?.name?.toLowerCase().includes(filterValue?.toLowerCase())
  );
};

function PokemonFilter({ pokemon, setSelectedPokemon }) {
  const [filterValue, setFilterValue] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState("");

  useEffect(() => {
    setFilteredPokemon(filterPokemon(pokemon, filterValue));
  }, [pokemon, filterValue]);

  return (
    <div className="filterColumn">
      <h1 className="primaryTitle">Select a Pokemon</h1>
      <input
        className="inputField"
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
        value={filterValue}
      />

      <ul className="list">
        {filteredPokemon &&
          filteredPokemon.map(({ id, name }) => (
            <li
              className="listItem"
              key={id}
              onClick={() => setSelectedPokemon(name)}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PokemonFilter;
