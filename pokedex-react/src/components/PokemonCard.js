import React from 'react';

const PokemonCard = ({ pokemon, onClick }) => {
  const getImageUrl = (id) => {
    // Always use static PNG sprites for the grid cards
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };


  const dressUpPayloadValue = (string) => {
    const splitStr = string.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
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
      <div className="type-tags-container">
        {types.map((type, index) => (
          <div
            key={index}
            className="type-tag"
            style={{ background: typeColors[type] }}
          >
            {dressUpPayloadValue(type)}
          </div>
        ))}
      </div>
    );
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
