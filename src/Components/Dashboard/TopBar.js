import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Link, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cookie from 'cookie-universal';
import "./bars.css"

export default function TopBar() {

    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    const [name, setName] = useState("");
    const cookie = Cookie();

    // Get Current User
    useEffect(() => {
        Axios.get(`/${USER}`)
        .then((data) => setName(data.data.name))
        .catch(() => Navigate("/login", { replace: true }));
    }, []);

    // Logout
    async function handleLogout() {
        try {
            const res = await Axios.get(`/${LOGOUT}`);
            window.location.pathname = "/login";
            cookie.remove('e-commerce');
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <div className="top-bar d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-5">
                <h3>E-Commerce</h3>
                <FontAwesomeIcon cursor={"pointer"} icon={faBars} onClick={() => setIsOpen(prev => !prev)} />
            </div>
            <div className="d-flex align-items-center justify-content-center flex-row gap-2">

            <p className="m-0">
              Signed in as: <span className="blue font-weight-bold">{name}</span>
            </p>
            <Link to='/' className="btn btn-primary ms-3">Home Page</Link>
            <Button variant="dark" onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
  }