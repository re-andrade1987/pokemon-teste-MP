import React from 'react';
import { useHistory } from 'react-router-dom';
import '../pages.css';
import pokemons from '../Main/imagens/pokemons.jpg'

const Main = () => {
  const history = useHistory();
  return (
    <>
      <div className='main'>
        <h1>Poker Team</h1>
        <h2>Conheça mais do mundo pokemon!</h2>
        <div className='main-details'>
          <div className='main-details-box'>
            <p>Conheça os pokemons:</p>
            <button onClick={() => history.push('/pokemon')}>Pokemon</button>
          </div>
          <div className='main-details-box'>
            <p>Saiba do que se alimentam:</p>
            <button onClick={() => history.push('/berry')}>Berries</button>
          </div>
        </div>
        <div className='img-box'>
          <img src={pokemons} alt="img-pokemos" />
        </div>
        <h3>Pokémon são criaturas de todas as formas e tamanhos que convivem com os humanos na natureza. Na grande maioria, os Pokémon não falam, exceto para proferir seus nomes. Os Pokémon são criados e comandados por seus donos (os chamados "Treinadores"). No decorrer das aventuras, os Pokémon crescem e ganham experiência, podendo até mesmo evoluir para Pokémon mais fortes.</h3>
      </div>
    </>
  )
}

export default Main;