import useFetch from "../components/useFetch"
import Loading from "../components/Loading"
import Error from "../components/Error"

export default function Asociaciones() {

    const { data, loading, error } = useFetch("https://jeffrey.informaticamajada.es/api/associations")

    if (loading) return (<div className="mt-20"><Loading /></div>)
    if (error) return (<div className="mt-20"><Error/></div>)
    const asociations = data.data
    console.log(asociations);
    return (
        <div className="mt-20">
            <h1 className="text-center text-5xl">Asociaciones</h1>
            <div className="flex flex-wrap justify-center mt-6">
                {asociations.map(aso => {
                    return (
                        <div className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700" key={aso.id}>
                            <img className="w-full h-48 object-cover" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s"} alt={"name"} />
                            <div className="p-5">
                                <h2 className="text-2xl font-bold ">{aso.name}</h2>
                                <p className="mt-2 ">{aso.description}</p>
                                <div className="mt-4 border-t pt-4 dark:border-gray-600">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        📧 <a href={`mailto:${aso.email}`} className="text-blue-500 hover:underline">{aso.email}</a>
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        📞 <a href={`tel:${aso.telephone}`} className="text-blue-500 hover:underline">{aso.telephone}</a>
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