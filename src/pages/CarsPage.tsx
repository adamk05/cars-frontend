import axios from 'axios';
import { useEffect, useState } from "react";
import type { Car } from "../models/car";
import { deleteCar, getCars } from "../services/carService";
import CarCard from '../components/CarCard';
import { useCarUiStore } from '../store/useCarUiStore';

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const searchTerm = useCarUiStore((state) => state.searchTerm);
    const setSearchTerm = useCarUiStore((state) => state.setSearchTerm);
    const showFavoritesOnly = useCarUiStore((state) => state.showFavoritesOnly);
    const setShowFavoritesOnly = useCarUiStore((state) => state.setShowFavoritesOnly);
    const favoriteCarIds = useCarUiStore((state) => state.favoriteCarIds);
    const removeFavorite = useCarUiStore((state) => state.removeFavorite);

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const filteredCars = cars.filter((car) => {
        const matchesSearchTerm =
            car.brand.toLowerCase().includes(normalizedSearchTerm) ||
            car.model.toLowerCase().includes(normalizedSearchTerm);

        const isFavorite = favoriteCarIds.includes(car.id);

        return matchesSearchTerm && (!showFavoritesOnly || isFavorite);
    });

    useEffect(() => {
        const controller = new AbortController();

        async function loadCars() {
            try {
                setLoading(true);
                setError(null);

                const loadedCars = await getCars(controller.signal);
                setCars(loadedCars);
            } catch (caughtError) {
                if (axios.isCancel(caughtError)) {
                    return;
                }

                if (caughtError instanceof Error) {
                    setError(caughtError.message);
                } else {
                    setError('Wystapil nieznany blad.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadCars();

        return () => {
            controller.abort();
        };
    }, []);

    async function deleteCarClick(id: string) {
        const confirmed = window.confirm('Are you sure you want to delete this car?');
        if (confirmed) {
            try {
                await deleteCar(id);
                removeFavorite(id);
                setCars((currentCars) => currentCars.filter((car) => car.id !== id));
            } catch (e: any) {
                window.alert(e?.message || "Error occurred while deleting car");
            }
        }
    }

    return (
        <div className="flex flex-row flex-wrap p-10 gap-10 w-full h-full">
            {loading && <span className="text-2xl">Loading cars ...</span>}
            {error && <span className="text-2xl text-red-600">{error}</span>}
            {cars.length === 0 && !loading && !error && <span className="text-2xl">No cars found</span>}
            {cars && cars.length > 0 && !loading && !error && <div className="flex flex-row gap-5 w-full">
                <input className='w-1/4' type="search" placeholder="Search by brand or model" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <label className='w-1/4'>
                    <input type="checkbox" checked={showFavoritesOnly} onChange={(e) => setShowFavoritesOnly(e.target.checked)} />
                    Show favorites only
                </label>
            </div>}
            {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} onDelete={deleteCarClick} />
            ))}
        </div>
    );
}
