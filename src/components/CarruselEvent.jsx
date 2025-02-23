import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function CarruselAso({ eventosLocal }) {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Últimos eventos vistos</h1>
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
                {eventosLocal.map(evento => (
                    <SwiperSlide key={evento.id} className="flex justify-center">
                        <Link className="max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700" key={evento.id} to={`/evento/${evento.id}`}>
                            <img className="w-full h-48 object-cover" src={evento.main_image} alt={"name"} />
                            <div className="p-5">
                                <h2 className="text-2xl font-bold ">{evento.title}</h2>
                                <p className="mt-2 ">{evento.description}</p>
                                <div className="mt-4 border-t pt-4 dark:border-gray-600">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span>tipo event:</span>{evento.access_type}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span>fecha evento: </span>{evento.date_start.slice(0,10)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}