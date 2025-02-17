import useFetch from "../components/useFetch"
import Loading from "../components/Loading"

export default function Eventos() {

    const { data, loading, error } = useFetch("https://jeffrey.informaticamajada.es/api/events")

    if (loading) return (<><Loading /></>)
    if (error) return (<>ERROR</>)
    const eventos = data.data
    console.log(data);

    return (
        <div className="mt-20">
            <div className="grid grid-cols-3 gap-2">
                {eventos.map(evento => {
                    return (
                        <div className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700" key={evento.id}>
                            <img className="w-full h-48 object-cover" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s"} alt={"name"} />
                            <div className="p-5">
                                <h2 className="text-2xl font-bold ">{evento.title}</h2>
                                <p className="mt-2 ">{evento.description}</p>
                                <div className="mt-4 border-t pt-4 dark:border-gray-600">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span>tipo event:</span>{evento.access_type}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span>fecha evento: </span>{evento.date_start.slice(0,10)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}