import useFetch from "./useFetch";
import Loading from "./Loading";
import Error from "./Error";
import { useState, useContext } from "react";
import { UserContext } from "../utils/Context";


export default function ComentariosEventos({ params }) {

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const { user } = useContext(UserContext)

    const [formData, setFormData] = useState({
        score: "",
        text: "",
        user_id: user.id || "",
        commentable_type: "event",  
        commentable_id: params,
    });

    const { data, loading, error } = useFetch(`https://jeffrey.informaticamajada.es/api/events/${params}/comments`)
    
    if (loading) return (<div className="mt-5"> <Loading /></div>)
    if (error) return (<div className="mt-5"> <Error /></div>)



    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <div>

            </div>
            <div className=" mx-auto bg-white shadow-lg rounded-lg p-4 mt-10">
                <h2 className="text-lg font-semibold mb-2">Deja tu comentario</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <textarea
                        className="w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-400"
                        rows="4"
                        placeholder="Escribe tu comentario aquí..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Enviar Comentario
                    </button>
                </form>
            </div>
        </div>
    )
}

