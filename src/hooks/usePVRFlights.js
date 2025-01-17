import { useState, useEffect } from "react";
import axios from "axios";

const API_TOKEN = import.meta.env.VITE_API_KEY;

const usePVRFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          'https://fr24api.flightradar24.com/api/live/flight-positions/full',
          {
            headers: {
              'Accept': 'application/json',
              'Accept-Version': 'v1',
              'Authorization': `Bearer ${API_TOKEN}`,
            },
            params: {
              airports: 'inbound:PVR',
              operating_as: "AAL, ASA, SCX, VOI" // Solo vuelos de PVR
            },
          }
        );
        const convertToGMT6 = (utcTimestamp) => {
          const date = new Date(utcTimestamp);
          // Convertir UTC a GMT-6
          date.setHours(date.getUTCHours() - 6);
          // Formatear a 24 horas
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          return `${hours}:${minutes}`;
        };
        
        console.log(response.data);
        // Verificamos si los datos existen y están en el formato esperado
        if (response?.data?.data && Array.isArray(response.data.data)) {
          const mappedFlights = response.data.data.map(flight => ({
            id: "", // ID único
            nombre: "", // Número de vuelo
            aerolinea: flight.operating_as || "Desconocido", // Aerolínea
            noArrival: flight.flight, // Número de vuelo de llegada
            arrivalTime: convertToGMT6(flight.eta), // Hora de llegada estimada
            destinoArrival: flight.orig_iata, // Aeropuerto de destino
            noDeparture: flight.flight, // Número de vuelo de salida (igual al de llegada)
            departureTime: convertToGMT6(flight.timestamp), //La hora Timestamp of the flight position
            destinoDeparture: flight.dest_iata, // Aeropuerto de origen
            serviciosAgente: "", // Espacio para servicios adicionales
            serviciosArrival: "", // Espacio para servicios adicionales
            serviciosDeparture: "", // Espacio para servicios adicionales
            posicion: "", // Latitud y longitud para la posición
          }));

          setFlights(mappedFlights);
        } else {
          setFlights([]); // Si no hay datos o la estructura es incorrecta
        }
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los vuelos.');
        setLoading(false);
        console.error(error);
      }
    };

    fetchFlights();
    const intervalId = setInterval(fetchFlights, 600000); // Actualiza cada 10 minutos

    return () => clearInterval(intervalId); // Limpieza al desmontar el componente
  }, []);

  return { flights, loading, error };
};

export default usePVRFlights;
