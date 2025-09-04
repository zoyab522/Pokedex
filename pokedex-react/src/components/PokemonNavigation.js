import React from 'react';

const PokemonNavigation = ({ currentPokemon, allPokemons, onPokemonSelect }) => {
  const nextId = currentPokemon.id + 1;
  const prevId = currentPokemon.id - 1;
  
  const nextPokemon = allPokemons.find(p => p.id === nextId);
  const prevPokemon = allPokemons.find(p => p.id === prevId);

  const dressUpPayloadValue = (string) => {
    const splitStr = string.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  return (
    <div className="row center">
      <button 
        className="arrow-button" 
        onClick={() => prevPokemon && onPokemonSelect(prevPokemon)}
        style={{ display: currentPokemon.id === 1 ? 'none' : 'flex' }}
      >
        <img className="arrow row" src="./assets/back-icon-removebg-preview.png" alt="Previous" />
      </button>
      
      <div className="current-pokemon-indexes-container">
        {prevPokemon && (
          <div className="left-side-indexes row">
            <div>
              <img 
                className="current-pokemon-prev"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${prevId}.png`}
                alt="Previous Pokemon"
                onClick={() => onPokemonSelect(prevPokemon)}
              />
            </div>
            <div>
              <span className="font-size-12 bold">{dressUpPayloadValue(prevPokemon.name)}</span>
            </div>
            <div>
              <span className="font-size-12">#{prevId}</span>
            </div>
          </div>
        )}
        
        {nextPokemon && (
          <div className="right-side-indexes row">
            <div>
              <span className="font-size-12 bold">{dressUpPayloadValue(nextPokemon.name)}</span>
            </div>
            <div>
              <span className="font-size-12">#{nextId}</span>
            </div>
            <div>
              <img 
                className="current-pokemon-next"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextId}.png`}
                alt="Next Pokemon"
                onClick={() => onPokemonSelect(nextPokemon)}
              />
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="arrow-button" 
        onClick={() => nextPokemon && onPokemonSelect(nextPokemon)}
        style={{ display: currentPokemon.id === 1010 ? 'none' : 'flex' }}
      >
        <img className="arrow row" src="./assets/next-icon.png" alt="Next" />
      </button>
    </div>
  );
};

export default PokemonNavigation;
