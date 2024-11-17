import { Outlet } from "react-router-dom";
import TopBar from "../../Components/Dashboard/TopBar";
import SideBar from "../../Components/Dashboard/SideBar";
import "./dashboard.css"


export default function Dashboard() {
    return (
        <div className="position-relative">
            <TopBar />
            <div className="dashboard d-flex gap-1" style={{  marignTop: "70px" }}>
                <SideBar />
                <div className="outlet-card shadow-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}