
const Contenedor = ({ children }: any) => {

    return (
        <div style={{ backgroundColor: '#e6e6e6', display: 'block' }}>
            <div className='contenedorExamen'>
                {children}
            </div>
        </div>

    );
}

export default Contenedor;