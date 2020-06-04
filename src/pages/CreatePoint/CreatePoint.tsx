import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import api from '../../services/api'

import './CreatePoint.css'

import logo from '../../assets/logo.svg'
import axios from 'axios'

interface Item {
  id: number,
  title: string,
  image: string,
}
interface IbgeUf {
  sigla: string,
}
interface IbgeCity {
  nome: string,
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })

  const [selectedUf, setSelectedUf] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data.data)
    })
  }, [])

  useEffect(() => {
    axios.get<IbgeUf[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => { setUfs(response.data.map(uf => uf.sigla)) })
  }, [])

  useEffect(() => {
    if (selectedUf) {
      axios.get<IbgeCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => { setCities(response.data.map(city => city.nome)) })
    }
  }, [selectedUf])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setInitialPosition([latitude, longitude])
    })
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputData({...inputData, [event.target.name]: event.target.value});
  }

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUf(event.target.value);
  }

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  }

  const handleMapClick = (event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng])
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems(selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id]
    )
  }

  return (
    <div id="page-create-point">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para a Home
          </Link>
        </header>
        <main>
          <form>
            <h1>Cadastro do <br /> ponto de coleta</h1>

            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>

              <div className="field">
                <label htmlFor="name">Nome da entidade</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={inputData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={inputData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="whatsapp">WhatsApp</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    id="whatsapp"
                    value={inputData.whatsapp}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Endereço</h2>
                <span>Selecione o endereço no mapa</span>
              </legend>

              <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedPosition} />
              </Map>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="uf">UF</label>
                  <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                    <option value="" disabled>Selecione uma UF</option>
                    {ufs.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>)
                    )}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="city">Cidade</label>
                  <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                    <option value="" disabled>Selecione uma Cidade</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>)
                    )}
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Ítens de coleta</h2>
                <span>Selecione um ou mais ítens abaixo</span>
              </legend>

              <ul className="items-grid">
                {items.map(item => (
                  <li
                    key={item.id}
                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                    onClick={() => handleSelectItem(item.id)}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`}
                      alt={item.title}
                    />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </fieldset>

            <button type="submit">
              Cadastrar ponto de coleta
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default CreatePoint
