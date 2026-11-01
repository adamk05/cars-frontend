import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import type { Car } from "../models/car";
import { getCarById } from "../services/car.service";

export default function CarDetailPage() {

    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        async function fetchCar() {
            try {
                const fetchedCar = await getCarById(id!, controller.signal);
                setCar(fetchedCar);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        const timerId = setTimeout(() => {
            fetchCar();
        }, 1000);

        return () => {
            clearTimeout(timerId);
            controller.abort();
        };
    }, [id]);
    return (
        <div className="flex flex-row flex-wrap p-10 gap-10 w-full h-full">
            {loading && <span className="text-2xl">Loading car details...</span>}
            {error && <span className="text-2xl">{error.message}</span>}
            {!car && !loading && !error && <span className="text-2xl">Car not found</span>}
            {car !== null && !loading && !error && <div className="flex flex-col w-full rounded-2xl p-5 bg-blue-200">
                <span className="w-full text-xl">Brand: {car!.brand}</span>
                <span className="w-full text-xl">Model: {car!.model}</span>
                <span className="w-full text-xl">AFC: {car!.averageFuelConsumption}</span>
                <span className="w-full text-xl">Doors: {car!.doorsNumber}</span>
                <span className="w-full text-xl">Engine Capacity: {car!.engineCapacity}</span>
                <span className="w-full text-xl">Fuel Type: {car!.fuelType}</span>
                <span className="w-full text-xl">Luggage Capacity: {car!.luggageCapacity}</span>
                <span className="w-full text-xl">Produced: {car!.productionDate}</span>
                <NavLink to={`/cars/${id}/edit`} className="text-center w-20 bg-blue-800 rounded-xl p-2 text-white hover:bg-blue-950">Edit</NavLink>
            </div>

            }
        </div>
    );
}