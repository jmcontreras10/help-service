import React, { useState } from 'react';
function Login() {
    const [registered, setRegistered] = useState(true);
    if (registered) {
        return (
            <div className="wrapper vh-100 Login">
                <div className="box centrado">
                    <p className="title">Iniciar Sesión</p>
                    <form action="/auth/login" method="post">
                        <div className="inputBox">
                            <input type="text" name="username" required></input>
                            <label>Email</label>
                        </div>
                        <div className="inputBox">
                            <input type="password" name="password" required ></input>
                            <label>Contraseña</label>
                        </div>
                        <button className="btn btn-primary centrado-h submit" type="submit">
                            Ingresar
                        </button>
                    </form>
                    <div className='text-light'>
                        ¿No tienes una cuenta?
                        <button className="btn btn-link btn-secondary" onClick={() => setRegistered(false)}>Registrate</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="wrapper vh-100">
                <div className="box centrado">
                    <p className="title">Registrarse</p>
                    <div className="inputBox">
                        <input type="text" required></input>
                        <label>Nombre</label>
                    </div>
                    <div className='container'>
                        <div className="row w-10">
                            <div className="col">
                                <input type="radio" name='idType' value="Nit" required></input>
                                <label className='text-light'>Nit</label>
                            </div>
                            <div className="col">
                                <input type="radio" name='idType' value="Cedula" required></input>
                                <label className='text-light'>Cédula</label>
                            </div>
                        </div>
                    </div>
                    <div className="inputBox">
                        <input type="text" required></input>
                        <label>Identificacion</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" required></input>
                        <label>Email</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" required></input>
                        <label>Contraseña</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" required></input>
                        <label>Confirmar Contraseña</label>
                    </div>
                    <button className="btn btn-primary centrado-h submit" type="button">
                        Registrarse
                </button>
                    <div className='text-light'>
                        ¿Ya tienes una cuenta?
                    <button className="btn btn-link btn-secondary" onClick={()=>setRegistered(true)}>Ingresa</button>
                    </div>
                </div>
            </div >
        );
    }
}
export default Login;