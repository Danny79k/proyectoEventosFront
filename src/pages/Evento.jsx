import { useParams, Link } from "react-router-dom"
import { EventContext } from "../utils/Context"
import { useContext } from "react"

export default function Evento() {

    const { eventos } = useContext(EventContext)
    const params = useParams()
    const evento = eventos.data[params.id - 1]

    if (localStorage.getItem("ultimosEventos")) {
        const eventosLocal = JSON.parse(localStorage.getItem("ultimosEventos"))
        if(!eventosLocal.some(event => event.id == evento.id)){
            const nuevosEventos = [...eventosLocal, evento]
            localStorage.setItem("ultimosEventos", JSON.stringify(nuevosEventos))
        }
    }else{
        console.log(evento);
        const nuevoEvento = [evento]
        localStorage.setItem("ultimosEventos", JSON.stringify(nuevoEvento))
    }

    return (
        <div className="mt-20">
            <Link className="rounded-2xl text-3xl bg-green-400 p-1 mb-4" to={"/eventos"}> ◄◄ Volver ◄◄ </Link>
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
        </div>
    )
}