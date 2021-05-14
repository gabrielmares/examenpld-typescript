import { useContext } from "react"
import { SessionContext } from "../Context/SessionContext"

const TituloApp= () => {

    const { localState: { claims } } = useContext(SessionContext)
    return (
        <div className='tituloApp'
            style={{
                justifyContent: (!claims.oficial) ? 'center' : 'flex-start'
            }}
        >
            <h2 className='tituloText'>Examen PLD</h2>
        </div>
    )
}

export default TituloApp