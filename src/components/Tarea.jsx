import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BiCheckbox, BiCheck, BiTrashAlt, BiPencil } from 'react-icons/bi'

const Tarea = ({ tarea, eliminarTarea, llenarInput, guardarTareas, check, editando }) => {
    const [tareaCompletada, setTareaCompletada] = useState(tarea.completado)

    const subdrayarTarea = () => {
        setTareaCompletada(!tarea.completado)
        tarea.completado = !tarea.completado
        guardarTareas()
    }

    // Arrastrar elementos
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tarea.id })
    const estilos = { transform: CSS.Transform.toString(transform), transition }

    return (
        <>
            {!check
                ? (
                    <li className="plantilla">
                        <button
                            type='button'
                            className='boton check apuntar'
                            title='Completar Tarea'
                            onClick={subdrayarTarea}
                        > {tareaCompletada ? <BiCheck/> : <BiCheckbox/> } </button>

                        <p className={`fondo-tarea titulo apuntar ${tareaCompletada ? 'subdrayado' : ''}`} onClick={subdrayarTarea}>
                            {tarea.titulo}
                        </p>

                        <button
                            type="button"
                            className='boton editar apuntar'
                            title='Editar tarea'
                            onClick={() => llenarInput(tarea.id)}
                        > <BiPencil/> </button>

                        <button
                            type='button'
                            className='boton basura apuntar hover'
                            title='Eliminar Tarea'
                            onClick={() => eliminarTarea(tarea.id)}
                        > <BiTrashAlt/> </button>
                    </li>
                )
                : (
                    <li className="plantilla noSeleccionar" {...attributes} {...listeners} ref={setNodeRef} style={estilos}>
                        <button type='button' className='boton check opacidad agarrar'> {tareaCompletada ? <BiCheck/> : <BiCheckbox/> } </button>
                        <p className={`fondo-tarea titulo opacidad agarrar ${tareaCompletada ? 'subdrayado' : ''}`}> {tarea.titulo} </p>
                        <button type='button' className='boton basura opacidad agarrar' > <BiTrashAlt/> </button>
                    </li>
                )
            }

        </>
    )
}

export default Tarea
