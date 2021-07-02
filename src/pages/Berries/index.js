import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../pages.css';
import api from '../../services/api';
import FadeIn from 'react-fade-in';

const Berries = () => {
  const history = useHistory();
  const [berriesList, setBerriesList] = useState([])
  const [berryFlavor, setBerryFlavor] = useState([])
  const [selectedFlavor, setSelectedFlavor] = useState('')
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      // CAPTURA DOS SABORES DE BERRY
      const berryFlavorResponse = await api.get('berry-flavor');
      setBerryFlavor(berryFlavorResponse.data.results)
      setLoading(false);
      console.log(berryFlavorResponse)
    }
    loadData();
  }, []);

  async function loadBerries(e) {
    setLoading(true);
    const berryFlavorName = e.target.value;
    setSelectedFlavor(berryFlavorName);
    const filteredBerries = await api.get(`berry-flavor/${berryFlavorName}`);
    setBerriesList(filteredBerries.data.berries);
    setLoading(false);
  }

  return (
    <>
     <div className='main-berries'>
      {
        loading ? <h1>Loading...</h1> :
          (
            <>
                <button style={{ marginTop: 40}} onClick={() => history.push('/')}>Voltar</button>
                
                <h1>Lista de Berries</h1>
                <p>Barries são frutos que alimentam os pokemos:</p>
                <p>Escolha o sabor e veja quais berries tem disponível</p>
                <select name="berries" id="berries" onChange={loadBerries}>
                  {berryFlavor.map(flavor => <option key={flavor.name} value={flavor.name}>{flavor.name}</option>)}
                </select>
                  <h2>
                   Sabor: {selectedFlavor}
                  </h2>
                  <FadeIn>

                  <div className="box-main">
                    {berriesList.map(berry =>
                    <div key={berry.berry.name} className="box-pokemon" style={{ height: 140}}>
                      <p>Tipo: {berry.berry.name}</p>
                      <img alt={berry.berry.name} src={process.env.PUBLIC_URL +
                      `/sprites/items/berries/${berry.berry.name}-berry.png`} /> 
                    </div>
                    )}                  
                  </div>
                  </FadeIn>
            </>
          )
      }
      </div>
    </>
  );
}

export default Berries;