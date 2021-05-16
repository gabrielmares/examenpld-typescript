import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { SessionContext } from '../Context/SessionContext'
import useLogin from '../hook/useLogin'



const LoginCard: React.ElementType = () => {
    let history = useHistory()
    const { InciarSesion, localState: { errores } } = useContext(SessionContext)

    const { handleChange, password, email } = useLogin({ email: '', password: '' })


    const handleSubmit = async () => {
        const iniciarSesion: number | any = await InciarSesion({ email, password })
        if (iniciarSesion === 200) {
            return history.push('/administracion')
        }
        if (iniciarSesion === 201) {
            return history.push('/examen')
        }
        return iniciarSesion
    }


    return (
        <div className='formCardLogin'>
            <h1 className="titleLoginForm">Iniciar de sesión</h1>
            <form className='card-body'>
                <div className='inputGroup'>
                    <label className='labelForm'>Email</label>
                    <input
                        name='email'
                        type='email'
                        value={email}
                        key={222}
                        className={`${errores === 501 && 'loginError'} inputLoginForm `}
                        onChange={({ target }) => handleChange(target.value, 'email')}
                        placeholder='@grameen.mx'
                    />
                </div>
                <p style={{ color: 'red', fontWeight: 700, textAlign: 'center', fontSize: 12 }}>
                    {errores === 501 ? 'Usuario no registrado' : <small>&nbsp;</small>}
                </p>
                <div className='inputGroup' >
                    <label className='labelForm'>Password</label>
                    <input
                        name='password'
                        type='password'
                        value={password}
                        key={223}
                        className={`${errores === 502 && 'loginError'} inputLoginForm `}
                        onChange={({ target }) => handleChange(target.value, 'password')}
                        placeholder='Minimo 6 Caracteres'
                    />
                </div>
                <p style={{ color: 'red', fontWeight: 700, textAlign: 'center', fontSize: 12 }}>
                    {errores === 502 ? 'Contraseña incorrecta' : <small>&nbsp;</small>}
                </p>
                <div className='inputGroup' style={{ justifyContent: 'center' }}>
                    <button
                        type='button'
                        className='submitForm'
                        onClick={() => handleSubmit()}
                        disabled={password.length <= 5}
                    >
                        Entrar
                    </button>
                </div>
            </form>
            <p style={{ color: 'red', fontWeight: 700, textAlign: 'center', fontSize: 12 }}>
                {errores > 502 ? 'Sucedio un error, intente de nuevo mas tarde' : <small>&nbsp;</small>}
            </p>
            <span className='card-footer'>Solo el <b style={{ color: 'red' }}>oficial de cumplimiento</b> puede dar de alta nuevos usuarios</span>
        </div >
    )
}

export default LoginCard
