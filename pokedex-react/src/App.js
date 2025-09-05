import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import PokemonInfo from './components/PokemonInfo';
import LoadingScreen from './components/LoadingScreen';
import BackToTop from './components/BackToTop';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1200);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch all Pokemon names and types on component mount
  useEffect(() => {
    getAllNames();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle scroll events for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Fetch Pokemon names and types
  const getAllNames = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1010');
      const data = await response.json();
      
      const pokemonData = data.results.map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
        types: []
      }));

      setPokemons(pokemonData);
      setFilteredPokemons(pokemonData);
      await getAllTypes(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokemon names:', error);
    }
  };

  // Fetch Pokemon types
  const getAllTypes = async (pokemonData) => {
    try {
      // Fetch all types in parallel instead of sequentially
      const typePromises = [];
      for (let i = 0; i < 18; i++) {
        typePromises.push(fetch(`https://pokeapi.co/api/v2/type/${i + 1}`));
      }
      
      const typeResponses = await Promise.all(typePromises);
      const typeDataArray = await Promise.all(typeResponses.map(response => response.json()));
      
      // Process all type data
      typeDataArray.forEach(typeData => {
        typeData.pokemon.forEach(pokemon => {
          const pokemonId = parseInt(pokemon.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''));
          if (pokemonId <= pokemonData.length && pokemonData[pokemonId - 1]) {
            pokemonData[pokemonId - 1].types.push(typeData.name);
          }
        });
      });
      
      setPokemons([...pokemonData]);
      setFilteredPokemons([...pokemonData]);
      // Set the first Pokemon as selected by default only on desktop
      if (pokemonData.length > 0 && window.innerWidth > 1200) {
        setSelectedPokemon(pokemonData[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon types:', error);
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPokemons(pokemons);
      return;
    }

    const filtered = pokemons.filter(pokemon => 
      pokemon.name.replaceAll('-', ' ').includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  // Handle Pokemon selection
  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Handle Pokemon info close
  const handleClosePokemonInfo = () => {
    setSelectedPokemon(null);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return <LoadingScreen />;
  }


  return (
    <div className="App">
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={handleDarkModeToggle} />
      
      <div className="pokedex-container">
        <div className={`pokedex-list ${selectedPokemon && isDesktop && filteredPokemons.length > 0 ? 'has-sidebar' : ''}`}>
          <SearchBar onSearch={handleSearch} />
          <PokemonList 
            pokemons={filteredPokemons} 
            onPokemonSelect={handlePokemonSelect}
          />
        </div>
        
        {selectedPokemon && filteredPokemons.length > 0 && (
          <PokemonInfo 
            pokemon={selectedPokemon} 
            onClose={handleClosePokemonInfo}
            onPokemonSelect={handlePokemonSelect}
            allPokemons={pokemons}
          />
        )}
      </div>
      
      {/* Blur overlay for mobile fullscreen mode */}
      {selectedPokemon && !isDesktop && filteredPokemons.length > 0 && (
        <div className="blur-overlay active" />
      )}
      
      {showBackToTop && <BackToTop onClick={scrollToTop} />}
    </div>
  );
}

export default App;
