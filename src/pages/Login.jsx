import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Index from ".";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {

            await fetch("https://jeffrey.informaticamajada.es/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include", 
            });

            const response = await fetch("https://jeffrey.informaticamajada.es/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"), // 👈 Agregar manualmente el token CSRF
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json(); 

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            localStorage.setItem("token", data.token);
            navigate("/index");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Iniciar Sesión</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1 text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1 text-black"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
