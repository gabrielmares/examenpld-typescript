import React, { useContext } from "react"
import { Data, UsuarioAPI } from "../interfaces"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faUserTimes } from '@fortawesome/free-solid-svg-icons'
import { SessionContext } from "../Context/SessionContext"
import { AccionesUsuarios } from '../helpers/Alertas'

const TablaUsuarios: React.ElementType = ({ data }: Data | any) => {
    const usuarios = data
    const { windowSize, localState: { claims: { token } }, listaActualizada, listaDeUsuarios } = useContext(SessionContext)

    const AccionUsuario = (usuario: UsuarioAPI, accion: string, token: string) => {
        AccionesUsuarios(usuario, accion, token)
            .then(() => listaDeUsuarios())
            .then(() => listaActualizada())
            .catch(error => console.log(error))

    }


    return (
        <div className='contenedorTabla'>
            <h1 className='tituloTabla'>Usuarios registrados</h1>
            <table className='tablaUsuarios' >
                <thead className='tablaHeader'>
                    <tr>
                        {(windowSize > 500) && (<th className='columnaNombre'>Email </th>)}
                        <th>Nombre</th>
                        <th className='columnaAcciones'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (usuarios && usuarios?.length > 0)
                            ?
                            usuarios?.map((usuario: UsuarioAPI) =>
                            (
                                <tr key={usuario.uid} >
                                    {windowSize > 500 && (<td className='columnaNombre' style={{ padding: 10 }}>{usuario.email}</td>)}
                                    <td style={{ padding: 10 }}>{usuario.displayName}</td>
                                    <td className='columnaAcciones' style={{ textAlign: 'center' }}>
                                        <FontAwesomeIcon
                                            color={'#af3030'}
                                            icon={faUserTimes}
                                            title='Eliminar usuario'
                                            name='Eliminar'
                                            style={{ marginRight: 20 }}
                                            onClick={() => AccionUsuario(usuario, 'Eliminar', token)}
                                        />
                                        <FontAwesomeIcon
                                            color={'#297041'}
                                            icon={faRedo}
                                            name='Restablecer'
                                            title='Restablecer contraseña'
                                            onClick={() => AccionUsuario(usuario, 'Restablecer', token)}
                                        />
                                    </td>
                                </tr>
                            )
                            )
                            :
                            (
                                <tr key={2} style={{ width: '100%' }}>
                                    No se encontraron registros
                                </tr>
                            )


                    }
                </tbody>
            </table >
        </div >
    )
}

export default TablaUsuarios
