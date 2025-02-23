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

    const [associations, setAssociations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const { data, loading, error } = useFetch("https://jeffrey.informaticamajada.es/api/associations")

    // useEffect(() => {
    //     if (data) setAsociationes(data)
    // })

    useEffect(() => {
        const asociacionesGuardadas = JSON.parse(localStorage.getItem("ultimasAsociaciones")) || []
        setAsociacionesLocal(asociacionesGuardadas)
    }, [])

    // if (loading) return (<div className="mt-20"><Loading /></div>)
    // if (error) return (<div className="mt-20"><Error /></div>)

    useEffect(() => {
        // 1. Obtener el CSRF Token
        fetch('https://jeffrey.informaticamajada.es/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include', // Necesario para enviar cookies de sesión
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener el token CSRF');
                }
                // 2. Hacer la solicitud a la API después de obtener el CSRF Token
                return fetch('https://jeffrey.informaticamajada.es/api/associations', {
                    method: 'GET',
                    credentials: 'include', // Importante para incluir las cookies de sesión
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No autorizado o error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                setAssociations(data); // Almacenar los datos obtenidos
                setLoading(false); // Cambiar estado de carga a false
            })
            .catch(error => {
                setError('Error al obtener asociaciones: ' + error.message);
                setLoading(false); // Finalizar carga con error
            });
    }, []); // El efecto se ejecutará solo una vez al montar el componente

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log(associations)

    let ultimasAsociaciones = ""

    if (!asociacionesLocal.length == 0) {
        ultimasAsociaciones = <CarruselAso asociacionesLocal={asociacionesLocal}></CarruselAso>
    }

    return (
        <div className="mt-20">
            {ultimasAsociaciones}
            <h1 className="text-center text-5xl">Todas las asociaciones</h1>
            <div className="flex flex-wrap justify-center mt-6">
                {associations.map(aso => {
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