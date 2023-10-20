import { useState } from 'react'
import Error from './Error'
import { BiPlus, BiCheck } from 'react-icons/bi'

const Formulario = ({ tareas, setTareas, editando, setEditando, id, setId, guardarTareas }) => {
    const [error, setError] = useState(false)

    const generarId = () => Math.random().toString(36).substring(2) + Date.now().toString(36)

    const handleSubmit = (e) => {
        e.preventDefault()
        const valor = (e.target[0].value).trim()

        if (!valor.trim()) {
            setError(true)
            setTimeout(() => setError(false), 2500)
            return
        }

        if (!editando) {
            setTareas([{
                id: generarId(),
                titulo: valor,
                completado: false
            }, ...tareas])
            document.querySelector('form').reset()
            return
        }

        const filtrado = tareas.find(tarea => tarea.id === id)
        filtrado.titulo = valor

        guardarTareas()
        setId('')
        setEditando(false)
        document.querySelector('form').reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="titulo" className='label-input negrita'>{!editando ? '¿Qué tareas tienes hoy?' : 'Cambiar titulo de la tarea...'}</label>
            <div className="plantilla input">
                <input
                    id="titulo"
                    className="fondo-tarea noSeleccionar bordeOverflow"
                    placeholder="Titulo de la tarea"
                    type="text"
                />
                <button type="submit" title={!editando ? 'Agregar Tarea' : 'Actualizar Tarea'} className="boton plus hover apuntar">{!editando ? <BiPlus/> : <BiCheck/>}</button>
            </div>
            {error && <Error>(Campo obligatorio)</Error>}
        </form>
    )
}

export default Formulario
