import { NavLink } from "react-router";
import type { Car } from "../models/car";
import { useCarUiStore } from "../store/useCarUiStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function CarCard({ car, onDelete }: { car: Car; onDelete: (id: string) => void }) {

    const isFavorite = useCarUiStore((state) => state.favoriteCarIds.includes(car.id));
    const toggleFavorite = useCarUiStore((state) => state.toggleFavorite);

    return (<div key={car.id} className="flex flex-col w-50 rounded-2xl p-5 bg-blue-200">
        <div className="w-full"><FontAwesomeIcon onClick={() => toggleFavorite(car.id)} icon={isFavorite ? solidHeart : regularHeart}></FontAwesomeIcon> </div>
        <span className="w-full text-xl">Brand: {car.brand}</span>
        <span className="w-full text-xl">Model: {car.model}</span>
        <div className="w-full flex flex-row gap-1 mt-3">
            <NavLink to={`/cars/${car.id}`} className="bg-blue-800 rounded-xl p-2 text-white hover:bg-blue-950">Details</NavLink>
            <button onClick={() => onDelete(car.id)} type="button" className="bg-red-800 rounded-xl p-2 text-white hover:bg-red-950">Delete</button>
        </div>
    </div>);
}