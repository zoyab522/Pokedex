import React from 'react';

const PokemonCard = ({ pokemon, onClick }) => {
  const getImageUrl = (id) => {
    if (id >= 650 && id <= 898) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`;
    } else if (id < 650) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
    } else {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }
  };

  const getTypeContainers = (types) => {
    const typeColors = {
      'normal': '#BCBCAC',
      'fighting': '#BC5442',
      'flying': '#669AFF',
      'poison': '#AB549A',
      'ground': '#DEBC54',
      'rock': '#BCAC66',
      'bug': '#ABBC1C',
      'ghost': '#6666BC',
      'steel': '#ABACBC',
      'fire': '#FF421C',
      'water': '#2F9AFF',
      'grass': '#78CD54',
      'electric': '#FFCD30',
      'psychic': '#FF549A',
      'ice': '#78DEFF',
      'dragon': '#7866EF',
      'dark': '#785442',
      'fairy': '#FFACFF',
      'shadow': '#0E2E4C'
    };

    return (
      <div className="row">
        {types.map((type, index) => (
          <div
            key={index}
            className="type-container"
            style={{ background: typeColors[type] }}
          >
            {dressUpPayloadValue(type)}
          </div>
        ))}
      </div>
    );
  };

  const dressUpPayloadValue = (string) => {
    const splitStr = string.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  return (
    <div onClick={onClick} className="pokemon-render-result-container">
      <img 
        className="search-pokemon-image" 
        src={getImageUrl(pokemon.id)} 
        alt={pokemon.name}
        // style={{textAlign: 'center'}}
      />
      <span className="bold font-size-12">N° {pokemon.id}</span>
      <h3>{dressUpPayloadValue(pokemon.name)}</h3>
      {getTypeContainers(pokemon.types)}
    </div>
  );
};

export default PokemonCard;
