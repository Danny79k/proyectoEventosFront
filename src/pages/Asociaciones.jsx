import useFetch from "../components/useFetch"
import Loading from "../components/Loading"
import Error from "../components/Error"
import CarruselAso from "../components/CarruselAso"
import { Link } from "react-router-dom"
import { AsociationContext } from "../utils/Context"
import { useContext, useEffect, useState } from "react"

export default function Asociaciones() {

    const { setAsociationes } = useContext(AsociationContext)
    const [asociacionesLocal, setAsociacionesLocal] = useState([])
    const { data, loading, error } = useFetch("https://jeffrey.informaticamajada.es/api/associations")

    useEffect(() => {
        if (data) setAsociationes(data)
    })

    useEffect(() => {
        const asociacionesGuardadas = JSON.parse(localStorage.getItem("ultimasAsociaciones")) || []
        setAsociacionesLocal(asociacionesGuardadas)
    }, [])

    if (loading) return (<div className="mt-20"><Loading /></div>)
    if (error) return (<div className="mt-20"><Error /></div>)


    const asociations = data.data
    let ultimasAsociaciones = ""

    if (!asociacionesLocal.length == 0) {
        ultimasAsociaciones = <CarruselAso asociacionesLocal={asociacionesLocal}></CarruselAso>
    }

    return (
        <div className="mt-20">
            {ultimasAsociaciones}
            <h1 className="text-center text-5xl">Todas las asociaciones</h1>
            <div className="flex flex-wrap justify-center mt-6">
                {asociations.map(aso => {
                    return (
                        <div key={aso.id} className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <Link to={`/asociacion/${aso.id}`}>
                                <img className="w-full h-48 object-cover" src={aso.main_image} alt={"name"} />
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
    )
}