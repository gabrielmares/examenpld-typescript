import React, { useContext } from "react";
import { TestContext } from "../Context/testPage/testContext";

interface respuestas {
    respuesta: string,
    indicePregunta: number,
    indexRespuesta: number
}



const RespuestasRadio: React.FunctionComponent<respuestas> = ({ respuesta, indicePregunta, indexRespuesta }) => {

    const { seleccionRespuesta, respuestas } = useContext(TestContext)


    return (
        <div style={{ paddingBottom: 15, flexDirection: 'row', justifyItems: 'center' }}>
            <label>
                <input
                    type='radio'
                    name={`${indicePregunta}`}
                    key={Math.random()}
                    style={{ marginRight: 10 }}
                    checked={Object.values(respuestas)[indicePregunta] === indexRespuesta}
                    onChange={() => seleccionRespuesta(indicePregunta, indexRespuesta)}
                />
                <span style={{ marginBottom: 25 }}>{respuesta}</span>
            </label>
        </div>
    );
}

export default RespuestasRadio;