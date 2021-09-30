import { useEffect, useState, Fragment } from 'react'
import NoFavorito from '../assets/images/bookmark-outline.svg'
import Favorito from '../assets/images/bookmark.svg'
import FavoritoBlanco from '../assets/images/bookmark-white.svg'
import Agregar from '../assets/images/account-plus.svg'
import Borrar from '../assets/images/trash-can-outline.svg'

import "../assets/styles/grid.scss"

import { useSelector, useDispatch } from 'react-redux'
import { añade, borra } from '../redux/reducer'

import axios from 'axios'

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

    const [urlDato, setUrlDatos] = useState("")
    //Se ejecuta cada vez que el filtro que se pasa por props cambia, si se da clic en los botones de filtro
    useEffect(() => {
        //Por defecto muestra a los estudiantes
        let url = "http://localhost:3001/hp-students";
        if (props.filtro !== undefined && props.filtro === 1) {
            url = "http://localhost:3001/hp-staff"
        } else if(props.filtro !== undefined && props.filtro === 2){
            url = "http://localhost:3001/hp-characters?alive=true"
        }
        setUrlDatos(url)
        //Se hace la petición
        fetch(url)
            .then(resp => resp.json())
            .then(
                // (data) => setInformacion(data),
                (data) => setInformacion(data),
                (error) => console.log(error)
            )
    }, [props.filtro])

    //Borra el elemento de favorito
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

    //Para guardar el valor del genero y de la posicion
    const [genero, setGenero] = useState(0)
    const [posicion, setPosicion] = useState(0)
    //Para mostrar lista de favoritos
    const [listaFavoritos, setListaFavoritos] = useState(false)

    //Funcion que ejecuta el formulario
    const agregaPersonaje = async (e) => {
        e.preventDefault();
        let nombre = e.target[0].value;
        let cumpleaños = e.target[1].value
        let ojos = e.target[2].value
        let pelo = e.target[3].value
        let foto = "";
        if (e.target[8].files[0]) {
            foto = URL.createObjectURL(e.target[8].files[0])
        }

        let posEstudiante = false;
        let posStaff = false;
        let urlGuardar;
        let nombreGenero;
        if (genero === 0) {
            nombreGenero = "female"
        } else if (genero === 1) {
            nombreGenero = "male"
        }
        if (posicion === 0) {
            posEstudiante = true
            urlGuardar = "http://localhost:3001/hp-students";
        } else if (posicion === 1) {
            posStaff = true;
            urlGuardar = "http://localhost:3001/hp-staff";
        }

        //Espera la llamada para renderizar los datos
        await axios.post(urlGuardar, {
            name: nombre,
            dateOfBirth: cumpleaños,
            gender: nombreGenero,
            eyeColour: ojos,
            hairColour: pelo,
            hogwartsStudent: posEstudiante,
            hogwartsStaff: posStaff,
            image: foto,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        setMuestraModal(false)
        //Se hace la petición de nuevo para renderizar el nuevo valor
        fetch(urlDato)
            .then(resp => resp.json())
            .then(
                (data) => setInformacion(data),
                (error) => console.log(error)
            )
    }

    // Para cambiar el genero cuando se le da clic
    const cambiarGenero = (changeEvent) => {
        setGenero(Number(changeEvent.target.value))
    }

    // Para cambiar la posicion cuando se le da clic
    const cambiaPosicion = (changeEvent) => {
        setPosicion(Number(changeEvent.target.value))
    }


    return (
        <>
            {
                muestraModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setMuestraModal(false)}>&times;</span>
                            <p>Agrega un personaje</p>
                            <form className="form-modal" onSubmit={agregaPersonaje}>
                                <div className="grupos-inputs">
                                    <div className="label-input">
                                        <label htmlFor="nombre">NOMBRE</label>
                                        <input className="inputs-grises" type="text" id="nombre" />
                                    </div>
                                    <div className="label-input">
                                        <label htmlFor="cumpleaños">CUMPLEAÑOS</label>
                                        <input className="inputs-grises" id="cumpleaños" type="date" />
                                    </div>
                                </div>
                                <div className="grupos-inputs">
                                    <div className="label-input">
                                        <label htmlFor="ojos">COLOR DE OJOS</label>
                                        <input className="inputs-grises" id="ojos" type="text" />
                                    </div>
                                    <div className="label-input">
                                        <label htmlFor="pelo">COLOR DE PELO</label>
                                        <input className="inputs-grises" id="pelo" type="text" />
                                    </div>
                                </div>
                                <div className="grupos-inputs">
                                    <div className="contenedores-labels-radios">
                                        <div className="labels-radios">
                                            <label>GÉNERO</label>
                                        </div>
                                        <div>
                                            <label>Mujer</label>
                                            <input className="primer-radio" type="radio" name="genero" value={0} defaultChecked={genero === 0} onChange={cambiarGenero} />
                                            <label>Hombre</label>
                                            <input type="radio" name="genero" value={1} defaultChecked={genero === 1} onChange={cambiarGenero} />
                                        </div>
                                    </div>
                                    <div className="contenedores-labels-radios">
                                        <div className="labels-radios">
                                            <label>POSICIÓN</label>
                                        </div>
                                        <div>
                                            <label>Estudiante</label>
                                            <input className="primer-radio" type="radio" name="posicion" value={0} defaultChecked={posicion === 0} onChange={cambiaPosicion} />
                                            <label>Staff</label>
                                            <input type="radio" name="posicion" value={1} defaultChecked={posicion === 1} onChange={cambiaPosicion} />
                                        </div>
                                    </div>
                                </div>
                                <div className="contenedor-fotografia">
                                    <label>FOTOGRAFÍA</label>
                                    <input type="file" />
                                </div>
                                <div className="contenedor-boton-guardar">
                                    <button className="boton-submit-guardar" type="submit">GUARDAR</button>
                                </div>
                            </form>
                        </div>
                    </div >
                )
            }

            <div className="botones-flotantes">
                <div className="botones-absolutos">
                    <button onClick={() => setListaFavoritos(!listaFavoritos)} className="boton-fav">
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
                </div>
                {
                    (personajesFavoritos.length !== 0 && listaFavoritos) && (
                        <>
                            <div className="personajes-favoritos">
                                {
                                    personajesFavoritos.map((valor, index) => (
                                        <Fragment key={index}>
                                            <div className="contenedor-favoritos-miniatura" key={index}>
                                                <img className="imagen-foto-miniatura" src={valor.payload.image} alt="foto-miniatura" />
                                                <div>{valor.payload.name}</div>
                                                <img alt="borrar" className="imagen-eliminar" src={Borrar} onClick={() => borraElemento(valor)} />
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
                                <img src={dato.image} className="imagen-foto" alt="foto" />
                            </div>
                            <div className={`card-informacion ${dato.alive ? "" : "card-informacion-no-alive"}`}>
                                <div className="favorito">
                                    <p className="estado">{dato.alive === true ? "VIVO" : "FINADO"} / {dato.hogwartsStudent ? "ESTUDIANTE" : dato.hogwartsStaff ? "STAFF" : ""}</p>
                                    {
                                        muestraFavorito && (
                                            <img alt="favorito" onClick={() => clicFavorito(dato)} src={dato.seleccionado ? Favorito : NoFavorito} />
                                        )
                                    }
                                </div>
                                <p className="nombre">{dato.name}</p>
                                <p><b>Cumpleaños:</b>&nbsp;<span>{dato.dateOfBirth}</span></p>
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
