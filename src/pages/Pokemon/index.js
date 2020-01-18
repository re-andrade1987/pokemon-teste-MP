import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../pages.css';

import api from '../../services/api';

const Pokemon = ({ id }) => {
  const history = useHistory();
  const [pokemon, setPokemon] = useState({});
  const [evolution, setEvolution] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      // CAPTURA DOS DETALHES DO POKEMON
      const pokemonResponse = await api.get(`pokemon/${id}`);
      setPokemon(pokemonResponse.data);

      // CAPTURA DAS EVOLUÇÕES DO POKEMON
      const evolutionResponse = await api.get(`evolution-chain/${id}`);
      setEvolution(evolutionResponse.data.chain)

      setLoading(false);
    }
    loadData();
  }, [id]);

  return (
    <>
      {
        loading ? <h1>Loading...</h1> :
          (
            <>
              <button onClick={() => history.push('/pokemon')}>Voltar</button>
              <h1>Detalhes</h1>
              <h2>{pokemon.name}</h2>
              <p>
                <strong>Peso: </strong>
                {pokemon.weight}
              </p>
              <p> <strong>Altura: </strong>
                {pokemon.height}
              </p>

              <div>
                <h3>Evolução</h3>
                <p>{evolution.evolves_to && evolution.evolves_to.length > 0 && evolution.evolves_to[0].species.name}</p>
                <p>{evolution.evolves_to && evolution.evolves_to[0] && evolution.evolves_to[0].evolves_to.length > 0 && evolution.evolves_to[0].evolves_to[0].species.name}</p>
              </div>
            </>
          )
      }
    </>
  );
}

export default Pokemon;