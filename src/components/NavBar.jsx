import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LightContext, UserContext } from "../utils/Context";
import { Menu, X, Sun, Moon } from "lucide-react";



export default function NavBar() {
    const { light, setLight } = useContext(LightContext)
    const { user } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [navBg, setNavBg] = useState("bg-transparent");
    const [logout, setLogout] = useState(false)

    const handleLogout = () => {
        setLogout(true)
    }
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const handleLogoutPOST = async () => {
        try {
            // 1. Obtener el token CSRF
            const csrfResponse = await fetch('https://jeffrey.informaticamajada.es/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include',
            });

            if (!csrfResponse.ok) {
                throw new Error('No se pudo obtener el token CSRF');
            }
            console.log(csrfResponse)
            // 2. Realizar el logout
            const logoutResponse = await fetch('https://jeffrey.informaticamajada.es/api/logout', {
                method: 'POST',
                credentials: 'include', // Importante para incluir las cookies de sesión
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'), // Asegúrate de enviar el token CSRF
                },
            });

            if (!logoutResponse.ok) {
                throw new Error('Error durante el logout');
            }

            // 3. Manejar la respuesta exitosa
            console.log('Logout exitoso');
            // Aquí puedes redirigir al usuario o actualizar el estado de tu aplicación
        } catch (error) {
            console.error('Hubo un problema:', error);
            // Manejar errores (mostrar mensaje al usuario, etc.)
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200 || isOpenNav || isOpen) {
                (localStorage.getItem("theme") === "dark") ?
                    setNavBg("bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg text-white")
                    : setNavBg("bg-amber-50 bg-opacity-80 backdrop-blur-md shadow-lg text-gray-900")
            } else {
                setNavBg("bg-transparent text-white text-border");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpenNav, isOpen]);

    return (
        <div
            className=" flex flex-col items-center justify-center bg-cover bg-center"
        >
            <nav className={`fixed top-0 left-0 w-full transition-all duration-300 p-4 ${navBg} z-10`}>
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    {/* Título */}
                    <h2 className="text-2xl font-bold tracking-widest transition-colors duration-300">
                        Asociaciones
                    </h2>

                    {/* Botón del menú hamburguesa */}
                    <button
                        className="lg:hidden p-2 rounded-md focus:outline-none flex text-gray-400 items-center"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {user ? <span className="font-semibold text-2xl">{(user.name).toUpperCase()}</span> : ""}
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>

                    {/* Menú para pantallas grandes */}
                    <div className="hidden lg:flex space-x-6">
                        {["", "Asociaciones", "Eventos"].map((item, index) => (
                            <NavLink
                                key={index}
                                to={`/${item.toLowerCase()}`}
                                className={({ isActive }) =>
                                    `px-5 py-2 rounded-lg text-xl font-semibold transition-colors duration-300 ${isActive ? "bg-yellow-500 text-gray-900" : "hover:text-black hover:bg-white"
                                    }`
                                }
                            >
                                {(item) ? item : "Inicio"}
                            </NavLink>
                        ))}
                        <button
                            onClick={() => {
                                setLight(!light)
                                if (light) {
                                    localStorage.setItem("theme", "light");
                                } else {
                                    localStorage.setItem("theme", "dark");
                                }
                            }}
                            className={`p-2 ${(light) ? "bg-blue-200" : "dark:bg-gray-900"} rounded-full shadow-md transition-all duration-300`}
                        >
                            {!light ? <Moon className="text-blue-500" /> : <Sun className="text-yellow-500" />}
                        </button>
                        <button
                            onClick={() => {
                                setIsOpenNav(!isOpenNav)
                            }}
                            className="flex text-gray-400 items-center"
                        >
                            {user ? <span className="font-semibold text-2xl">{(user.name).toUpperCase()}</span> : ""}
                            {isOpenNav ? <X size={30} /> : <Menu size={30} />}
                        </button>
                    </div>
                </div>


                {/* Menú desplegable en móviles */}
                {isOpen && (
                    <div className="lg:hidden flex flex-col items-center space-y-4 py-4 mt-2 rounded-md shadow-md">
                        {["", "Asociaciones", "Eventos"].map((item, index) => (
                            <NavLink
                                key={index}
                                to={`/${item.toLowerCase()}`}
                                className="w-full text-center py-3 text-lg font-semibold hover:bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                {(item) ? item : "Inicio"}
                            </NavLink>
                        ))}
                        {user ?
                            <>
                                <NavLink to={"/mis-asociaciones"} className="w-full text-center py-3 text-lg font-semibold hover:bg-gray-700">Mis Asociaciones</NavLink>
                                <NavLink to={"#"} className="w-full text-center py-3 text-lg font-semibold hover:bg-gray-700">Mis Eventos</NavLink>
                                <NavLink to={"#"} className="w-full text-center py-3 text-lg font-semibold hover:bg-gray-700">Mi Calendario</NavLink>
                                <form method="get" action="https://jeffrey.informaticamajada.es/logout-user" className="w-full text-center bg-red-500 col-end-1 p-1 hover:border-none rounded-2xl">
                                    <button onClick={handleLogout} >Logout</button>
                                </form>
                            </>
                            :
                            <>
                                <NavLink to={"https://jeffrey.informaticamajada.es/login"} className="w-full text-center py-3 text-lg font-semibold hover:bg-gray-700">Login</NavLink>
                                <NavLink to={"https://jeffrey.informaticamajada.es/register"} className="w-full text-center py-3 text-lg font-semibold hover:bg-gray-700">Sign-In</NavLink>
                            </>

                        }
                        <button
                            className={`p-2 $<form method="get" action="https://jeffrey.informaticamajada.es/logout-user" className="col-end-1">{(light) ? "bg-blue-200" : "dark:bg-gray-900"} rounded-full shadow-md transition-all duration-300`}
                            onTouchStart={() => {
                                setLight(!light)
                                if (light) {
                                    localStorage.setItem("theme", "light");
                                } else {
                                    localStorage.setItem("theme", "dark");
                                }
                            }}
                        >
                            {light ? <Moon className="text-blue-500" /> : <Sun className="text-yellow-400" />}
                        </button>
                    </div>

                )}

            </nav>
            <div className={`transition-all duration-300 ${isOpenNav ? "block" : "hidden"} ${navBg} fixed right-100 top-20 z-20`}>
                <div className={`grid grid-cols-4  p-4 space-y-4 ${navBg}`}>
                    {(user == null) ?
                        <>
                            <NavLink to={"https://jeffrey.informaticamajada.es/login"} className=" hover:text-yellow-5000 col-end-1" onClick={() => setIsOpen(false)}>Login</NavLink>
                            <NavLink to={"https://jeffrey.informaticamajada.es/register"} className=" hover:text-yellow-500 col-end-1" onClick={() => setIsOpen(false)}>Sign in</NavLink>
                        </>
                        :
                        <>
                            <NavLink to={"/mis-asociaciones"} className=" hover:text-yellow-500 col-end-1" onClick={() => setIsOpen(false)}>Mis Asociaciones</NavLink>
                            <NavLink to={"#"} className=" hover:text-yellow-500 col-end-1" onClick={() => setIsOpen(false)}>Mis Eventos</NavLink>
                            <NavLink to={"#"} className=" hover:text-yellow-500 col-end-1" onClick={() => setIsOpen(false)}>Mi Calendario</NavLink>
                            <form method="get" action="https://jeffrey.informaticamajada.es/logout-user" className="bg-red-500 col-end-1 p-1 hover:border-none rounded-2xl">
                                <button onClick={handleLogout} >Logout</button>
                            </form>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}


