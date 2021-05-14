import { useContext, useState } from 'react'
import { clienteAxios2 } from '../axiosClient';
import { SessionContext } from '../Context/SessionContext';
import { AlertaError, AlertaExitoso } from '../helpers/Alertas';
import { Registro } from '../interfaces'

const RegistroUsuarios = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        nombre: '',
        oficial: ""
    })
    const { email, password, nombre, oficial } = form


    const { localState: { errores, claims: { token } }, listaDeUsuarios, listaActualizada } = useContext(SessionContext)
    const handleChange = (value: string | boolean, campo: keyof Registro) => {
        setForm({
            ...form,
            [campo]: value
        })
    }

    const handleSubmit = () => {
        return clienteAxios2(token).post('/nuevo', {
            ...form,
            OC: oficial
        })
            .then(() => {
                listaDeUsuarios()
                AlertaExitoso('Registro exitoso')
                return listaActualizada()
            })
            .catch(() => AlertaError('Fallo el registro'))
    }

    return (
        <div className='formCardRegister'>
            <h1 className="titleLoginForm">Nuevo usuario</h1>
            <form className='cardbodyRegister'>
                <div className='inputGroup'>
                    <div className='inputGroup' >
                        <label className='labelFormRegister'>Nombre</label>
                        <input
                            name='nombre'
                            type='text'
                            value={nombre}
                            key={332}
                            className={`${errores === 502 && 'loginError'} inputLoginForm `}
                            onChange={({ target }) => handleChange(target.value, 'nombre')}
                            placeholder='Minimo 6 Caracteres'
                        />
                    </div>
                    <label className='labelFormRegister'>Email</label>
                    <input
                        name='email'
                        type='text'
                        value={email}
                        key={333}
                        className={`${errores === 501 && 'loginError'} inputLoginForm `}
                        onChange={({ target }) => handleChange(target.value, 'email')}
                        placeholder='@grameen.mx'
                    />
                </div>
                <div className='inputGroup' >
                    <label className='labelFormRegister'>Password</label>
                    <input
                        name='password'
                        type='password'
                        value={password}
                        key={334}
                        className={`${errores === 502 && 'loginError'} inputLoginForm `}
                        onChange={({ target }) => handleChange(target.value, 'password')}
                        placeholder='Minimo 6 Caracteres'
                    />
                </div>
                <div className='inputGroup' style={{ marginBottom: '1em', marginTop: '1em', display: 'block', marginLeft: '2px' }}>
                    <input type='checkbox' value={oficial} onChange={() => handleChange(!oficial, 'oficial')} /> Oficial de cumplimiento
                </div>


                <div className='inputGroup'>
                    <button
                        type='button'
                        className='submitForm'
                        onClick={() => handleSubmit()}
                        disabled={password.length <= 5}
                    >
                        Registrar
                </button>
                </div>
            </form>
        </div >
    );
}

export default RegistroUsuarios;