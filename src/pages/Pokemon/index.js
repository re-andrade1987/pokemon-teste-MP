import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../pages.css';
import FadeIn from 'react-fade-in';
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
      console.log(pokemonResponse)

      // CAPTURA DAS EVOLUÇÕES DO POKEMON
      const evolutionResponse = await api.get(`evolution-chain/${id}`);
      setEvolution(evolutionResponse.data.chain)
      console.log(evolutionResponse)


      setLoading(false);
    }
    loadData();
  }, [id]);

  return (
    <>
      <div className='main-box-evolution'>
        {
          loading ? <h1>Loading...</h1> :
            (
              <>
                <button style={{ marginTop: 40 }} onClick={() => history.push('/pokemon')}>Voltar</button>
                <h1>Detalhes do seu pokemon:</h1>
                <FadeIn>
                <div className='box-evolution-details' style={{ height: 400, width: 400 }}>
                  <h2>
                    <strong>Name: </strong>
                    {pokemon.name}
                  </h2>
                  <div className='box-evolution-details-info'>
                  <p>
                    <strong>Peso: </strong>
                    {pokemon.weight}
                  </p>
                  <p> <strong>Altura: </strong>
                    {pokemon.height}
                  </p>
                  </div>
                  <div>
                    <h3>Evolução dos pokémons:</h3>
                    <p>{evolution.evolves_to && evolution.evolves_to.length > 0 && evolution.evolves_to[0].species.name}</p>
                    <p>{evolution.evolves_to && evolution.evolves_to[0] && evolution.evolves_to[0].evolves_to.length > 0 && evolution.evolves_to[0].evolves_to[0].species.name}</p>
                  </div>
                  <div>
                    <h3>"Shiny": variantes raras dos Pokémons: </h3>
                    <img src={pokemon.sprites.front_shiny} alt='img-pokemon-shiny'/>
                  </div>
                </div>
                </FadeIn>
              </>
            )
        }
      </div>
    </>
  );
}

export default Pokemon;