import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import useFetch from "./useFetch";
import Loading from "./Loading";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configuración de Moment.js para manejar fechas correctamente
moment.locale("es");
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const { data, loading } = useFetch("https://jeffrey.informaticamajada.es/api/events")

    useEffect(() => {
        if (data) fetchEvents();
    }, []);
    if (loading) return (<div className="mt-20"><Loading /></div>)
    console.log(data.data);
    // Función para obtener eventos desde la API
    const fetchEvents = async () => {
        try {
            // Convertir los datos a un formato compatible con el calendario
            const formattedEvents = data.data.map(event => ({
                id: event.id,
                title: event.title,
                start: new Date(event.date_start),
                end: new Date(event.date_end),
            }));

            setEvents(formattedEvents);
        } catch (error) {
            console.error("Error al obtener eventos:", error);
        }
    };

    return (
        <div className="h-[80vh] p-4 bg-white rounded-lg shadow-lg mt-20">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
            />
        </div>
    );
};

export default CalendarComponent;
