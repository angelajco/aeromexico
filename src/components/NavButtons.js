
import "../assets/styles/buttonNav.scss"
import imagen from '../assets/images/harry-potter-logo.png'

export default function NavButtons(props) {

    return (
        <>
            <img src={imagen} alt="logo" className="logo"/>
            <div className="navbar-buttons">
                <button type="submit" className="button-nav" onClick={() => props.cambiaFiltro(0)}>Estudiantes</button>
                <button type="button" className="button-nav" onClick={() => props.cambiaFiltro(1)}>Staff</button>
            </div>
        </>
    )
}
