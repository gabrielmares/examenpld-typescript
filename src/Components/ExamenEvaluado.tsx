import PersonaPNG from '../assets/img/personaPNG.png'
import React from "react";
import generaPDF from '../helpers/GeneradorPDF';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { EliminarEvaluacionUsuario } from '../helpers/Alertas';

const ExamenEvaluado: React.ElementType = ({ examen }) => {

    const { usuario: { email, nombre }, calificacion } = examen


    return (
        <div className='descripcionExamen'>
            <img src={PersonaPNG} alt={email} className='imagenPersona' />
            <h4 className='nombreUsuarioExamen' onClick={() => generaPDF(examen)}>
                {nombre}
            </h4>
            <div className='contenedorCalificacion' >
                <p style={{ alignSelf: 'center' }} >Calificacion:</p>
                <h4 className='calificacionExamen' > {Number(calificacion).toFixed(2)}</h4>
            </div>
            <span className='eliminarEvaluacion' onClick={() => EliminarEvaluacionUsuario({ email, nombre })}>
                <FontAwesomeIcon icon={faTimes} color='#b92929' style={{ marginRight: 5 }} />
                Eliminar
            </span>
        </div>
    )
}

export default ExamenEvaluado;