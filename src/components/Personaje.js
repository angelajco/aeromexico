import { useEffect, useState, Fragment } from 'react'
import NoFavorito from '../assets/images/bookmark-outline.svg'
import Favorito from '../assets/images/bookmark.svg'
import FavoritoBlanco from '../assets/images/bookmark-white.svg'
import Agregar from '../assets/images/account-plus.svg'
import Borrar from '../assets/images/trash-can-outline.svg'

import "../assets/styles/grid.scss"

import { useSelector, useDispatch } from 'react-redux'
import { añade, borra } from '../redux/reducer'

export default function Personaje(props) {
    //Selectores de Redux
    const contadorFavoritos = useSelector((state) => state.favoritoReducer.value)
    const personajesFavoritos = useSelector((state) => state.favoritoReducer.personajes)
    const dispatch = useDispatch()
    //Estado para mostrar el modal
    const [muestraModal, setMuestraModal] = useState(false)

    //Estado para guardar los personajes que vengan del JSON SERVER
    const [informacion, setInformacion] = useState([])

    //Para cambiar el valor de la imagen en las cards
    const [muestraFavorito, setMuestraFavorito] = useState(true)

    //Para mostrar si es favorito o no
    const clicFavorito = (dato) => {
        console.log(dato, "datosaaaa")
        if (contadorFavoritos > 4) {
            alert("No puedes ingresar más de 5 personajes en favoritos")
        } else {
            if (!dato.seleccionado) {
                //Para cambiar el estado de la imagen
                setMuestraFavorito(false)
                dato.seleccionado = true;
                //Contador para volver a renderizar la imagen
                setTimeout(() => {
                    setMuestraFavorito(true)
                }, 1)
                //Lanza el evento añade para agregar los personajes a favoritos
                dispatch(añade(dato))
            }
        }
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

    const borraElemento = (dato) => {
        setMuestraFavorito(false)
        // const arrTemp = informacion.map(personaje => {
        //     if (personaje.name === dato.payload.name) {
        //         console.log(personaje.seleccionado, "personaje")
        //         personaje.seleccionado = false;
        //         return personaje
        //     }
        // })

        // console.log(arrTemp, "arrTemp")
        // setInformacion(arrTemp);
        //Contador para volver a renderizar la imagen
        setTimeout(() => {
            setMuestraFavorito(true)
        }, 1)
        dispatch(borra(dato.payload))
    }

    return (
        <>
            {
                muestraModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setMuestraModal(false)}>&times;</span>
                            <p>Agrega un personaje</p>
                            <form>
                                <div className="grupos-inputs">
                                    <div className="label-input">
                                        <label for="nombre">NOMBRE</label>
                                        <input type="text" name="nombre" />
                                    </div>
                                    <div className="label-input">
                                        <label form="cumpleaños">CUMPLEAÑOS</label>
                                        <input name="cumpleaños" type="date" />
                                    </div>
                                </div>
                                <div className="grupos-inputs">
                                    <div className="label-input">
                                        <label for="ojos">COLOR DE OJOS</label>
                                        <input name="ojos" type="text" />
                                    </div>
                                    <div className="label-input">
                                        <label for="pelo">COLOR DE PELO</label>
                                        <input name="pelo" type="text" />
                                    </div>
                                </div>
                                <div className="grupos-inputs">
                                    <div>
                                        <div>
                                            <label for="genero">GÉNERO</label>
                                        </div>
                                        <div>
                                            <label>Mujer</label>
                                            <input type="radio" name="genero" value={0} />
                                            <label>Hombre</label>
                                            <input type="radio" name="genero" value={1} />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label>POSICIÓN</label>
                                        </div>
                                        <div>
                                            <label>Estudiante</label>
                                            <input type="radio" name="posicion" value={0} />
                                            <label>Staff</label>
                                            <input type="radio" name="posicion" value={1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor-fotografia">
                                    <label>Fotografía</label>
                                    <input type="file" />
                                </div>
                            </form>
                        </div>
                    </div >
                )
            }

            <div className="botones-flotantes">
                <button className="boton-fav">
                    <div>FAVORITOS&nbsp;</div>
                    <div>
                        <img src={FavoritoBlanco} alt="Favoritos" />
                    </div>
                </button>
                <button className="boton-agregar" onClick={() => setMuestraModal(true)}>
                    <div>AGREGAR&nbsp;</div>
                    <div>
                        <img src={Agregar} alt="Agregar" />
                    </div>
                </button>
                {
                    personajesFavoritos.length !== 0 && (
                        <>
                            <div className="personajes-favoritos">
                                {
                                    personajesFavoritos.map((valor, index) => (
                                        <Fragment key={index}>
                                            <div className="contenedor-favoritos-miniatura" key={index}>
                                                <img className="imagen-foto-miniatura" src={valor.payload.image} />
                                                <div>{valor.payload.name}</div>
                                                <img className="imagen-eliminar" src={Borrar} onClick={() => borraElemento(valor)} />
                                            </div>
                                            <hr className="separador" />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>

            <div className="grid-flex">
                {informacion.length !== 0 && (
                    informacion.map((dato, index) => (
                        <div key={index} className="muestra-flex">
                            <div className={`contenedor-foto ${dato.house ? dato.house.toLowerCase() : "sin-casa"}`}>
                                <img src={dato.image} className="imagen-foto" />
                            </div>
                            <div className={`card-informacion ${dato.alive ? "" : "card-informacion-no-alive"}`}>
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
        </>
    )
}
