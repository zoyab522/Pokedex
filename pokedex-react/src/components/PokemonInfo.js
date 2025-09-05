import React, { useState, useEffect } from 'react';
import PokemonStats from './PokemonStats';
import PokemonEvolution from './PokemonEvolution';
import PokemonNavigation from './PokemonNavigation';

const PokemonInfo = ({ pokemon, onClose, onPokemonSelect, allPokemons }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemon) {
      fetchPokemonInfo();
    }
  }, [pokemon]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPokemonInfo = async () => {
    setLoading(true);
    try {
      
      // Fetch all data in parallel for better performance
      const [pokemonResponse, speciesResponse] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
      ]);

      const [pokemonData, speciesData] = await Promise.all([
        pokemonResponse.json(),
        speciesResponse.json()
      ]);

      setPokemonData(pokemonData);
      setSpeciesData(speciesData);

      // Fetch evolution chain if available
      if (speciesData.evolution_chain?.url) {
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        setEvolutionData(evolutionData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon info:', error);
      setLoading(false);
    }
  };

  const getImageUrl = (id) => {
    if (id >= 650 && id <= 898) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`;
    } else if (id < 650) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
    } else {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }
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
      <div className="row center">
        {types.map((type, index) => (
          <div
            key={index}
            className="type-container"
            style={{ background: typeColors[type.type?.name || type] }}
          >
            {dressUpPayloadValue(type.type?.name || type)}
          </div>
        ))}
      </div>
    );
  };

  const getDescription = () => {
    if (!speciesData) return '';
    
    for (let i = 0; i < speciesData.flavor_text_entries.length; i++) {
      if (speciesData.flavor_text_entries[i].language.name === 'en') {
        return dressUpPayloadValue(speciesData.flavor_text_entries[i].flavor_text.replace('', ' '));
      }
    }
    return '';
  };

  const getFormattedDescription = () => {
    const description = getDescription();
    if (!description) return '';
    
    // Capitalize Pokemon with capital P
    let formatted = description.replace(/\bpokemon\b/gi, 'Pokemon');
    
    // Capitalize first letter after periods
    formatted = formatted.replace(/\.\s*([a-z])/g, (match, letter) => {
      return '. ' + letter.toUpperCase();
    });
    
    // Capitalize Pokemon names (common ones)
    const pokemonNames = [
      'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard',
      'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree',
      'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata',
      'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu',
      'sandshrew', 'sandslash', 'nidoran', 'nidorina', 'nidoqueen', 'nidorino',
      'nidoking', 'clefairy', 'clefable', 'vulpix', 'ninetales', 'jigglypuff',
      'wigglytuff', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'paras',
      'parasect', 'venonat', 'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian',
      'psyduck', 'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag',
      'poliwhirl', 'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke',
      'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel',
      'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro',
      'magnemite', 'magneton', 'farfetchd', 'doduo', 'dodrio', 'seel', 'dewgong',
      'grimer', 'muk', 'shellder', 'cloyster', 'gastly', 'haunter', 'gengar',
      'onix', 'drowzee', 'hypno', 'krabby', 'kingler', 'voltorb', 'electrode',
      'exeggcute', 'exeggutor', 'cubone', 'marowak', 'hitmonlee', 'hitmonchan',
      'lickitung', 'koffing', 'weezing', 'rhyhorn', 'rhydon', 'chansey', 'tangela',
      'kangaskhan', 'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie',
      'mr. mime', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros',
      'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon', 'jolteon',
      'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl',
      'snorlax', 'articuno', 'zapdos', 'moltres', 'dratini', 'dragonair', 'dragonite',
      'mewtwo', 'mew'
    ];
    
    pokemonNames.forEach(name => {
      const regex = new RegExp(`\\b${name}\\b`, 'gi');
      formatted = formatted.replace(regex, name.charAt(0).toUpperCase() + name.slice(1));
    });
    
    return formatted;
  };

  if (loading) {
    return (
      <div className="current-pokemon-container">
        <div className="loading-container" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center'
        }}>
          <img src="/assets/pokeball-icon.png" alt="Loading" className="loading-ball" style={{ width: '60px', height: '60px' }} />
          <p style={{ marginTop: '20px', fontSize: '18px' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!pokemonData) {
    return null;
  }

  return (
    <>
      {/* Main Pokemon info container */}
      <div className="current-pokemon-container">
        {/* Close button */}
        <div className="close-button" style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          cursor: 'pointer',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={onClose}>
          <img 
            src="/assets/close-icon.png" 
            alt="Close" 
            style={{ width: '16px', height: '16px' }}
          />
        </div>

        <img 
          id="current-pokemon-image" 
          src={getImageUrl(pokemon.id)}
          alt={pokemon.name}
          style={{ height: 'auto', maxHeight: '20vh' }}
        />

        <div className="current-pokemon-info">
          {/* ID */}
          <span className="font-size-12 bold">N° {pokemonData.id}</span>
          
          {/* Name */}
          <h2>{dressUpPayloadValue(pokemonData.name)}</h2>

          {/* Types */}
          {getTypeContainers(pokemonData.types)}

          {/* Description */}
          <h4>POKÉDEX ENTRY</h4>
          <span>{getFormattedDescription()}</span>

          {/* Height and Weight */}
          <div className="row center">
            <div className="width-100 column center margin-5">
              <h4>HEIGHT</h4>
              <div className="pokemon-info-variable-container">
                {pokemonData.height / 10}m
              </div>
            </div>
            <div className="width-100 column center margin-5">
              <h4>WEIGHT</h4>
              <div className="pokemon-info-variable-container">
                {pokemonData.weight / 10}Kg
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="column">
            <h4>ABILITIES</h4>
            <div className="row">
              <div className="pokemon-info-variable-container">
                {dressUpPayloadValue(pokemonData.abilities[0]?.ability?.name || '')}
              </div>
              {pokemonData.abilities[1] && (
                <div className="pokemon-info-variable-container">
                  {dressUpPayloadValue(pokemonData.abilities[1]?.ability?.name || '')}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <PokemonStats stats={pokemonData.stats} />

          {/* Evolution Chain */}
          {evolutionData && (
            <PokemonEvolution 
              evolutionData={evolutionData} 
              onPokemonSelect={onPokemonSelect}
            />
          )}
        </div>
      </div>
      <div className="pokemon-nav-container">
        {/* Navigation */}
        <PokemonNavigation 
          currentPokemon={pokemonData}
          allPokemons={allPokemons}
          onPokemonSelect={onPokemonSelect}
        />
      </div>
    </>
  );
};

export default PokemonInfo;