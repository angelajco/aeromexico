
import "../assets/styles/buttonNav.scss"
import imagen from '../assets/images/harry-potter-logo.png'

export default function NavButtons(props) {

    return (
        <>
            <div className="contenedor-logo">
                <img src={imagen} alt="logo" className="logo" />
            </div>
            <p className="texto-filtro">Selecciona tu filtro</p>
            <div className="navbar-buttons">
                {/* Recibo como prop el useState que cambia el valor del filtro */}
                <button type="submit" className="button-nav" onClick={() => props.cambiaFiltro(0)}>ESTUDIANTES</button>
                <button type="button" className="button-nav" onClick={() => props.cambiaFiltro(1)}>STAFF</button>
            </div>
        </>
    )
}
