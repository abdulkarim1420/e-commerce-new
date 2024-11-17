import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "./Pagination/Pagination";

export default function TableShow(props) {

    const currentUser = props.currentUser || {
        name: '',
    };
    // Variables for Pagination
    // const start = (props.page - 1) * props.limit;
    // const end = Number(start) + Number(props.limit);
    // const final = props.data.slice(start, end);

    // Header Show
    const headerShow = props.header.map((item, key) => <th key={key}>{item.name}</th>);
    
    // Body Show
    const dataShow = props.data.map((item, key) => 
    <tr key={key}>
        <td key={key}>{item.id}</td>
        {props.header.map((item2, key2) => <td key={key2}>{
        // Show Image
        item2.key === 'image' ? <img src={item[item2.key]} alt="image" width="100" />
        : item2.key === 'images' ? item[item2.key].map((img) => <img src={img.image} alt="image" width="50" />)
        : item2.key === 'discount' ? item[item2.key] + '%'
        : item[item2.key] === '1995' ? "admin"
        : item[item2.key] === "2001" ? "User"
        : item[item2.key] === "1996" ? "Writer"
        : item[item2.key] === "1999" ? "Product Manager" : item[item2.key]
        }
        </td>)}
        <td>
            <div className="d-flex align-items-center gap-2">
                <Link to={`${item.id}`}><FontAwesomeIcon fontSize={'19px'} icon={faPenToSquare} cursor={'pointer'} /></Link>
                {currentUser.name !== item.name &&
                (<FontAwesomeIcon 
                onClick={() => props.delete(item.id)}
                 fontSize={'19px'} color="red" icon={faTrash} cursor={'pointer'} />)}
            </div>
        </td>
    </tr>)

    // Return Data
    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>id</th>
                    {headerShow}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {props.loading ? 
                <tr>
                    <td colSpan={12} className="text-center">Loading...</td>
                </tr>
                : dataShow
            }
            </tbody>
        </Table>

        <div className="d-flex align-items-center justify-content-end flex-wrap">
            <div className="col-1">
                <Form.Select onChange={(e) => props.setLimit(e.target.value)} aria-label="Default select example" style={{ width: "70px" }}>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </Form.Select>
            </div>
            <PaginatedItems setPage={props.setPage} itemsPerPage={props.limit} data={props.data} total={props.total} />
        </div>
        </>
    )
  }