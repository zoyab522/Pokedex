import React from 'react';

const PokemonEvolution = ({ evolutionData, onPokemonSelect }) => {
  if (!evolutionData || !evolutionData.chain) return null;

  const chain = evolutionData.chain;
  
  const filterIdFromSpeciesURL = (url) => {
    return url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
  };



  const setupEvolution = (chain, no) => {
    const evolutionDetails = chain.evolves_to[0]?.evolution_details[0];
    const minLevel = evolutionDetails?.min_level;
    
    return (
      <>
        <img 
          className="current-pokemon-evolution-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${filterIdFromSpeciesURL(chain.species.url)}.png`}
          alt="Evolution"
          onClick={() => onPokemonSelect({ id: parseInt(filterIdFromSpeciesURL(chain.species.url)) })}
        />
        {no < 2 && chain.evolves_to[0] && (
          <>
            <div className="current-pokemon-evolution-level-container font-size-12 bold">
              {minLevel ? `Lvl ${minLevel}` : 'N/A'}
            </div>
            <img 
              className="current-pokemon-evolution-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${filterIdFromSpeciesURL(chain.evolves_to[0].species.url)}.png`}
              alt="Evolution"
              onClick={() => onPokemonSelect({ id: parseInt(filterIdFromSpeciesURL(chain.evolves_to[0].species.url)) })}
            />
          </>
        )}
      </>
    );
  };

  if (chain.evolves_to.length === 0) return null;

  return (
    <div className="current-pokemon-evolution-chain-container">
      <h4>EVOLUTION</h4>
      <div className="row center">
        {setupEvolution(chain, 0)}
        {chain.evolves_to[0]?.evolves_to?.length > 0 && (
          <>
            <div className="current-pokemon-evolution-level-container font-size-12 bold">
              {chain.evolves_to[0].evolution_details[0]?.min_level 
                ? `Lvl ${chain.evolves_to[0].evolution_details[0].min_level}` 
                : 'N/A'
              }
            </div>
            <img 
              className="current-pokemon-evolution-image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${filterIdFromSpeciesURL(chain.evolves_to[0].evolves_to[0].species.url)}.png`}
              alt="Evolution"
              onClick={() => onPokemonSelect({ id: parseInt(filterIdFromSpeciesURL(chain.evolves_to[0].evolves_to[0].species.url)) })}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonEvolution;
