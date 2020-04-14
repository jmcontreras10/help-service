import React, { useState } from 'react';
function Login() {
    const [registered, setRegistered] = useState(true);
    if (registered) { // si siempre se inisializa en true no veo necesario este if ademas si fuera necesario es mejor realizareste if dentro del return con un operador ternario 
        return (
            // registered ? <div/> : <div/>
            <div className="wrapper vh-100 Login">
                <div className="box centrado">
                    <p className="title">Iniciar Sesión</p>
                    <form action="/auth/login" method="post">
                        <div className="inputBox">
                            <input type="email" name="username" required></input>
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
            <div className="wrapper vh-100 Login">
                <div className="box centrado">
                    <p className="title">Registrarse</p>
                    <form action="/users/add" method="post">
                        <div className="inputBox">
                            <input type="text" name="name" required></input>
                            <label>Nombre</label>
                        </div>
                        <div className="inputBox">
                            <input type="email" name="email" required></input>
                            <label>Email</label>
                        </div>
                        <div className='container'>
                            <div className="row w-10">
                                <div className="col">
                                    <input type="radio" name='gender' value="male" required></input>
                                    <label className='text-light'>Hombre</label>
                                </div>
                                <div className="col">
                                    <input type="radio" name='gender' value="female" required></input>
                                    <label className='text-light'>Mujer</label>
                                </div>
                            </div>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="phone" required></input>
                            <label>Numero de Contacto</label>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="address" required></input>
                            <label>Dirreccion</label>
                        </div>
                        <div className="inputBox">
                            <input type="password" name="password" required ></input>
                            <label>Contraseña</label>
                        </div>

                        <button onClick={() =>window.location.reload(false)} className="btn btn-primary centrado-h submit" type="submit">
                            Registrarse
                        </button>
                    </form>
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
