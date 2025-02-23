import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useFetch from "../components/useFetchAuth";
import { TypeContext } from "../utils/Context";
import Loading from "../components/Loading";

export default function NuevoAsociacion() {
    const [datas, setDatas] = useState({
        name: "",
        description: "",
        phone: "",
        email: "",
        type: "",
        maxMembers: "",
    });
    const { types, setTypes } = useContext(TypeContext)
    const { data, loading,  error } = useFetch("https://jeffrey.informaticamajada.es/api/types")

    useEffect(() => {
        if (error) setTypes("Error")
    })
    useEffect(() => {
        if(data) setTypes(data)
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDatas((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new formData()
        for (const key in datas) {
            formData.append(key, datas[key]);
        }
        console.log("Formulario enviado:", formData);
        Swal.fire({
            title: "Asociación creada",
            icon: "success",
            draggable: true
        });
    };

    if(loading) return (<Loading />)
    
    console.log(data.data);
    return (
        <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-20">
            <h2 className="text-2xl font-bold mb-4">Formulario</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                {/* Nombre */}
                <div>
                    <label className="block font-semibold">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={datas.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label className="block font-semibold">Descripción:</label>
                    <textarea
                        name="description"
                        value={datas.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        rows="4"
                        required
                    />
                </div>

                {/* Teléfono */}
                <div>
                    <label className="block font-semibold">Teléfono:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={datas.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        pattern="[0-9]{10}"
                        placeholder="Ej: 1234567890"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={datas.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>

                {/* Tipo */}
                <div>
                    <label className="block font-semibold">Tipo:</label>
                    <select
                        name="type"
                        value={datas.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="">Selecciona un tipo</option>
                        {data.data.map(type => (
                            <option key={type.id} value={type.type}>
                                {type.type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Checkbox de miembros máximos */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="maxMembersEnabled"
                        checked={datas.maxMembersEnabled}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="font-semibold">Limitar miembros máximos</label>
                </div>

                {/* Input de número si el checkbox está activo */}
                {datas.maxMembersEnabled && (
                    <div>
                        <label className="block font-semibold">Número máximo de miembros:</label>
                        <input
                            type="number"
                            name="maxMembers"
                            value={datas.maxMembers}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            min="1"
                            required
                        />
                    </div>
                )}

                {/* Botón de enviar */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}