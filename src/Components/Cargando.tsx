import React from 'react'

interface CargandoProps {
    mensaje: string
}

export const Cargando: React.ElementType<CargandoProps> = ({ mensaje }) => {
    return (
        <div className='admin-page' style={{ textAlign: 'center', marginTop: 20 }}>
            {mensaje}
        </div>
    )
}