import { useState } from 'react'

import Personaje from './components/Personaje'
import NavButtons from './components/NavButtons'

import '../src/assets/styles/global.scss'

function App() {
  //Para guardar el filtro, ya sea estudiantes o maestros
  const [filtro, setFiltro] = useState(0)
  return (
    <>
      <NavButtons cambiaFiltro={setFiltro} />
      <Personaje filtro={filtro} />
    </>
  );
}

export default App;
