import { useState } from 'react'
import Tarea from './Tarea'

import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { BiSortAlt2 } from 'react-icons/bi'

const EnlistarTareas = ({ tareas, setTareas, editando, setEditando, setId, guardarTareas }) => {
    const [check, setCheck] = useState(false)

    const eliminarTarea = id => setTareas(tareas.filter(tarea => tarea.id !== id))
    const llenarInput = id => {
        const filtrado = tareas.findIndex(tarea => tarea.id === id)
        const input = document.querySelector('#titulo')

        input.value = tareas[filtrado].titulo
        setId(tareas[filtrado].id)
        setEditando(true)
        input.focus()
    }

    const handleCheck = () => setCheck(document.querySelector('#input-orden').checked)
    const handleDragEnd = e => {
        setTareas(() => {
            const { active, over } = e

            const viejoIndex = tareas.findIndex(tarea => tarea.id === active.id)
            const nuevoIndex = tareas.findIndex(tarea => tarea.id === over.id)

            return arrayMove(tareas, viejoIndex, nuevoIndex)
        })
    }

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

            <div className='parteAbajo-contenedor'>
                <p className='parteAbajo-titulo negrita'>Tus tareas</p>
                <input type='checkbox' id='input-orden' title='Orden' onClick={handleCheck}/>
                <label htmlFor="input-orden" className='parteAbajo-boton boton' title='Ordenar las tareas'> <BiSortAlt2 /> </label>
            </div>
            <SortableContext items={tareas} strategy={verticalListSortingStrategy} >
                <ul className='parteAbajo-contenido'>
                    {tareas.map(tarea => (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                            eliminarTarea={eliminarTarea}
                            llenarInput={llenarInput}
                            guardarTareas={guardarTareas}
                            check={check}
                            editando={editando}
                        />
                    ))}
                </ul>
            </SortableContext>

        </DndContext>
    )
}

export default EnlistarTareas
