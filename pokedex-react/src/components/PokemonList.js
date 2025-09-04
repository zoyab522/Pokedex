import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons, onPokemonSelect }) => {

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="no-pokemon-found-container">
        <img 
          src="/assets/no-selection-removebg-preview.png" 
          alt="No Pokemon Found" 
          className="no-selection-image"
        />
        <h2 className="no-pokemon-text">No Pokemon found</h2>
      </div>
    );
  }

  return (
    <div className="pokedex-list-render-container">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={() => onPokemonSelect(pokemon)}
        />
      ))}
    </div>
  );
};

export default PokemonList;
