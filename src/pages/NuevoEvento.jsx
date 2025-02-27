import { useContext, useEffect, useState } from "react";
import { TypeContext, LightContext } from "../utils/Context";
import Swal from "sweetalert2";
import '../css/NuevoEventoCss.css'

export default function NuevoEvento() {

    const { light } = useContext(LightContext)
    const [preview, setPreview] = useState(null);
    const { data, loading, error } = useContext(TypeContext)
    const [types, setTypes] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        date_start: "",
        date_end: "",
        description: "",
        accessType: "all",
        eventType: "",
        main_image: "",
    });

    useEffect(() => {
        if (data?.data) setTypes(data.data)
    }, [data])

    if (loading) return (<div>Loading...</div>)
    if (error) return (<div>error...</div>)



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFormData({ ...formData, main_image: file });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);
        Swal.fire({
            title: "Evento creado",
            icon: "success",
            draggable: true
        });
    };

    return (
        <div className="bg-white max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-20">
            <h2 className="text-2xl font-bold mb-4">Crear Evento</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                {/* Título */}
                <div>
                    <label className="block font-semibold">Título del evento:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                {/* Fecha inicio */}
                <div>
                    <label className="block font-semibold">Fecha de inicio:</label>
                    <input
                        type="datetime-local"
                        name="date_start"
                        value={formData.date_start}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"

                    />
                </div>

                {/* Fecha fin */}
                <div>
                    <label className="block font-semibold">Fecha de fin:</label>
                    <input
                        type="datetime-local"
                        name="date_end"
                        value={formData.date_end}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"

                    />
                </div>

                {/* Descripción */}
                <div>
                    <label className="block font-semibold">Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        rows="4"

                    />
                </div>

                {/* Tipo de acceso */}
                <div>
                    <label className="block font-semibold">Tipo de acceso:</label>
                    <select
                        name="accessType"
                        value={formData.accessType}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg ${(!light) ? "bg-amber-50" : "bg-gray-900"}`}
                    >
                        <option value="all">Público</option>
                        <option value="anticipated">Anticipado</option>
                        <option value="exclusive">Exclusivo</option>
                    </select>
                </div>

                {/* Tipo de evento */}
                <div>
                    <label className="block font-semibold">Tipo:</label>
                    <select
                        name="type_id"
                        value={formData.type_id}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="">Selecciona un tipo</option>
                        {types.map(type => (
                            <option key={type.id} value={type.id}>
                                {type.type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col items-center space-y-3 p-4 shadow-md rounded-lg border-1">
                    <label className="font-semibold ">Imagen Principal*</label>

                    {preview && (
                        <img
                            src={preview}
                            alt="Vista previa"
                            className="w-100 h-50 object-cover rounded-lg border"
                        />
                    )}

                    <input
                        type="file"
                        name="main_image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="fileInput"
                    />

                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        📤 Subir Imagen
                    </label>
                </div>

                {/* Botón de enviar */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    Crear Evento
                </button>
            </form>
        </div>
    );
}