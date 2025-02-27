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
<div className="mt-10">
    <div className="flex justify-center mb-4">
        <Link
            className="rounded-2xl text-xl bg-green-400 p-2 mb-4 hover:bg-green-500 hover:text-white transition-colors duration-300 ease-in-out"
            to={"/eventos"}
        >
            ◄◄ Volver ◄◄
        </Link>
    </div>

    <div className="px-5 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 mt-5 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <img
            className="w-full h-48 object-cover rounded-t-2xl transition-all duration-300 group-hover:opacity-80"
            src={evento.main_image}
            alt={evento.title}
        />
        <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-green-500 transition-all duration-300 ease-in-out">
                {evento.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{evento.description}</p>
            <div className="mt-3 border-t pt-3 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Tipo de evento:</span> {evento.access_type}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Fecha del evento:</span> {evento.date_start.slice(0, 10)}
                </p>
            </div>
        </div>
    </div>

    <div className="flex justify-center mt-4">
        <div
            onClick={handleSubmit}
            className="rounded-2xl w-2/3 py-2 text-xl font-bold text-center bg-green-300 hover:bg-green-500 hover:text-white hover:border-green-500 hover:border-2 transition-all duration-300 ease-in-out cursor-pointer"
        >
            + Unirse al evento
        </div>
    </div>
</div>


    )
}