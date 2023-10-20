import { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import Header from './components/Header'
import EnlistarTareas from './components/EnlistarTareas'

function App () {
    const [tareas, setTareas] = useState(JSON.parse(localStorage.getItem('tareas')) || [])
    const [esTemaClaro, setEsTemaClaro] = useState(JSON.parse(localStorage.getItem('tema')) || false)
    const [editando, setEditando] = useState(false)
    const [id, setId] = useState('')

    // Guardar las Tareas
    const guardarTareas = () => localStorage.setItem('tareas', JSON.stringify(tareas))
    useEffect(() => localStorage.setItem('tareas', JSON.stringify(tareas), [tareas]))

    // Cambiar el tema al cargar la página
    useEffect(() => { esTemaClaro && document.body.classList.add('light') }, [])
    const cambiarTema = () => {
        setEsTemaClaro(!esTemaClaro)
        document.body.classList.toggle('light')
        localStorage.setItem('tema', JSON.stringify(!esTemaClaro))
    }

    return (
        <div className='carta'>
            <Header esTemaClaro={esTemaClaro} cambiarTema={cambiarTema}/>
            <Formulario tareas={tareas} setTareas={setTareas} editando={editando} setEditando={setEditando} id={id} setId={setId} guardarTareas={guardarTareas}/>
            {tareas.length !== 0 &&
                <EnlistarTareas
                    tareas={tareas}
                    setTareas={setTareas}
                    editando={editando}
                    setEditando={setEditando}
                    setId={setId}
                    guardarTareas={guardarTareas}
                />
            }
        </div>
    )
}

export default App
