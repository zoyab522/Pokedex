import React from 'react';

const PokemonStats = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  const statNames = ['HP', 'ATK', 'DEF', 'SpA', 'SpD', 'SPD'];
  const statColors = ['#DF2140', '#FF994D', '#eecd3d', '#2fc4ff', '#96da83', '#FB94A8'];
  
  const total = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <>
      <h4>STATS</h4>
      <div className="row center" id="stats-box">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="current-pokemon-stats-container column"
            style={{ background: statColors[index] }}
          >
            <div 
              className="current-pokemon-stats-name"
              style={{ background: statColors[index] }}
            >
              {statNames[index]}
            </div>
            <h5>{stat.base_stat}</h5>
          </div>
        ))}
        <div className="current-pokemon-stats-container column" style={{ background: '#88AAEA' }}>
          <div className="current-pokemon-stats-name" style={{ background: '#7195DC' }}>
            TOT
          </div>
          <h5>{total}</h5>
        </div>
      </div>
    </>
  );
};

export default PokemonStats;
