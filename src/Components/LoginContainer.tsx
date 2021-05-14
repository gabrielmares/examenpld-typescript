import React from "react"

const LoginContainer: React.ElementType = ({ children }) => {
    return (
        <div className="containerLogin">
            <div className=' backgroundImage'>
                {children}
            </div>
        </div>
    )
}

export default LoginContainer
