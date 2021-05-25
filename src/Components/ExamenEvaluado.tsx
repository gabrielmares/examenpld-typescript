import PersonaPNG from '../assets/img/personaPNG.png'
import React from "react";
import generaPDF from '../helpers/GeneradorPDF';

const ExamenEvaluado: React.ElementType = ({ examen }) => {

    const { usuario, calificacion } = examen
    return (
        <div className='descripcionExamen'>
            <img src={PersonaPNG} alt={usuario.email} className='imagenPersona' />
            <h4
                className='nombreUsuarioExamen'
                onClick={() => generaPDF(examen)}
            >
                {usuario.nombre}
            </h4>
            <div className='contenedorCalificacion' >
                <p style={{ alignSelf: 'center' }} >Calificacion:</p>
                <h4 className='calificacionExamen'> {Number(calificacion).toFixed(2)}</h4>
            </div>

        </div>
    )
}

export default ExamenEvaluado;