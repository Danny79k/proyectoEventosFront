import { Link } from "react-router-dom"
import { AsociationContext, UserContext } from "../utils/Context"
import { useContext } from "react"
import useFetch from "../components/useFetch"
import Loading from "../components/Loading"
import Error from "../components/Error"

export default function MisAsociaciones() {

    const { user } = useContext(UserContext)
    const { data, loading, error } = useFetch(`https://jeffrey.informaticamajada.es/api/user/${user.id}/associations`)

    if (loading) return (<div className="mt-20"><Loading /></div>)
    if (error) return (<div className="mt-20"><Error /></div>)

    console.log(data);
    return (
        <div className="mt-20">
            <div>
                <h1 className="text-6xl text-center">Todas mis asociaciones</h1>
                <div className="flex flex-warp items-center">
                    <div className="bg-green-500 text-white text-4xl rounded-full border-2 border-green-600 w-16 h-16 flex justify-center items-center shadow-lg hover:bg-green-600 transition">
                        <Link to={'/nueva-asociacion'}>+</Link>
                    </div>
                    {data.data.map(aso => {
                        return (
                            <div key={aso.id} className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                <Link to={`/asociacion/${aso.id}`}>
                                    <img className="w-full h-48 object-cover" src={`https://jeffrey.informaticamajada.es/storage/${aso.main_image}`} alt={"name"} />
                                    <div className="p-5">
                                        <h2 className="text-2xl font-bold ">{aso.name}</h2>
                                        <p className="mt-2 ">{aso.description}</p>
                                    </div>
                                </Link>
                                <div className="mt-4 border-t p-4 text-center  dark:border-gray-600">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        📧 <a href={`mailto:${aso.email}`} className="text-blue-500 hover:underline">{aso.email}</a>
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        📞 <a href={`tel:${aso.telephone}`} className="text-blue-500 hover:underline">{aso.telephone}</a>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <h1 className="text-6xl text-center">Asociaciones miembro</h1>
            </div>
        </div>
    )
}
