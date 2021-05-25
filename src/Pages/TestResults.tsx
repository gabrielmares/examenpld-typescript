import { ElementType } from 'react';
import { Cargando } from '../Components/Cargando'
import { ListaExamenes } from '../firebase/firebase'
import ExamenContenedor from '../Components/ContenedorExamen';
import ExamenEvaluado from '../Components/ExamenEvaluado';
import { resultadoExamen } from '../interfaces';

const ExamenesResueltos: ElementType = () => {
    const { pending, examenes } = ListaExamenes()

    if (pending) return <Cargando mensaje='Recuperando listado de evaluaciones' />
    return (
        <ExamenContenedor>
            <h1 className='titlePage'>Evaluaciones realizadas</h1>
            <div className='cuadrillaResultados'>
                {examenes.map((examen: resultadoExamen) => (
                    <ExamenEvaluado
                        key={examen.id}
                        examen={examen}
                    />
                ))}
            </div>


        </ExamenContenedor>
    );
}

export default ExamenesResueltos;