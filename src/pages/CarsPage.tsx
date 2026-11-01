import { useEffect, useState } from "react";
import type { Car } from "../models/car";
import { deleteCar, getCars } from "../services/car.service";
import { NavLink } from "react-router";

export default function CarsPage() {

    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(
        () => {
            const controller = new AbortController();
            setLoading(true);
            setError(null);
            async function loadCars() {
                try {
                    const cars = await getCars(controller.signal);
                    setCars(cars);
                } catch (e: any) {
                    if (e.name !== 'AbortError') {
                        setError(e);
                    }
                } finally {
                    setLoading(false);
                }
            }
            setTimeout(loadCars, 2000);
            return () => { controller.abort() };
        }, []
    )

    async function deleteCarClick(id: string) {
        const confirmed = window.confirm('Are you sure you want to delete this car?')
        if (confirmed) {
            try {
                await deleteCar(id);
            } catch (e) {
                window.alert("Error occurred while deleting car");
            }
        }
    }

    return (
        <div className="flex flex-row flex-wrap p-10 gap-10 w-full h-full">
            {loading && <span className="text-2xl">Loading cars ...</span>}
            {error && <span className="text-2xl">{error.message}</span>}
            {cars.length === 0 && !loading && <span className="text-2xl">No cars found</span>}
            {cars.map((car) => (
                <div key={car.id} className="flex flex-col w-50 rounded-2xl p-5 bg-blue-200">
                    <span className="w-full text-xl">Brand: {car.brand}</span>
                    <span className="w-full text-xl">Model: {car.model}</span>
                    <div className="w-full flex flex-row gap-1 mt-3">
                        <NavLink to={`/cars/${car.id}`} className="bg-blue-800 rounded-xl p-2 text-white hover:bg-blue-950">Details</NavLink>
                        <button onClick={() => deleteCarClick(car.id)} type="button" className="bg-red-800 rounded-xl p-2 text-white hover:bg-red-950">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}