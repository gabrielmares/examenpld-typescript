import { useEffect, useState } from "react"
import clienteAxios from "../axiosClient"
import { useHistory } from 'react-router-dom'
import RegistroUsuarios from "../Components/RegistroUsuarios"
import { Cargando } from "../Components/Cargando"

export const FirstLauch = () => {
    const [pendiente, setPendiente] = useState(true)
    let history = useHistory()

    useEffect(() => {
        clienteAxios().get('/deployed')
            .then(respuesta => {
                if (respuesta.data.longitud > 0) {
                    setPendiente(false)
                    return history.push('/login')
                }
            })
        // eslint-disable-next-line
    }, [pendiente])

    if (pendiente) return <Cargando mensaje='Analizando informacion...' />

    return (
        <div className='backgroundImage'>
            <div>
                <div className='oficialRegister' >
                    <RegistroUsuarios
                        primerOficial
                    />
                </div>
            </div>
        </div >
    )
}
