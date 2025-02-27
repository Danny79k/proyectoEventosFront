import useFetch from "./useFetch";
import Loading from "./Loading";
import Error from "./Error";
import { useContext, useEffect, useState } from "react";
// import { Star } from "lucide-react";
import { UserContext } from "../utils/Context";
import Swal from "sweetalert2";

export default function ComentariosAsociacion({ params }) {

    // const [rating, setRating] = useState(0);
    // const [hover, setHover] = useState(0);
    const { user } = useContext(UserContext)

    const [formData, setFormData] = useState({
        score: "",
        text: "",
        user_id: user?.id || "",
        commentable_type: "association",
        commentable_id: params,
    });


    const { data, loading, error } = useFetch(`https://jeffrey.informaticamajada.es/api/association/${params}/comments`)
    if (loading) return (<div className="mt-5"> <Loading /></div>)
    if (error) return (<div className="mt-5"> <Error /></div>)

    const comments = data.data
    console.log(data);
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
        console.log(formData);
        try {
            await fetch("https://jeffrey.informaticamajada.es/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include" // Necesario para enviar cookies de sesión
            });

            const csrfToken = getCsrfTokenFromCookies();
            if (!csrfToken) {
                throw new Error("No se pudo obtener el token XSRF");
            }

            const response = await fetch(`https://jeffrey.informaticamajada.es/api/association/${params}/comments`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrfToken // Incluye el token XSRF en las cabeceras
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('No autorizado o error en la solicitud');
            }

            Swal.fire({
                title: "Mensaje enviado",
                icon: "success",
                draggable: true
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: "Error al enviar el mensaje",
                text: error.message,
                icon: "error",
                draggable: true
            });
        }

    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div>
                {comments.length != 0 ?
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-3">Comentarios</h2>
                        <div className="space-y-3">
                            {comments.map((comment, index) => (
                                <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                                    <p className="text-sm text-gray-700">Puntuación: {comment.score}</p>
                                    <p className="text-sm text-gray-700">{comment.text}</p>
                                    {/* <p className="text-xs text-gray-500 mt-1">🗓 {comment.date}</p> */}
                                </div>
                            ))}
                        </div>

                    </div>

                    :
                    <div className="text-center p-5">
                        <h1 className="font-bold text-3xl">Esta asociación aún no tiene comentarios</h1>
                        <p className="text-2xl">¡Se el primer comentario!</p>
                    </div>
                }
            </div>
            <div className=" mx-auto bg-white shadow-lg rounded-lg p-4 mt-10 mb-6">
                <h2 className="text-lg font-semibold mb-2">Deja tu comentario</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <textarea
                        name="text"
                        className="w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-400"
                        rows="4"
                        placeholder="Escribe tu comentario aquí..."
                        value={formData.text}
                        onChange={handleChange}
                    />
                    {/* <div className="flex space-x-1 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                className={`text-yellow-400 transition ${(hover || rating) >= star ? "opacity-100" : "opacity-10"
                                    }`}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => {
                                    setRating(star);
                                    // onRate && onRate(star);
                                }}
                            >
                                <Star size={30} fill="currentColor" stroke="none" />
                            </button>
                        ))}
                    </div> */}
                    <label className="block font-semibold">Puntuación:</label>
                    <select
                        name="score"
                        value={formData.score}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="">Selecciona una puntuación</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Enviar Comentario
                    </button>
                </form>
            </div>
        </div >
    )
}