import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LightContext } from "../App";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function NavBar() {
    const { light, setLight } = useContext(LightContext)
    // const [rotateX, setRotateX] = useState(0);
    // const [rotateY, setRotateY] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [navBg, setNavBg] = useState("bg-transparent");


    // const handleMouseMove = (e) => {
    //     const { innerWidth, innerHeight } = window;
    //     const x = (e.clientX / innerWidth - 0.5) * 30;
    //     const y = (e.clientY / innerHeight - 0.5) * -30;
    //     setRotateX(y);
    //     setRotateY(x);
    // };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                (localStorage.getItem("theme") === "dark") ?
                    setNavBg("bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg text-white")
                    : setNavBg("bg-amber-50 bg-opacity-80 backdrop-blur-md shadow-lg text-gray-900")
            } else {
                setNavBg("bg-transparent text-white");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // useEffect(() => {
    //     if (light) {
    //         localStorage.setItem("theme", "light");
    //     } else {
    //         localStorage.setItem("theme", "dark");
    //     }
    // }, [light]);

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
                        className="lg:hidden p-2 rounded-md focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>

                    {/* Menú para pantallas grandes */}
                    <div className="hidden lg:flex space-x-6">
                        {["", "Link1", "Link2", "Link3"].map((item, index) => (
                            <NavLink
                                key={index}
                                // to={`/${item.toLowerCase()}`}
                                className={({ isActive }) =>
                                    `px-5 py-2 rounded-lg text-xl font-semibold transition-colors duration-300 ${isActive ? "bg-yellow-500 text-gray-900" : "hover:text-black hover:bg-white"
                                    }`
                                }
                            >
                                {(item) ? item : "Inicio"}
                            </NavLink>
                        ))}
                        <button
                            onClick={() => {setLight(!light)
                                if (light) {
                                    localStorage.setItem("theme", "light");
                                } else {
                                    localStorage.setItem("theme", "dark");
                                }
                            }}
                            className="p-2 bg-amber-50 dark:bg-gray-900 rounded-full shadow-md transition-all duration-300"
                        >
                            {!light ? <Moon className="text-blue-500" /> : <Sun className="text-yellow-400" />}
                        </button>
                    </div>
                </div>

                {/* Menú desplegable en móviles */}
                {isOpen && (
                    <div className="lg:hidden flex flex-col items-center space-y-4 py-4 mt-2 rounded-md shadow-md">
                        {["", "Link1", "Link2", "Link3"].map((item, index) => (
                            <NavLink
                                key={index}
                                // to={`/${item.toLowerCase()}`}
                                className="w-full text-center py-3 text-lg font-semibold hover:bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                {(item) ? item : "Inicio"}
                            </NavLink>
                        ))}
                        <button
                            onClick={() => {
                                setLight(!light);
                                setIsOpen(false);
                            }}
                            className="p-2 rounded-full shadow-md transition-all duration-300"
                        >
                            {light ? <Moon className="text-blue-500" /> : <Sun className="text-yellow-400" />}
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
}