import useFetch from "../components/useFetch"
import Loading from "../components/Loading"
import Error from "../components/Error"
import { Link } from "react-router-dom"

export default function MisEventos() {


    const { data, loading, error } = useFetch("https://jeffrey.informaticamajada.es/api/events/users")

    if (loading) return (<div className="mt-20"><Loading /></div>)
    if (error) return (<div className="mt-20"><Error /></div>)

    console.log(data);
    return (
        <div>
            <h1>Mis eventos</h1>
            {data.data.map(evento => {
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
    )
}