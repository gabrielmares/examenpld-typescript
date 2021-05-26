// import React from 'react';
import { jsPDF } from "jspdf";
import { ListaPreguntas as Preguntas } from '../Cuestionario'
// eslint-disable-next-line
// import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'



const generaPDF = (examen) => {
    const doc = new jsPDF('p', 'in', 'letter');


    const { calificacion, opciones, evaluacion, usuario: { nombre } } = examen
    let positionY = 1, linea, resp, positionX = 0;

    // establecemos el encabezado del examen, nombre en la primera posicion 
    // calificacion en la esquina derecha
    let titulo = `Nombre: ${nombre}`;
    doc.text(1, 1, titulo)
    doc.text(6, 1, `Calificacion: ${Number(calificacion).toFixed(2)}`)
    positionY = 1.7
    // console.table(doc.getFontList())
    // iteramos por cada pregunta y la agregamos al documento con un ancho de 6.8" en cada linea
    // tomamos el index del array para seleccionar la posicion que se tomara de las respuestas

    // eslint-disable-next-line 
    Preguntas.map((question, index) => {
        if (index === 8) {
            doc.addPage();
            positionY = 1
        }
        const { pregunta, respuestas } = question
        positionX = 1
        linea = doc
            .setFontSize(14)
            .setTextColor(0)
            .setFont('helvetica', 'normal')
            .splitTextToSize(index + 1 + ". " + pregunta, 6.8)
        doc.text(1, positionY, linea)
        positionY += linea.length * 24 / 72
        let indexPregunta = index
        // guardamos el index de las preguntas para obtener la evaluacion de cada pregunta
        // que viene de la api como array, si la respuesta seleccionada es correcta, se marca en negritas
        // para indicar la respuesta seleccionada
        // eslint-disable-next-line
        respuestas.map((respuesta, index) => {
            resp = doc
                .setFontSize(10)
                .splitTextToSize(respuesta, 2);
            if (parseInt(opciones[indexPregunta]) === index) {
                doc.setFont('helvetica', 'bold');
            }
            doc.text(positionX, positionY, resp);
            positionX = positionX + 2.3;
            doc.setFont('helvetica', 'normal')
        })
        // si la respuesta seleccionada es correcta, colocamos un msg en verde en la pregunta
        // de ser erronea, colocamos el msg en rojo de falso
        if (!evaluacion[index]) {
            doc
                .setFontSize(18)
                .setTextColor(233, 51, 51)
                .setFont('helvetica', 'bold')
                .text(8, positionY + 0.1, 'F')
        } else {
            doc
                .setFontSize(18)
                .setTextColor(15, 190, 44)
                .setFont('helvetica', 'bold')
                .text(8, positionY + 0.1, 'V')
        }
        if (resp.length <= 2) {
            // eslint-disable-next-line
            positionY += resp.length * 30 / 72
        } else {
            // eslint-disable-next-line
            positionY += resp.length * 24 / 72
        }

    })
    doc.save(`${nombre}.pdf`)

}
export default generaPDF;