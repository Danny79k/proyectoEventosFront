import { useParams, Link } from "react-router-dom"
import { EventContext } from "../utils/Context"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../utils/Context"
import Swal from "sweetalert2"
import Loading from "../components/Loading"

export default function Evento() {

    const { user } = useContext(UserContext)
    const { data, loading, error } = useContext(EventContext)
    const params = useParams()
    const [event, setEvent] = useState([])

    useEffect(() => {
        if (data?.data) setEvent(data.data)
    },[data])

    if (loading) return(<Loading/>)
    if (error) return(<div>Error...</div>)
    
    const id = Number(params.id)
    const evento = event.find(e => e.id === id)

    if (!evento) {
        return <div className="mt-20 text-center">No se encontró la asociación</div>;
    }

    if (localStorage.getItem("ultimosEventos")) {
        const eventosLocal = JSON.parse(localStorage.getItem("ultimosEventos"))
        if (!eventosLocal.some(event => event.id == evento.id)) {
            const nuevosEventos = [...eventosLocal, evento]
            localStorage.setItem("ultimosEventos", JSON.stringify(nuevosEventos))
        }
    } else {
        console.log(evento);
        const nuevoEvento = [evento]
        localStorage.setItem("ultimosEventos", JSON.stringify(nuevoEvento))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            user_id: user.id,
            event_id: evento.id
        }
        console.log(body);
        fetch('https://jeffrey.informaticamajada.es/api/events/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        Swal.fire({
            title: `Te has unido al evento ${evento.title}`,
            input: "Le llegará un correo en los próximos minutos con todos los datos",
            icon: "success",
            draggable: true
        });
    }

    return (
        <div className="mt-20">
            <div className="flex justify-center">
                <Link className="rounded-2xl text-3xl bg-green-400 p-1 mb-4" to={"/eventos"}> ◄◄ Volver ◄◄ </Link>
            </div>
            <div className="px-5 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 mt-5" key={evento.id}>
                <img className="w-full h-150 object-cover" src={evento.main_image} alt={"name"} />
                <div className="p-5">
                    <h2 className="text-2xl font-bold ">{evento.title}</h2>
                    <p className="mt-2 ">{evento.description}</p>
                    <div className="mt-4 border-t pt-4 dark:border-gray-600">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span>tipo event:</span>{evento.access_type}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span>fecha evento: </span>{evento.date_start.slice(0, 10)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center cursor-pointer">
                <div
                    onClick={handleSubmit}
                    className="rounded-2xl w-1/2  bg-green-300 text-5xl font-bold text-center mt-5  hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-1"
                >
                    + Unirse al evento
                </div>
            </div>
        </div>
    )
}