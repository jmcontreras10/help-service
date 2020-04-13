import React, { useState } from 'react';
import PropTypes from "prop-types";
import img from "../assets/help.png";
function Home(props) {
    const [selected, setSelected] = useState({});
    const date = new Date().getTime();
    const aplicarAyuda = () => {
        if (props.user.email !== selected.userid) {
            let send = JSON.parse(JSON.stringify(selected));
            send.offers.push({ name: props.user.name, id: props.user.email });
            fetch('/solicitudes/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(send)
            })
        }
    };
    return (

        <div className="wrapper Home">
            <div className="banner">
                <h1 className="centrado text-center">
                    A quien quien deseas ayudar hoy
                </h1>
                <h6 className="centrado w-50 text-center">Encuentra abajo toda las peticiones de ayuda que se han hecho, si crees que puedes ayudar a alguien no dudes en hacerlo</h6>
            </div>
            <div className=" item-list">
                {props.solicitudes.length > 0 ? (
                    <div className="row">
                        {
                            props.solicitudes.filter((ele) => !ele.solved).map((element, i) =>
                                (
                                    <div className="col item-col" key={i} onClick={() => setSelected(element)}>
                                        <div className="item" data-toggle="modal" data-target="#itemModal">
                                            <img src={element.image ? element.image : img} alt="imagen item" />
                                            <div className="item-text text-light">
                                                <h4 className="item-title">
                                                    {element.title}
                                                </h4>
                                                <span className="item-date">
                                                    {
                                                        date - element.date < 86400000 ?
                                                            (
                                                                date - element.date < 3600000 ?
                                                                    `Hace ${Math.floor((date - element.date) / 60000)} minutos`
                                                                    :
                                                                    `Hace ${Math.floor((date - element.date) / 3600000)} horas`
                                                            ) :
                                                            (
                                                                `${new Date(element.date).getFullYear()}/${new Date(element.date).getMonth() + 1}/${new Date(element.date).getDate()}`
                                                            )
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                ) : (<h1>Cargando ...</h1>)
                }
            </div>
            <div className="modal modal-item fade" id="itemModal" tabIndex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">{selected.title}</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <img className="modal-imagen" src={selected.image ? selected.image : img} alt="imagen item" />
                                </div>
                                <div className="col-6 detalles">
                                    <ul>
                                        <li>
                                            <span className="detalles-label">Usuario: </span>
                                            <span className="detalles-text">{selected.userName}</span>
                                        </li>
                                        <li>
                                            <span className="detalles-label">Fecha: </span>
                                            <span className="detalles-text">{`${new Date(parseInt(selected.date)).getFullYear()}/${new Date(parseInt(selected.date)).getMonth() + 1}/${new Date(parseInt(selected.date)).getDate()} `}</span>
                                        </li>
                                        <li>
                                            <span className="detalles-label">Descripcion: </span>
                                            <p className="detalles-text">{selected.description}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={aplicarAyuda}>Enviar Ayuda</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Home.propTypes = {
    user: PropTypes.object.isRequired,
    solicitudes: PropTypes.array.isRequired
}

export default Home