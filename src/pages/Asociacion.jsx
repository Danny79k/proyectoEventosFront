import { useParams, Link } from "react-router-dom"
import { AsociationContext } from "../utils/Context"
import { useContext } from "react"


export default function Asociacion() {

    const { asociaciones } = useContext(AsociationContext)
    const params = useParams()
    const asociacion = asociaciones.data[params.id - 1]

    if (localStorage.getItem("ultimasAsociaciones")) {
        const asociacionesLocal = JSON.parse(localStorage.getItem("ultimasAsociaciones"))
        console.log(asociacionesLocal)
        if(!asociacionesLocal.some(aso => aso.id == asociacion.id)){
            const nuevasAsociaciones = [...asociacionesLocal, asociacion]
            localStorage.setItem("ultimasAsociaciones", JSON.stringify(nuevasAsociaciones))
        }
    }else{
        console.log(asociacion);
        const nuevaAsociacion = [asociacion]
        localStorage.setItem("ultimasAsociaciones", JSON.stringify(nuevaAsociacion))
    }

    
    return (
        <div className="mt-20">
            <Link className="rounded-2xl text-3xl bg-green-400 p-1 mb-4" to={"/asociaciones"}> ◄◄ Volver ◄◄ </Link>
            <div className="px-5 mt-5">
                <div >
                    <img className="w-full h-150 object-cover" src={`https://jeffrey.informaticamajada.es/storage/${asociacion.main_image}`}  alt={"name"} />
                    <div className="p-5">
                        <h2 className="text-2xl font-bold ">{asociacion.name}</h2>
                        <p className="mt-2 ">{asociacion.description}</p>
                    </div>
                </div>
                <div className="mt-4 border-t p-4 text-center  dark:border-gray-600">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        📧 <a href={`mailto:${asociacion.email}`} className="text-blue-500 hover:underline">{asociacion.email}</a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        📞 <a href={`tel:${asociacion.telephone}`} className="text-blue-500 hover:underline">{asociacion.telephone}</a>
                    </p>
                </div>
            </div>
        </div>
    )
}