// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useContext } from "react";
// import { TestContext } from "../Context/testPage/testContext";
import { Pregunta } from "../interfaces";
import RespuestasRadio from "./RespuestasRadio";


const PreguntaExamen: React.FunctionComponent<Pregunta> = ({ pregunta, listaRespuestas, indice }) => {
    // const { respuestas, respuestasCorrectas } = useContext(TestContext)

    return (
        <div className='contenedorPregunta'>
            <h3 className='estilosPregunta'>{indice + 1}. {pregunta}</h3>
            <div >
                {listaRespuestas.map((respuesta, index) => (
                    <RespuestasRadio
                        key={Math.random()}
                        respuesta={respuesta}
                        indicePregunta={indice}
                        indexRespuesta={index}
                    />
                ))}
                {/* {Object.values(respuestas)[indice] === parseInt(respuestasCorrectas[indice])
                    ? <FontAwesomeIcon
                        name='resultado'
                        title='Resultado'
                        icon={faCheck}
                        color={'#31863f'}
                        style={{ marginLeft: 200 }}
                        size='4x'
                    /> : null} */}
            </div>
        </div>
    );
}

export default PreguntaExamen;