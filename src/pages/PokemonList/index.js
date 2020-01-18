import React, { useState, useEffect } from 'react';
import { pokemonList, getPokemon } from '../../components/pokemonList';
import InfoPokemon from '../../components/infoPokemon';
import { useHistory } from 'react-router-dom';


const PokemonList = () => {
  const [pokemon, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=12';

  useEffect(() => {
    async function fetchData() {
      const response = await pokemonList(url);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemons(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadingPokemons = async data => {
    let pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemoRecord = await getPokemon(pokemon.url);
        return pokemoRecord;
      })
    );
    setPokemonData(pokemonData);
  };

  const next = async () => {
    setLoading(true);
    let data = await pokemonList(nextUrl);
    await loadingPokemons(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getPokemon(prevUrl);
    await loadingPokemons(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const history = useHistory();
  return (
    <div className="container">
      <h1>Poker Team</h1>
      <button onClick={() => history.push('/')}>Voltar</button>

      <p>Escolha seu pokemon:</p>
      <div className="btns">
        <button disabled={!prevUrl} onClick={prev}>
          Anterior
        </button>
        <button disabled={!nextUrl} onClick={next}>
          Próximo
        </button>
      </div>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <div className="box-main">
          {pokemon.map((pokemon, index) => {
            return <InfoPokemon key={index} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
};


export default PokemonList;
