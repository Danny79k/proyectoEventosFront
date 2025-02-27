// import useFetch from "../components/useFetch"
import Loading from "../components/Loading"
import Error from "../components/Error"
import CarruselAso from "../components/CarruselAso"
import { Link, useSearchParams } from "react-router-dom"
import { AsociationContext } from "../utils/Context"
import { useContext, useEffect, useState } from "react"

export default function Asociaciones() {

    const { data, loading, error } = useContext(AsociationContext)
    const [asociacionesLocal, setAsociacionesLocal] = useState([])
    const [searchAso, setSearchAso] = useSearchParams()
    const [asociaciones, setAsociaciones] = useState([])

    useEffect(() => {
        if (data?.data) setAsociaciones(data.data)
    }, [data])

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // const { data, loading, error } = useFetch("https://jeffrey.informaticamajada.es/api/associations")

    // useEffect(() => {
    //     if (data) setAsociationes(data)
    // })


    const handleChange = (e) => {
        setSearchAso({ filter: e.target.value })
    }

    console.log(searchAso.get('filter'))

    useEffect(() => {
        const asociacionesGuardadas = JSON.parse(localStorage.getItem("ultimasAsociaciones")) || []
        setAsociacionesLocal(asociacionesGuardadas)
    }, [])

    // if (loading) return (<div className="mt-20"><Loading /></div>)
    // if (error) return (<div className="mt-20"><Error /></div>)

    // useEffect(() => {
    //     // 1. Obtener el CSRF Token
    //     fetch('https://jeffrey.informaticamajada.es/sanctum/csrf-cookie', {
    //         method: 'GET',
    //         credentials: 'include', // Necesario para enviar cookies de sesión
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('No se pudo obtener el token CSRF');
    //             }
    //             // 2. Hacer la solicitud a la API después de obtener el CSRF Token
    //             return fetch('https://jeffrey.informaticamajada.es/api/associations', {
    //                 method: 'GET',
    //                 credentials: 'include', // Importante para incluir las cookies de sesión
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('No autorizado o error en la solicitud');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setAsociationes(data); // Almacenar los datos obtenidos
    //             setLoading(false); // Cambiar estado de carga a false
    //         })
    //         .catch(error => {
    //             setError('Error al obtener asociaciones: ' + error.message);
    //             setLoading(false); // Finalizar carga con error
    //             console.log(error.message);
    //         });
    // }, []); // El efecto se ejecutará solo una vez al montar el componente

    const filtered = searchAso.get('filter') || ''

    const asociacionesFiltradas = asociaciones.filter((aso) => aso.name.toLowerCase().includes(filtered.toLowerCase()))


    if (loading) return (<div className="mt-20"><Loading /></div>)
    if (error) return (<div className="mt-20"><Error /></div>);


    let ultimasAsociaciones = ""

    if (!asociacionesLocal.length == 0) {
        ultimasAsociaciones = <CarruselAso asociacionesLocal={asociacionesLocal}></CarruselAso>
    }

    return (
        <div className="mt-20">
            {ultimasAsociaciones}
            <div className="w-screen flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar asociación..."
                    className="bg-amber-400 py-2 text-center border-2 rounded-2xl w-96 border-amber-800 text-lg"
                    value={searchAso.get('filter') || ""}
                    onChange={handleChange}
                />
            </div>
            <h1 className="text-center text-5xl font-semibold mb-5">Todas las asociaciones</h1>
            <div className="flex flex-wrap justify-center mt-6 gap-6">
                {asociacionesFiltradas.map(aso => {
                    return (
                        <div
                            key={aso.id}
                            className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 group"
                        >
                            <Link
                                to={`/asociacion/${aso.id}`}
                                className="block group-hover:text-green-500 transition-colors duration-300"
                            >
                                <img
                                    className="w-full h-56 object-cover rounded-t-2xl transition-all duration-300 group-hover:scale-105"
                                    src={(aso.main_image) ? `https://jeffrey.informaticamajada.es/storage/${aso.main_image}`: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk57_dSSq3YibwbmuS_Pb7zArnEfQEJ9cHw&s"}
                                    alt={aso.name}
                                />
                                <div className="p-5">
                                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white group-hover:text-green-500 transition-colors duration-300">
                                        {aso.name}
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{aso.description}</p>
                                </div>
                            </Link>
                            <div className="mt-4 border-t p-4 text-center dark:border-gray-600">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    📧 <a href={`mailto:${aso.email}`} className="text-blue-500 hover:underline">{aso.email}</a>
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    📞 <a href={`tel:${aso.telephone}`} className="text-blue-500 hover:underline">{aso.telephone}</a>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>


    )
}