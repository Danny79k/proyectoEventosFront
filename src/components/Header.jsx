

export default function Header ({url, text}){
    return(
        <div
            className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${url}`}}
            // onMouseMove={handleMouseMove}
        >
            <h1
                className="text-white text-6xl tracking-wider mb-6 transform transition-all duration-300"
                style={{
                    // transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    textShadow: "5px 5px 20px rgba(0,0,0,0.7), 0 0 10px rgba(255,255,255,0.4)",
                }}
            >
                {text}
            </h1>
        </div>
    )
}