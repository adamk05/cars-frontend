import { useState } from "react";
import type { NewCar } from "../models/car";
import { createCar } from "../services/carService";
import { useNavigate } from "react-router";

export default function CreateCarPage() {
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

    async function addCar(carData: NewCar) {
        await createCar(carData);
    }   

    function handleChange(e: any) {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            const carData: NewCar = {
                ...formData,
                doorsNumber: Number(formData.doorsNumber),
                luggageCapacity: Number(formData.luggageCapacity),
                engineCapacity: Number(formData.engineCapacity),
                fuelType: Number(formData.fuelType),
                averageFuelConsumption: Number(formData.averageFuelConsumption),
                bodyType: Number(formData.bodyType),
            };
            await addCar(carData);
            navigate('/cars');
        } catch (error: any) {
            alert(error.message || 'Blad podczas dodawania samochodu');
        }
    };

    return (
        <div className="flex flex-row flex-wrap p-10 gap-10 w-full h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Car</h2>

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
