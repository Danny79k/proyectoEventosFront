import { useState } from "react";
import Swal from "sweetalert2";


export default function NuevoAsociacion() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        phone: "",
        email: "",
        type: "",
        maxMembers: "",
    });

    const types = ["Tipo 1", "Tipo 2", "Tipo 3", "Otro"]; // Puedes personalizar estos valores

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);
        Swal.fire({
            title: "Asociación creada",
            icon: "success",
            draggable: true
        });
    };

    return (
        <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-20">
            <h2 className="text-2xl font-bold mb-4">Formulario</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <div>
                    <label className="block font-semibold">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
                        value={formData.description}
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
                        value={formData.phone}
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
                        value={formData.email}
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
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="">Selecciona un tipo</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Checkbox de miembros máximos */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="maxMembersEnabled"
                        checked={formData.maxMembersEnabled}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="font-semibold">Limitar miembros máximos</label>
                </div>

                {/* Input de número si el checkbox está activo */}
                {formData.maxMembersEnabled && (
                    <div>
                        <label className="block font-semibold">Número máximo de miembros:</label>
                        <input
                            type="number"
                            name="maxMembers"
                            value={formData.maxMembers}
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