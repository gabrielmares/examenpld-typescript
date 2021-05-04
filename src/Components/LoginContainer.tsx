
const LoginContainer = (props: any) => {
    return (
        <div className="containerLogin">
            <div className=' backgroundImage'>
                {props.children}
            </div>
        </div>
    )
}

export default LoginContainer
