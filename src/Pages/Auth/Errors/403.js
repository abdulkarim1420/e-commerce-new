import { Link } from "react-router-dom"
import "./403.css"

export default function Err403({ role }) {
    return (
        <div className="text-wrapper">
            <div className="title" data-content={404}>
                403 - ACCESS DENIED
            </div>
            <div className="subtitle">
                Oops, You don't have permission to access this page.
                <Link to={role === '1996' ? '/dashboard/writer' : '/'} className="d-block text-center" >{role === '1996' ? 'Go to writer page.' : 'Go to Home Page.'}</Link>
            </div>
        </div>
    )
}