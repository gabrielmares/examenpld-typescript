import React, { useContext } from "react"
import { Cargando } from "../Components/Cargando"
import RegistroUsuarios from "../Components/RegistroUsuarios"
import TablaUsuarios from "../Components/TablaUsuarios"
import { SessionContext } from "../Context/SessionContext"
import { ListaUsuariosFB } from "../firebase/firebase"



const AdminPage: React.ElementType = () => {

    const { localState: { claims: { token } }, actualizar } = useContext(SessionContext)

    const { usuariosFB, pending } = ListaUsuariosFB(token, actualizar)


    if (pending) return <Cargando mensaje='Recuperando lista de usuarios, Espere...' />

    return (
        <div className='admin-page'>
            <h1 className='titlePage'>Gestion de usuarios</h1>
            <div className='containerAdmin'>
                <RegistroUsuarios
                    primerOficial={false} />
                <TablaUsuarios
                    data={usuariosFB}
                />
            </div>
        </div>
    );
}

export default AdminPage;