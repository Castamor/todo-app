import { BiSolidSun, BiSolidMoon } from 'react-icons/bi'

const Header = ({ esTemaClaro, cambiarTema }) => {
    return (
        <header className="header">
            <h1><span>TODO</span> APP</h1>
            <h2>Crea y edita tus tareas</h2>

            <button type='button' title='Cambiar Tema' className='tema' onClick={cambiarTema}>
                {esTemaClaro ? <BiSolidMoon className='luna'/> : <BiSolidSun className='sol'/>}
            </button>
        </header>
    )
}

export default Header
