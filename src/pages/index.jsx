import Header from "../components/Header"
export default function Index() {
    return (
        <>
            <Header
                img1={"https://www.puertodelrosario.org/wp-content/uploads/media/k2/items/src/41906b6135338dfc4eaef88f99636113-1024x675.jpg"}
                img2={"https://www.puertodelrosario.org/wp-content/uploads/media/k2/items/src/9845d3c220e6e5674241ce626189d694.jpg"}
                img3={"https://www.diariodeavila.es/media/IMG/2024/CBF5CED0-F5C5-EB6C-CC04E9B36B7E3F41.JPG"}
                text={"Asociaciones"} />
            <div className="bg-gray-100 min-h-screen">
                {/* Hero Section */}
                <div className="relative h-[500px] flex items-center justify-center text-center text-white">
                    <img
                        src="https://source.unsplash.com/1600x900/?community,people"
                        alt="Community"
                        className="absolute inset-0 w-full h-full object-cover brightness-50"
                    />
                    <div className="relative z-10">
                        <h1 className="text-5xl font-extrabold">Explora Asociaciones & Eventos</h1>
                        <p className="text-lg mt-4 max-w-2xl mx-auto">
                            Únete a comunidades, descubre eventos exclusivos y conecta con personas con tus mismos intereses.
                        </p>
                        <a to="/explorar" className="mt-6 px-6 py-3 bg-yellow-500 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-600">
                            Explorar Ahora
                        </a>
                    </div>
                </div>

                {/* Sección de Asociaciones */}
                <div className="container mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold text-center mb-6">Descubre Asociaciones</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Tech Innovators",
                                img: "https://source.unsplash.com/400x300/?technology",
                                desc: "Un grupo de apasionados por la innovación y la tecnología.",
                            },
                            {
                                name: "Green Earth",
                                img: "https://source.unsplash.com/400x300/?nature",
                                desc: "Promoviendo la sostenibilidad y el cuidado del medio ambiente.",
                            },
                            {
                                name: "Art & Creativity",
                                img: "https://source.unsplash.com/400x300/?art",
                                desc: "Un espacio para artistas, diseñadores y creativos.",
                            },
                        ].map((aso, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={aso.img} alt={aso.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold">{aso.name}</h3>
                                    <p className="text-gray-600 mt-2">{aso.desc}</p>
                                    <a to="/asociaciones" className="block mt-4 text-blue-500 font-semibold">
                                        Ver más →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de Eventos */}
                <div className="container mx-auto px-6 py-12 bg-gray-50">
                    <h2 className="text-3xl font-bold text-center mb-6">Próximos Eventos</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Conferencia de Innovación",
                                date: "15 de Marzo, 2025",
                                img: "https://source.unsplash.com/400x300/?conference",
                            },
                            {
                                name: "Festival de Arte Urbano",
                                date: "22 de Abril, 2025",
                                img: "https://source.unsplash.com/400x300/?festival",
                            },
                            {
                                name: "Maratón Solidario",
                                date: "10 de Mayo, 2025",
                                img: "https://source.unsplash.com/400x300/?sports",
                            },
                        ].map((event, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={event.img} alt={event.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold">{event.name}</h3>
                                    <p className="text-gray-600">{event.date}</p>
                                    <a to="/eventos" className="block mt-4 text-blue-500 font-semibold">
                                        Más información →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-yellow-500 text-center py-12 mt-12">
                    <h2 className="text-3xl font-bold text-white">¿Tienes una asociación o evento?</h2>
                    <p className="text-white mt-2">Regístralo y llega a más personas interesadas.</p>
                    <a to="/crear" className="mt-4 px-6 py-3 bg-white text-yellow-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200">
                        Crear Ahora
                    </a>
                </div>
            </div>
        </>
    )
}