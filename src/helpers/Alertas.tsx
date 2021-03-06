import { examenUsuario, UsuarioAPI } from '../interfaces';
import Swal from 'sweetalert2'
import clienteAxios from '../axiosClient';
import { EliminarExamen, ResetPassword } from '../firebase/firebase';


export const AccionesUsuarios = async ({ uid, displayName, email }: UsuarioAPI, accion: string, token: string) => {
    const result = await Swal.fire({
        title: `${accion} el usuario`,
        text: `Desea ${accion.toLowerCase()} el usuario ${displayName}?`,
        icon: accion === 'Eliminar' ? 'error' : 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Si, ${accion}`,
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    });
    if (result.isConfirmed) {
        if (accion === 'Restablecer') {
            return ResetPassword(email)
                .then(() => AlertaExitoso(accion))
                .catch(() => AlertaError(accion))
        }
        return clienteAxios(token).delete('/delete', {
            params: uid
        })
            .then(() => AlertaExitoso(accion))
            .catch(() => AlertaError(accion))
    }
}


export const AlertaExitoso = (accion: string) => {
    return Swal.fire({
        icon: 'success',
        title: accion,
        text: 'Los cambios se efectuaron correctamente'
    })
}

export const AlertaError = (accion: string) => {
    return Swal.fire({
        icon: 'error',
        title: accion,
        text: 'No se pudo completar la accion'
    })
}


export const EliminarEvaluacionUsuario = async ({ email, nombre }: examenUsuario) => {

    // return console.log(email, nombre)

    const Alerta = await Swal.fire({
        title: 'Eliminar examen',
        text: `Desea eliminar el examen de  ${nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Si, Eliminar`,
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    });
    if (Alerta.isConfirmed) {
        return EliminarExamen(email)
            .then(() => AlertaExitoso('Elimino'))
            .catch(() => AlertaError('Error'))
    }
}