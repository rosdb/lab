import React from 'react';
import Pokecard from './Pokecard';
import './Pokedex.css';


function Pokedex({ data, exp, isWinner }) {
  return (
    <div className="Pokedex">
      <p className={isWinner ? 'Pokedex-winner' : 'Pokedex-loser'}>
        {isWinner ? 'WINNER' : 'LOSER'}
      </p>
      <h4>Total Experience: {exp} </h4>
      <div className="Pokedex-cards">
        {data.map((p) => (
          <Pokecard key={p.id} id={p.id} name={p.name} type={p.type} exp={p.base_experience} />
        ))}
      </div>
    </div>
  )
}

export default Pokedex;
