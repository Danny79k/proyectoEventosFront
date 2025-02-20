import { useContext, useState } from "react";
import { LightContext } from "../App";
import Swal from "sweetalert2";

export default function NuevoEvento() {



    const { light } = useContext(LightContext)

    const [formData, setFormData] = useState({
        title: "",
        date_start: "",
        date_end: "",
        description: "",
        accessType: "publico",
        eventType: "",
    });

    const eventTypes = [
        "Conferencia",
        "Concierto",
        "Exposición",
        "Taller",
        "Deportivo",
        "Festival",
    ];



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
        <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-20">
            <h2 className="text-2xl font-bold mb-4">Crear Evento</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="">
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
                        <option value="publico">Público</option>
                        <option value="anticipado">Anticipado</option>
                        <option value="exclusivo">Exclusivo</option>
                    </select>
                </div>

                {/* Tipo de evento */}
                <div>
                    <label className="block font-semibold">Tipo de evento:</label>
                    <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg ${(!light) ? "bg-amber-50" : "bg-gray-900"}`}
                    >
                        <option value="">Selecciona un tipo</option>
                        {eventTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-semibold">Imagen</label>

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