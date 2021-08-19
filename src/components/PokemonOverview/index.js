import React, { useState, useEffect } from "react";
import { useQuery } from "graphql-hooks";
import groupBy from "lodash/groupBy";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const returnMoves = (abilities) => {
  if (abilities.length === 0) return <span>No moves added</span>;

  return abilities.map(({ name, learnMethod }) => {
    return (
      <div className="halfColumnBorder" key={name}>
        <span className="stat">{learnMethod}</span>
        <span className="statValue">{name}</span>
      </div>
    );
  });
};

const returnStats = (stats) => {
  return stats.map(({ name, value }) => {
    return (
      <div className="halfColumn" key={`${name}-${value}`}>
        <span className="stat">{name}</span>
        <span className="statValue">{value}</span>
      </div>
    );
  });
};

const returnMoveListItems = (
  moves,
  addMove,
  selectedMoves,
  setSelectedMoves
) => {
  return moves.map((item) => {
    return (
      <li
        key={item.name}
        onClick={() => addMove(item, selectedMoves, setSelectedMoves)}
      >
        {item.name}
      </li>
    );
  });
};

const returnMovesList = (moves, addMove, selectedMoves, setSelectedMoves) => {
  if (!moves) return;

  return Object.keys(moves).map((value) => {
    return (
      <span key={value}>
        <h1>{value}</h1>
        <ul>
          {returnMoveListItems(
            moves[value],
            addMove,
            selectedMoves,
            setSelectedMoves
          )}
        </ul>
      </span>
    );
  });
};

const learnMove = (move, selectedMoves, setSelectedMoves) => {
  let selected = selectedMoves;
  const index = selected.findIndex((item) => item.name === move.name);

  if (index !== -1) {
    //remove from array
    const index = selected.findIndex((item) => item.name === move.name);
    const newSelected = [
      ...selected.slice(0, index),
      ...selected.slice(index + 1),
    ];

    setSelectedMoves(newSelected);
    return;
  }
  //add to array
  if (selected.length > 3) {
    return;
  }
  setSelectedMoves([move, ...selectedMoves]);
};

const addToSquad = (
  image,
  name,
  selectedMoves,
  savedPokemon,
  setSavedPokemon
) => {
  const newPokemon = {
    name: name,
    image: image,
    selectedMoves: selectedMoves,
  };

  setSavedPokemon([newPokemon, ...savedPokemon]);
};

function PokemonOverview(props) {
  const { selectedPokemon, setSavedPokemon, savedPokemon } = props;
  const [selectedMoves, setSelectedMoves] = useState([]);

  const POKEMON_FETCH_DETAILS = `query Pokemon($name: String!) {
  Pokemon(name: $name) {
    id
    name
    image
    types {
        name
    }
    abilities{
        name
    }
    moves {
        name
        type
        learnMethod
    }
    stats {
        name
        value
    }
  }
  }`;

  const { loading, error, data } = useQuery(POKEMON_FETCH_DETAILS, {
    variables: {
      name: selectedPokemon,
    },
  });

  useEffect(() => {
    setSelectedMoves([]);
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const { Pokemon } = data;
  const { image, name, stats, moves } = Pokemon;
  const groupedMoves = groupBy(moves, "learnMethod");

  return (
    <div className="overView">
      <div className="row">
        <div className="selectColumn">
          <img src={image} alt="pokemonImage" />
          <span className="pokeName">{name}</span>
          <span
            className="button"
            onClick={() =>
              addToSquad(
                image,
                name,
                selectedMoves,
                savedPokemon,
                setSavedPokemon
              )
            }
          >
            Save Pokemon
          </span>
        </div>
        <div className="midColumn">
          <h1 className="centeredTitle">stats</h1>
          <div className="statRow">{returnStats(stats)}</div>
          <h1 className="centeredTitle">selectedMoves</h1>
          <div className="statRow">{returnMoves(selectedMoves, moves)}</div>
        </div>
        <div className="selectColumn">
          <h1 className="primaryTitle">Tutor Machine</h1>
          <div className="movesColumn">
            {returnMovesList(
              groupedMoves,
              learnMove,
              selectedMoves,
              setSelectedMoves
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonOverview;
