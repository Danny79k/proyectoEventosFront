import { useParams, Link } from "react-router-dom";
import { AsociationContext } from "../utils/Context";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Asociacion() {
    const { data, loading, error } = useContext(AsociationContext);
    const [asoc, setAsoc] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (data?.data) setAsoc(data.data);
    }, [data]);

    if (loading) return <Loading />;
    if (error) return <div>Error...</div>;

    // Convertir params.id a número y buscar en el array
    const id = Number(params.id);
    const asociacion = asoc.find(a => a.id === id);

    if (!asociacion) {
        return <div className="mt-20 text-center">No se encontró la asociación</div>;
    }

    // Guardar en localStorage asegurando que no sea null
    const asociacionesLocal = JSON.parse(localStorage.getItem("ultimasAsociaciones") || "[]");

    if (!asociacionesLocal.some(aso => aso.id === asociacion.id)) {
        const nuevasAsociaciones = [...asociacionesLocal, asociacion];
        localStorage.setItem("ultimasAsociaciones", JSON.stringify(nuevasAsociaciones));
    }

    return (
        <div className="mt-20 max-w-2xl mx-auto">
        <Link
            className="rounded-2xl text-3xl bg-green-400 p-1 mb-4 text-white hover:bg-green-500 transition"
            to={"/asociaciones"}
        >
            ◄◄ Volver ◄◄
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
                className="w-full h-48 object-cover"
                src={`https://jeffrey.informaticamajada.es/storage/${asociacion.main_image}`}
                alt={asociacion.name}
            />
            <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800">{asociacion.name}</h2>
                <p className="mt-2 text-gray-600">{asociacion.description}</p>
            </div>

            <div className="mt-4 p-5 bg-gray-100 text-center rounded-b-lg">
                <div className="flex justify-center items-center space-x-4">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">📧</span> 
                        <a href={`mailto:${asociacion.email}`} className="text-blue-500 hover:underline">{asociacion.email}</a>
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">📞</span> 
                        <a href={`tel:${asociacion.telephone}`} className="text-blue-500 hover:underline">{asociacion.telephone}</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
}
