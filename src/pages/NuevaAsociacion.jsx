import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext, TypeContext } from "../utils/Context";


export default function NuevoAsociacion() {
    const { user } = useContext(UserContext)
    const [preview, setPreview] = useState(null);
    const { data, loading, error } = useContext(TypeContext)
    const [types, setTypes] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        max_members: "",
        telephone: "",
        email: "",
        main_image: "",
        type_id: "",
        user_id: user?.id || "",
        maxMembersEnabled: "",
    })

    useEffect(() => {
        if (data?.data) setTypes(data.data)
    }, [data])


    if (loading) return (<div>Loading...</div>)
    if (error) return (<div>error...</div>)

    console.log(types)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFormData({ ...formData, main_image: file });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const getCsrfTokenFromCookies = () => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "XSRF-TOKEN") {
                return decodeURIComponent(value);
            }
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch("https://jeffrey.informaticamajada.es/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include" // Necesario para enviar cookies de sesión
            });

            const csrfToken = getCsrfTokenFromCookies();
            if (!csrfToken) {
                throw new Error("No se pudo obtener el token XSRF");
            }

            const formDataAso = new FormData();
            for (const key in formData) {
                formDataAso.append(key, formData[key]);
            }

            for (let pair of formDataAso.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await fetch('https://jeffrey.informaticamajada.es/api/associations', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": csrfToken // Incluye el token XSRF en las cabeceras
                },
                body: formDataAso,
            });

            if (!response.ok) {
                throw new Error('No autorizado o error en la solicitud');
            }

            Swal.fire({
                title: "Asociación creada",
                icon: "success",
                draggable: true
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: "Error al crear la asociación",
                text: error.message,
                icon: "error",
                draggable: true
            });
        }

    };



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
                        type="number"
                        name="telephone"
                        value={formData.telephone}
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
                            name="max_members"
                            value={formData.max_members | ""}
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
            <div className="mt-3 text-gray-500">
                <p>*: Imagen Principal es la imagen que se mostrará de cara al público en el sitio. Podrá subir más imagenes de la asociación. </p>
            </div>
        </div>
    );
}