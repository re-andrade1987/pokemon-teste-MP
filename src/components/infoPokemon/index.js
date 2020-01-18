import React from 'react';
import { useHistory } from 'react-router-dom';
import './infoPokemon.css';
import FadeIn from 'react-fade-in';


function InfoPokemon({ pokemon }) {
    const history = useHistory(); 
    return(
        <div className='box-pokemon'>
            <FadeIn>
            <div className='box-details'>
                <img src={pokemon.sprites.front_default} alt='img-pokemon'/>
                <p>
                    <strong>Nome: </strong>
                    {pokemon.name}
                </p>
                <div className='texts'>
                {pokemon.types.map((type, index)  => {
                    return(
                    <span key={index}>
                        <p>{type.type.name}</p>
                    </span>
                    )
                })}
                </div>
                <p style={{ marginTop: 50}}>
                    <strong>Habilidade: </strong>
                    {pokemon.abilities[0].ability.name}
                </p>
                <button style={{ marginTop: 20}} onClick={() => history.push(`/pokemon/${pokemon.id}`)}>Saiba mais...</button>
            </div>
            </FadeIn>
        </div>
    )
}
   


export default InfoPokemon