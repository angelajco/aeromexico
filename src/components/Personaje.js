import { COMPARISON_BINARY_OPERATORS } from '@babel/types'
import { useEffect, useState } from 'react'
import NoFavorito from '../assets/images/bookmark-outline.svg'
import Favorito from '../assets/images/bookmark.svg'

import "../assets/styles/grid.scss"

export default function Personaje(props) {
    //Estado para guardar los personajes que vengan del JSON SERVER
    const [informacion, setInformacion] = useState([])

    const [muestraFavorito, setMuestraFavorito] = useState(true)

    //Para mostrar si es favorito o no
    const clicFavorito = (dato) => {
        setMuestraFavorito(false)
        if (dato.seleccionado) {
            dato.seleccionado = false;
        } else {
            dato.seleccionado = true;
        }
        //Contador para volver a renderizar la imagen
        setTimeout(() => {
            setMuestraFavorito(true)
        }, 1)
    }

    //Se ejecuta cada vez que el filtro que se pasa por props cambia, si se da clic en los botones de filtro
    useEffect(() => {
        //Por defecto muestra a los estudiantes
        let url = "http://localhost:3001/hp-students";
        if (props.filtro !== undefined && props.filtro !== 0) {
            url = "http://localhost:3001/hp-staff"
        }

        //Se hace la petición
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
                            <div className="favorito">
                                <p className="estado">{dato.alive == true ? "VIVO" : "FINADO"} / {dato.hogwartsStudent ? "ESTUDIANTE" : dato.hogwartsStaff ? "STAFF" : ""}</p>
                                {
                                    muestraFavorito && (
                                        <img onClick={() => clicFavorito(dato)} src={dato.seleccionado ? Favorito : NoFavorito} />
                                    )
                                }
                            </div>
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
