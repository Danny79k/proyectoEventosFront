import { useEffect, useState } from "react";

export default function Header({ img1, img2, img3, text }) {
    const images = [
        img1,
        img2,
        img3,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Cambiar imagen cada 2 segundos

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [images.length]);

    return (
        <div>
            {/* Parallax Background */}
            <div
                className="h-screen bg-cover bg-fixed bg-center relative"
            >
                {/* Carousel */}
                <div className=" h-screen absolute inset-0 flex items-center justify-center">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Slide ${index}`}
                                className={`absolute inset-0 w-full h-full object-cover blur-md transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        ))}
                        <div className="h-screen flex items-center justify-center">
                            <h1 className="text-white text-5xl font-bold borde z-5">{text}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    // return(
    //     <div
    //         className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
    //         style={{ backgroundImage: `url(${url}`}}
    //         // onMouseMove={handleMouseMove}
    //     >
    //         <h1
    //             className="text-white text-6xl tracking-wider mb-6 transform transition-all duration-300"
    //             style={{
    //                 // transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    //                 textShadow: "5px 5px 20px rgba(0,0,0,0.7), 0 0 10px rgba(255,255,255,0.4)",
    //             }}
    //         >
    //             {text}
    //         </h1>
    //     </div>
    // )
}