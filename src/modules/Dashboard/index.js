import React, { useState } from "react";
import { useQuery } from "graphql-hooks";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import DashboardView from "./dashboardView";

const POKEMON_LIST_QUERY = `query Pokemons($first: Int) {
Pokemons(first: $first) {
  id
  name
}
}`;

function Dashboard() {
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [savedPokemon, setSavedPokemon] = useState([]);

  const { loading, error, data } = useQuery(POKEMON_LIST_QUERY, {
    variables: {
      first: 151,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { Pokemons } = data;
  console.log("This is the formed squad", savedPokemon);

  return (
    <DashboardView
      pokemon={Pokemons}
      selectedPokemon={selectedPokemon}
      setSelectedPokemon={setSelectedPokemon}
      savedPokemon={savedPokemon}
      setSavedPokemon={setSavedPokemon}
    />
  );
}

export default Dashboard;
