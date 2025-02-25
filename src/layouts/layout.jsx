import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";




export default function Layout() {


    return (
        <>
            <div className={(localStorage.getItem("theme") === "light")}>
                <NavBar />
                <Outlet>

                </Outlet>
                <Footer />
            </div>
        </>
    )
}