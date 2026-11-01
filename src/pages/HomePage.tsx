export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-4/5 bg-gray-300 rounded-2xl mt-5 p-10">
                <span className="text-4xl">Welcome to Car Management App</span>
                <span className="text-2xl mt-5">This is a simple application for managing cars. You can view, add, edit, and delete cars from the database.</span>
            </div>
        </div>
    );
}