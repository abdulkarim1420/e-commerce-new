import NavBar from "../../Components/Website/NavBar";
import { Outlet } from "react-router-dom";

export default function Website() {

    return (
        <>
        <NavBar />
        <Outlet />
        </>
    )
}