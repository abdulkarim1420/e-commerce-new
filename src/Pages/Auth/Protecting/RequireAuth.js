import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { Axios } from "../../../Api/axios";
import Err403 from "../Errors/403";

export default function RequireAuth( { allowedRole } ) {

    // User
    const [user, setUser] = useState("");

    // Navigate
    const navigate = useNavigate();

    // Get user data to check
    useEffect(() => {
        Axios.get(`/${USER}`).then((data) => setUser(data.data)).catch(() => navigate("/login", { replace: true }));
    }, []);


    // Token & Cookie
    const cookie = Cookie();
    const token = cookie.get('e-commerce');

    return token ? ( user === "" ? ( <Loading /> ) : allowedRole.includes(user.role) ? (<Outlet />) : (<Err403 role={user.role} />) ) : ( <Navigate to={'/login'} replace={true} /> );
  }