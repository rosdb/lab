import React from 'react';
import Pokedex from './Pokedex';

function Pokegame() {
  const POKEMON_DATA_SRC = [
    {id: 4, name: 'Charmander', type: 'fire', base_experience: 62},
    {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
    {id: 11, name: 'Metapod', type: 'bug', base_experience: 72},
    {id: 25, name: 'Pikachu', type: 'electric', base_experience: 112},
    {id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95},
    {id: 94, name: 'Gengar', type: 'poison', base_experience: 225},
  ];
  const hand1 = [];
  const hand2 = [...POKEMON_DATA_SRC];
  while (hand1.length < hand2.length) {
    const randIdx = Math.floor(Math.random() * hand2.length);
    const randPokemon = hand2.splice(randIdx, 1)[0];
    hand1.push(randPokemon);
  }
  const exp1 = hand1.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
  const exp2 = hand2.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);

  return (
    <div className="Pokegame">
      <Pokedex data={hand1} exp={exp1} isWinner={exp1 > exp2} />
      <Pokedex data={hand2} exp={exp2} isWinner={exp2 > exp1} />
    </div>
  );
}

export default Pokegame;
