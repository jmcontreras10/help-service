import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import defaultPhoto from "../assets/user.png"
import { Redirect, useParams } from 'react-router-dom';
import editar from "../assets/icons/edit.svg"
import img from "../assets/help.png"
import upload from "../assets/upload.png"
import alert from "../assets/icons/new.svg"

function Profile(props) {
    const [reports, setReports]=useState([]);
    const [fotoCargada, setFoto] = useState(null);
    const [selected, setSelected] = useState({});
    const [user, setUser] = useState(props.user);
    const [own, setOwn] = useState(true);
    const inputPhoto = useRef();
    const solicitudPhoto = useRef();
    const formSolicitud = useRef();
    const { id } = useParams();
    const date = new Date().getTime();

    useEffect(() => {
        setUser(props.user);
        if (id && id !== props.user.email) {
            setOwn(false);
            fetch(`/users/get?email=${id}`)
                .then(res => res.json())
                .then(usr => {
                    if (usr.length > 0) {
                        setUser(usr[0]);
                    }
                    else {
                        setUser(undefined);
                    }
                })
            fetch('/reports/get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({user:id})
            }).then(res => res.json())
                .then(usr => {
                    setReports(usr?usr:[]);
                })
        }
        else{
        fetch('/reports/get', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user:props.user.email})
        }).then(res => res.json())
            .then(usr => {
                setReports(usr ? usr : []);
            })
    }
    }, [props.user, id]);

    const aceptarOferta =(sele)=>{
        let send = {...selected};
        send.solved=true;
        send.selected = sele;
        fetch('/solicitudes/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(send)
        }).then(() => {
            window.location.reload(false);
        })
    }

    const reportar = (user)=>{
        let send={
            user: user,
            date: new Date().getTime(),
            description:"El usuario infringio las normas de la comunidad"
        }
        fetch('/reports/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(send)
        }).then(()=>{
            window.location.reload(false);
        })
    }

    const subirSolicitud = () => {
        console.log(user);
        let data = new FormData(formSolicitud.current);
        let send = Object.fromEntries(data)
        send.image = fotoCargada;
        send.userid = user.email;
        send.userName = user.name;
        send.date = new Date().getTime();
        send.solved = false;
        send.offers = [];
        fetch('/solicitudes/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(send)
        }).then(() => {
            window.location.reload(false);
        })
    }

    const procesarFoto = () => {
        const reader = new FileReader();
        reader.readAsDataURL(solicitudPhoto.current.files[0])
        reader.onload = () => {
            setFoto(reader.result)
        }
    }
    const changePhoto = () => {
        const reader = new FileReader();
        reader.readAsDataURL(inputPhoto.current.files[0])
        reader.onload = () => {
            let send = { ...user }
            send.image = reader.result;
            fetch('/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(send)
            })
        }
    }
    return (
        user ? (
            <div className="wrapper Profile">
                <div className="profile-info">
                    <div className="profile-photo centrado-h">
                        <img className="photo" alt="presentation profile" src={user.image ? user.image : defaultPhoto}></img>
                        <span className="edit">
                            <img alt="icono editar" className="centrado" src={editar} />
                            <input type="file" ref={inputPhoto} onChange={changePhoto} />
                        </span>
                    </div>
                    {own && user.name &&
                        <button className="btn btn-primary centrado-h" data-toggle="modal" data-target="#solicitudModal">
                            Crear Solicitud
                            </button>
                    }
                    <div className="profile-data">
                        <ul>
                            <li>
                                <span className="detalles-label">Nombre </span>
                                <span className="detalles-text">{user.name}</span>
                            </li>
                            <li>
                                <span className="detalles-label">Email </span>
                                <span className="detalles-text">{user.email}</span>
                            </li>
                            <li>
                                <span className="detalles-label">Genero </span>
                                <span className="detalles-text">{user.gender}</span>
                            </li>
                            {(own || props.solicitudes.filter((ele) => ele.userid === user.email && ele.selected && ele.selected.id === props.user.email).length>0) &&
                                <>
                                    <li>
                                        <span className="detalles-label">Numero </span>
                                        <span className="detalles-text">{user.phone}</span>
                                    </li>
                                    <li>
                                        <span className="detalles-label">Direccion </span>
                                        <span className="detalles-text">{user.address}</span>
                                    </li>
                                </>
                            }
                            <li>
                                <span className="detalles-label">Numero de reportes </span>
                                <span className="detalles-text text-danger">{reports.length}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="listing">
                    <div className="row">
                        <div className="col-6 mark-border">
                            <h4 className="text-center">Mis Solicitudes</h4>
                            <div className="row centrado-h item-save">
                                {
                                    props.solicitudes.filter((ele) => ele.userid === user.email).map((element, i) =>
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
                                                {element.offers.length > 0 &&
                                                    <div className="aler">
                                                        <img src={alert} alt="nuevo evento"></img>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <h4 className="text-center">Mis Ayudas</h4>
                            <div className="row centrado-h item-save">
                                {
                                    props.solicitudes.filter((ele) => ele.offers.filter(na => na.id === user.email).length > 0).map((element, i) =>
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
                                                {element.selected.id === user.email &&
                                                    <div className="aler">
                                                        <img src={alert} alt="nuevo evento"></img>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className="modal modal-item fade" id="itemModal" tabIndex="-1" role="dialog" aria-labelledby="itemModalLabel" aria-hidden="true">
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
                                    <div className="col">
                                        <img className="modal-imagen" src={selected.image ? selected.image : img} alt="imagen item" />
                                    </div>
                                    <div className="col detalles">
                                        <ul>
                                            <li>
                                                <span className="detalles-label">Usuario: </span>
                                                <span className="detalles-text">{selected.userName}</span>
                                            </li>
                                            <li>
                                                <span className="detalles-label">Fecha: </span>
                                                <span className="detalles-text">{`${new Date(selected.date).getFullYear()}/${new Date(selected.date).getMonth() + 1}/${new Date(selected.date).getDate()} `}</span>
                                            </li>
                                            <li>
                                                <span className="detalles-label">Descripcion: </span>
                                                <p className="detalles-text">{selected.description}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    {own && selected.userid === user.email && !selected.solved  &&
                                        <div className="col ofertas">
                                            <h4>Ofertas Vigentes</h4>
                                            {   selected.offers &&
                                                selected.offers.map((offer, i) => (
                                                    <div key={i} className="offer-contain">
                                                        <a href={`/profile/${offer.id}`}>{offer.name}</a>
                                                        <button className="btn btn-primary" onClick={()=>aceptarOferta(offer)}>Aceptar</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                    {own && selected.userid === user.email && selected.solved &&
                                        <div className="col ofertas">
                                            <h5>Necesidad resuelta gracias a:</h5>
                                        <a href={`/profile/${selected.selected.id}`}>{selected.selected.name}</a>
                                        <button className="reportar btn btn-danger" onClick={() => reportar(selected.selected.id)}> Reportar a este usuario</button>
                                        </div>
                                    }

                                    {own && selected.userid !== user.email && selected.solved &&
                                        <div className="col ofertas">
                                            <h4>Ofertas Aceptada</h4>
                                            <a href={`/profile/${selected.userid}`}>Accede a los datos de contacto</a>
                                        <button className="reportar btn btn-danger" onClick={() => reportar(selected.userid)}> Reportar a este usuario</button>
</div>
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal modal-solicitud fade" id="solicitudModal" tabIndex="-1" role="dialog" aria-labelledby="solicitudModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="exampleModalLabel">Llene la informacion de su solicitud</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-6 modal-imagen">
                                        <img src={fotoCargada ? fotoCargada : upload} alt = "carga de imagen" />
                                        <input ref={solicitudPhoto} type="file" onChange={procesarFoto} />
                                    </div>
                                    <div className="col-6 modal-form">
                                        <form ref={formSolicitud}>
                                            <div className="inputBox">
                                                <input type="text" name="title" required></input>
                                                <label>Titulo</label>
                                            </div>
                                            <div className="inputBox">
                                                <textarea className="form-control" name="description" aria-label="With textarea"></textarea>
                                                <label>Descripcion</label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={subirSolicitud}>Publicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : <Redirect to="/" />

    );
}
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    solicitudes: PropTypes.array.isRequired
}
export default Profile