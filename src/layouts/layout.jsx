import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


export default function Layout() {

    return (
        <>
            <div className={(localStorage.getItem("theme") === "light") ? "bg-gradient-to-r from-white to-amber-50 text-gray-900" : "bg-gradient-to-r from-gray-900 to-gray-800 text-white"}>
                <NavBar />
                <Outlet>

                </Outlet>
                <Footer />
            </div>
        </>
    )
}