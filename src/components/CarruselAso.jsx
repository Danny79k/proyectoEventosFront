import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function CarruselAso({ asociacionesLocal }) {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Últimas asociaciones visitadas</h1>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
                className="pb-10"
            >
                {asociacionesLocal.map(aso => (
                    <SwiperSlide key={aso.id} className="flex justify-center">
                        <div className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <Link to={`/asociacion/${aso.id}`}>
                                <img className="w-full h-48 object-cover" src={aso.main_image} alt={aso.name}
                                />
                                <div className="p-5">
                                    <h2 className="text-2xl font-bold">{aso.name}</h2>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">{aso.description}</p>
                                </div>
                            </Link>
                            <div className="mt-4 border-t p-4 text-center dark:border-gray-600">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    📧 <a href={`mailto:${aso.email}`} className="text-blue-500 hover:underline">{aso.email}</a>
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    📞 <a href={`tel:${aso.telephone}`} className="text-blue-500 hover:underline">{aso.telephone}</a>
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}