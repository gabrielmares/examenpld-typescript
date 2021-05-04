

interface Props {
    tipo: 'password' | 'email';
    value: string;
    onChange: (valor: string, propiedad: string) => string;
    nombre: string;

}

const InputForm = ({ nombre, tipo, value }: Props) => {
    return (
        <input
            name={nombre}
            value={value}
            type={tipo}
            
        />
    )
}

export default InputForm