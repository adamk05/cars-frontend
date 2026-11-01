import { NavLink, Outlet } from "react-router";

export default function RootLayout() {
    return (
        <>
            <main>
                <nav className="flex flex-row w-screen h-12 bg-blue-900 items-center">
                    <NavLink className="flex items-center justify-center text-center h-full hover:bg-blue-950 text-gray-200 font-bold text-xl px-10" to="/cars">Cars</NavLink>
                    <NavLink className="flex items-center justify-center text-center h-full hover:bg-blue-950 text-gray-200 font-bold text-xl px-10 color-white" to="/cars/new">New car</NavLink>
                </nav>
                <Outlet />
            </main>
        </>
    );
}