import useFetch from "../components/useFetch"
import Loading from "../components/Loading"
import Error from "../components/Error"
import CarruselEvent from "../components/CarruselEvent"
import { EventContext } from "../utils/Context"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Eventos() {

    const { setEventos } = useContext(EventContext)
    const [eventosLocal, setEventosLocal] = useState([])
    const { data, loading, error } = useFetch("https://jeffrey.informaticamajada.es/api/events")


    useEffect(() => {
        if (data) setEventos(data)
    })

    useEffect(() => {
        const eventosGuardados = JSON.parse(localStorage.getItem("ultimosEventos")) || []
        setEventosLocal(eventosGuardados)
    }, [])

    if (loading) return (<div className="mt-20"><Loading /></div>)
    if (error) return (<div className="mt-20"><Error /></div>)
    const eventos = data.data

    let ultimosEventos = ""

    if (!eventosLocal.length == 0) {
        ultimosEventos = <CarruselEvent eventosLocal={eventosLocal}></CarruselEvent>
    }

    return (
        <div className="mt-20">
            {ultimosEventos}
            <h1 className="text-center text-5xl">Todos los eventos</h1>
            <div className="grid grid-cols-3 gap-2 mt-5">
                {eventos.map(evento => {
                    return (
                        <Link className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700" key={evento.id} to={`/evento/${evento.id}`}>
                            <img className="w-full h-48 object-cover" src={evento.main_image} alt={"name"} />
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
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}