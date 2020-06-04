import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'

import './CreatePoint.css'

import logo from '../../assets/logo.svg'

const CreatePoint = () => {
  const imagePrefix = 'http://localhost:3333/uploads'

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
                <input type="text" name="name" id="name"/>
              </div>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" name="email" id="email"/>
                </div>
                <div className="field">
                  <label htmlFor="whatsapp">WhatsApp</label>
                  <input type="tel" name="whatsapp" id="whatsapp"/>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Endereço</h2>
                <span>Selecione o endereço no mapa</span>
              </legend>

              <Map center={[-3.7895715, -38.5585407]} zoom={15}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-3.7895715, -38.5585407]} />
              </Map>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="uf">UF</label>
                  <select name="uf" id="uf">
                    <option value="0">Selecione uma UF</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="city">Cidade</label>
                  <select name="city" id="city">
                    <option value="0">Selecione uma Cidade</option>
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
                <li>
                  <img src={`${imagePrefix}/oleo.svg`} alt="Óleo"/>
                  <span>Óleo de Cozinha</span>
                </li>
                <li>
                  <img src={`${imagePrefix}/oleo.svg`} alt="Óleo"/>
                  <span>Óleo de Cozinha</span>
                </li>
                <li>
                  <img src={`${imagePrefix}/oleo.svg`} alt="Óleo"/>
                  <span>Óleo de Cozinha</span>
                </li>
                <li>
                  <img src={`${imagePrefix}/oleo.svg`} alt="Óleo"/>
                  <span>Óleo de Cozinha</span>
                </li>
                <li>
                  <img src={`${imagePrefix}/oleo.svg`} alt="Óleo"/>
                  <span>Óleo de Cozinha</span>
                </li>
                <li>
                  <img src={`${imagePrefix}/oleo.svg`} alt="Óleo"/>
                  <span>Óleo de Cozinha</span>
                </li>
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
