import { Spinner } from "react-bootstrap";

export default function Loading() {
    return (
        <div className="spinner-container-submit">
            {/* <img src="https://icon-library.com/images/department-store-icon/department-store-icon-3.jpg" alt="logo" width="50" /> */}
            {/* <div className="spinner"></div> */}
            <Spinner animation="border" variant="info" style={{ width: '100px' , height: '100px' }} />
        </div>
    );
}