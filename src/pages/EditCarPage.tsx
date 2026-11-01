import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Car, NewCar } from "../models/car";
import { getCarById, updateCar } from "../services/car.service";

export default function EditCarPage() {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        doorsNumber: 0,
        luggageCapacity: 0,
        engineCapacity: 0,
        fuelType: 0,
        productionDate: '',
        averageFuelConsumption: 0,
        bodyType: 0
    });
    const navigate = useNavigate();

    const { id } = useParams();
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCar() {
            try {
                const fetchedCar = await getCarById(id!, controller.signal);
                setCar(fetchedCar);
                setFormData({
                    brand: fetchedCar?.brand || '',
                    model: fetchedCar?.model || '',
                    doorsNumber: fetchedCar?.doorsNumber || 0,
                    luggageCapacity: fetchedCar?.luggageCapacity || 0,
                    engineCapacity: fetchedCar?.engineCapacity || 0,
                    fuelType: fetchedCar?.fuelType || 0,
                    productionDate: fetchedCar?.productionDate || '',
                    averageFuelConsumption: fetchedCar?.averageFuelConsumption || 0,
                    bodyType: fetchedCar?.bodyType || 0
                });
            } catch (error: any) {
                console.error(error);
            }
        }

        fetchCar();

        return () => { controller.abort(); };
    }, [id]);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function handleSubmit(e: any) {
        async function editCar(carData: NewCar) {
            await updateCar(id!, carData);
        }
        e.preventDefault();
        const carData = formData as NewCar;
        await editCar(carData);
        navigate(`/cars/${id}`);
    };

    return (
        <div className="flex flex-row flex-wrap p-10 gap-10 w-full h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Car</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Model</label>
                    <input type="text" name="model" value={formData.model} onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Production Date</label>
                    <input type="date" name="productionDate" value={formData.productionDate} onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Number of Doors</label>
                    <input type="number" name="doorsNumber" value={formData.doorsNumber} onChange={handleChange} min="0"
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>


                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Luggage Capacity (L)</label>
                    <input type="number" name="luggageCapacity" value={formData.luggageCapacity} onChange={handleChange} min="0"
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Engine Capacity (cc)</label>
                    <input type="number" name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} min="0"
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Avg. Fuel Consumption (L/100km)</label>
                    <input type="number" name="averageFuelConsumption" value={formData.averageFuelConsumption} onChange={handleChange} step="0.1" min="0"
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                    <select name="fuelType" value={formData.fuelType} onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value={0}>Gasoline</option>
                        <option value={1}>Diesel</option>
                        <option value={2}>Electric</option>
                        <option value={3}>Hybrid</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Body Type</label>
                    <select name="bodyType" value={formData.bodyType} onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value={0}>Sedan</option>
                        <option value={1}>SUV</option>
                        <option value={2}>Hatchback</option>
                        <option value={3}>Coupe</option>
                        <option value={4}>Wagon</option>
                    </select>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors">
                        Save Car
                    </button>
                </div>

            </form>
        </div>
    );
}