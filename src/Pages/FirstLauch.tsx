import { useEffect } from "react"
import { clienteAxios2 } from "../axiosClient"
import { useHistory } from 'react-router-dom'
import RegistroUsuarios from "../Components/RegistroUsuarios"

export const FirstLauch = () => {
    let history = useHistory()

    useEffect(() => {
        clienteAxios2().get('/deployed')
            .then(respuesta => {
                if (respuesta.data.longitud > 0) return history.push('/login')
            })
        // eslint-disable-next-line
    }, [])


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
