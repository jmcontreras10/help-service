import React, { useState, useEffect } from 'react';
import {
    Redirect
} from "react-router-dom";
import img from "../assets/help.png"
function Home() {
    const [ofertas, setOfertas] = useState([
        {
            titulo: "Necesito mis medicamentos",
            descripcion: " soy una anciana de 89 años que no tiene para pagar sus medicinas, necesito acetaminofen",
            idUsuario: "236958",
            nombreUsuario: "doña gloria",
            fecha: 1586745723584,
            imagen: 'iVBORw0KGgoAAAANSUhEUgAAAYkAAABwCAYAAADrN4zYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABCWSURBVHhe7Z0LtuqqEkVPt2zQszn25toYO + OrRSApCJ / 420ad84yME0P4htQC3Bb / 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'
        },
        {
            titulo: "Necesito mis pañales",
            descripcion: " soy una anciana de 89 años que no tiene para pagar pañales, necesito acetaminofen",
            idUsuario: "236958",
            nombreUsuario: "doña gloria",
            fecha: 1586745723520,
        }
    ]);
    const [selected, setSelected] = useState({});
    const date = new Date().getTime();
    return (

        <div className="wrapper Home">
            <div className="banner">
                <h1 className="centrado text-center">
                    A quien quien deseas ayudar hoy
                </h1>
                <h6 className="centrado w-50 text-center">Encuentra abajo toda las peticiones de ayuda que se han hecho, si crees que puedes ayudar a alguien no dudes en hacerlo</h6>
            </div>
            <div className="filter">
                <div className="card">
                    <div className="card-header">
                        <h4>Filtros</h4>
                    </div>
                    <div className="card-body">
                        
                    </div>
                </div>
            </div>
            <div className=" item-list">
                <div className="row">
                    {
                        ofertas.map((element, i) =>
                            (
                                <div className="col item-col" key={i} onClick={()=>setSelected(element)}>
                                    <div className="item" data-toggle="modal" data-target="#itemModal">
                                        <img src={element.imagen ? `data:image/png;base64,${element.imagen}` : img} alt="imagen item" />
                                        <div className="item-text text-light">
                                            <h4 className="item-title">
                                                {element.titulo}
                                            </h4>
                                            <span className="item-date">
                                                {
                                                    date - element.fecha < 86400000 ?
                                                        (
                                                            date - element.fecha < 3600000 ?
                                                                `Hace ${Math.floor((date - element.fecha) / 60000)} minutos`
                                                                :
                                                                `Hace ${Math.floor((date - element.fecha) / 3600000)} horas`
                                                        ) :
                                                        (
                                                            `${new Date(element.fecha).getFullYear()}/${new Date(element.fecha).getMonth() + 1}/${new Date(element.fecha).getDate()}`
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
            </div>
            <div className="modal fade" id="itemModal" tabIndex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">{selected.titulo}</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <img className="modal-imagen" src={selected.imagen ? `data:image/png;base64,${selected.imagen}` : img} alt="imagen item" />
                                </div>
                                <div className="col-6 detalles">
                                    <ul>
                                        <li>
                                            <span className="detalles-label">Usuario: </span>
                                            <span className="detalles-text">{selected.nombreUsuario}</span>
                                        </li>
                                        <li>
                                            <span className="detalles-label">Fecha: </span>
                                            <span className="detalles-text">{`${new Date(selected.fecha).getFullYear()}/${new Date(selected.fecha).getMonth() + 1}/${new Date(selected.fecha).getDate()} `}</span>
                                        </li>
                                        <li>
                                            <span className="detalles-label">Descripcion: </span>
                                            <p className="detalles-text">{selected.descripcion}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary">Enviar Ayuda</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home