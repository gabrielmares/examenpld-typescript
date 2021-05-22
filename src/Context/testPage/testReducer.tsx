import { examenTypes } from '../../interfaces'

type examen = { type: number, respuesta: number }

export const examenRdx = (examenProps: examenTypes, action: examen): examenTypes => {
    const { type, respuesta } = action
    switch (type) {
        default:
            return {
                ...examenProps,
                [type]: respuesta
            }
    }
}