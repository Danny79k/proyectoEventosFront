// import useFetch from "../components/useFetch"
import Loading from "../components/Loading"
import Error from "../components/Error"
import CarruselEvent from "../components/CarruselEvent"
import { EventContext } from "../utils/Context"
import { useContext, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

export default function Eventos() {

    const { data, loading, error } = useContext(EventContext)
    const [eventosLocal, setEventosLocal] = useState([])
    const [eventos, setEventos] = useState([])
    const [searchEventos, setSearchEventos] = useSearchParams()
    
    useEffect(() => {
        if (data?.data) setEventos(data.data);
    }, [data]);


    useEffect(() => {
        const eventosGuardados = JSON.parse(localStorage.getItem("ultimosEventos")) || []
        setEventosLocal(eventosGuardados)
    }, [])

    const handleChange = (e) => {
        setSearchEventos({ filter: e.target.value })
    }

    console.log(eventos)

    const eventosData = eventos || [];
    const filtered = searchEventos.get('filter') || ''
    const eventosFiltrados = eventosData.filter((eve) => eve.title.toLowerCase().includes(filtered.toLowerCase()))

    if (loading) return (<div className="mt-20"><Loading /></div>)
    if (error) return (<div className="mt-20"><Error /></div>)

    let ultimosEventos = ""

    if (!eventosLocal.length == 0) {
        ultimosEventos = <CarruselEvent eventosLocal={eventosLocal}></CarruselEvent>
    }

    return (
        <div className="mt-20">
            {ultimosEventos}
            <div className="w-screen flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar evento..."
                    className="bg-amber-400 py-2 text-center border-2 rounded-2xl w-96 border-amber-800 focus:outline-none"
                    value={searchEventos.get('filter') || ""}
                    onChange={handleChange}
                />
            </div>
            <h1 className="text-center text-5xl font-semibold mb-6">Todos los eventos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                {eventosFiltrados.map(evento => {
                    return (
                        <Link
                            className="group max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105 transform transition-all"
                            key={evento.id}
                            to={`/evento/${evento.id}`}
                        >
                            <img 
                                className="w-full h-48 object-cover group-hover:opacity-80 transition-all"
                                src={evento.main_image}
                                alt={evento.title}
                            />
                            <div className="p-5">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-amber-500 transition-all">
                                    {evento.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{evento.description}</p>
                                <div className="mt-4 border-t pt-4 dark:border-gray-600">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Tipo de evento:</span> {evento.access_type}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Fecha:</span> {evento.date_start.slice(0, 10)}
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