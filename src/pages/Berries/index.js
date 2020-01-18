import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../pages.css';
import api from '../../services/api';

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
                <p>Escolha o sabor e veja quais berries tem disponível</p>
                <select name="berries" id="berries" onChange={loadBerries}>
                  {berryFlavor.map(flavor => <option key={flavor.name} value={flavor.name}>{flavor.name}</option>)}
                </select>
                <div>
                  <h2>
                   Sabor: {selectedFlavor}
                  </h2>
                  <ul>
                    {berriesList.map(berry =>
                    <li key={berry.berry.name}>
                    Tipo: {berry.berry.name}</li>)}
                  </ul>
                </div>
            </>
          )
      }
      </div>
    </>
  );
}

export default Berries;