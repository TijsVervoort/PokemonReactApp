import React from "react";
import PokemonFilter from "../../components/PokemonFilter";
import PokemonOverview from "../../components/PokemonOverview";

function DashboardView(props) {
  const { pokemon, selectedPokemon, setSelectedPokemon } = props;

  return (
    <div className="row">
      <PokemonFilter
        pokemon={pokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      {selectedPokemon.length > 0 && <PokemonOverview {...props} />}
    </div>
  );
}

export default DashboardView;
