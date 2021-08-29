import { useEffect, useState } from 'react'
import '../src/assets/styles/grid.scss'

function App() {

  const [informacion, setInformacion] = useState([])
  const [filtro, setFiltro] = useState(0)

  useEffect(() => {
    let url = "http://localhost:3001/hp-students";
    if (filtro !== 0) {
      url = "http://localhost:3001/hp-staff"
    }

    fetch(url)
      .then(resp => resp.json())
      .then(
        (data) => setInformacion(data),
        (error) => console.log(error)
      )
  }, [filtro])



  return (
    <>
      <button type="button" onClick={() => setFiltro(0)}>Estudiantes</button>
      <button type="button" onClick={() => setFiltro(1)}>Staff</button>

      <div className="grid-flex">
        {informacion.length !== 0 && (
          informacion.map((dato) => (
            <div className="linea-flex">
              <div>
                <img src={dato.image} />
              </div>
              <div>
                <p>Nombre: {dato.name}</p>
                <p>Cumpleaños: {dato.dateOfBirth}</p>
                <p>Genero: {dato.gender}</p>
                <p>Color de ojos: {dato.eyeColour}</p>
                <p>Color de cabello: {dato.hairColour}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </>
  );
}

export default App;
