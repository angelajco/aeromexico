import { useEffect, useState } from 'react'

import "../assets/styles/grid.scss"

export default function Personaje(props) {
    const [informacion, setInformacion] = useState([])

    useEffect(() => {
        let url = "http://localhost:3001/hp-students";
        if (props.filtro !== undefined && props.filtro !== 0) {
            url = "http://localhost:3001/hp-staff"
        }

        fetch(url)
            .then(resp => resp.json())
            .then(
                (data) => setInformacion(data),
                (error) => console.log(error)
            )
    }, [props.filtro])

    return (
        <div className="grid-flex">
            {informacion.length !== 0 && (
                informacion.map((dato, index) => (
                    <div key={index} className="muestra-flex">
                        <div className={`contenedor-foto ${dato.house ? dato.house.toLowerCase() : "sin-casa"}`}>
                            <img src={dato.image} className="imagen-foto" />
                        </div>
                        <div className="card-informacion">
                            <p className="estado">{dato.alive == true ? "VIVO" : "FINADO"} / {dato.hogwartsStudent ? "ESTUDIANTE" : dato.hogwartsStaff ? "STAFF" : ""}</p>
                            <p className="nombre">{dato.name}</p>
                            <p><b>Cumpleaños:</b>&nbsp;{dato.dateOfBirth}</p>
                            <p><b>G&eacute;nero:</b>&nbsp;<span className="datos-mayusculas">{dato.gender}</span></p>
                            <p><b>Color de ojos:</b>&nbsp;<span className="datos-mayusculas">{dato.eyeColour}</span></p>
                            <p><b>Color de cabello:</b>&nbsp;<span className="datos-mayusculas">{dato.hairColour}</span></p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
