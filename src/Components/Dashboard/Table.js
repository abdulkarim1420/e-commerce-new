import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {

    const currentUser = props.currentUser || {
        name: '',
    };
    // Variables for Pagination
    // const start = (props.page - 1) * props.limit;
    // const end = Number(start) + Number(props.limit);
    // const final = props.data.slice(start, end);
    
    const [search, setSearch] = useState('');
    const [date, setDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    const filteredDataByDate = date.length !== 0 ? props.data.filter((item) => TransformDate(item.created_at) === date) : props.data;

    const filteredSearchByDate = date.length !== 0 ? filteredData.filter((item) => TransformDate(item.created_at) === date) : filteredData;
    
    const showWhichData = search.length > 0 ? filteredSearchByDate : filteredDataByDate;

    async function getSearchedData(e) {
        setSearchLoading(true); 
        try {
          const res = await Axios.post(`${props.searchLink}/search?title=${search}`);
          setFilteredData(res.data);
        } catch (err) {
          console.log(err);
        } finally {
            setSearchLoading(false);
        }
      }

      useEffect(() => {
        const debounce = setTimeout(() => {
            search.length > 0 ? getSearchedData() : setSearchLoading(false);
        }, 500);

        return () => clearTimeout(debounce);
      }, [search]);

    // Header Show
    const headerShow = props.header.map((item, key) => <th key={key}>{item.name}</th>);
    
    // Body Show
    const dataShow = showWhichData.map((item, key) => 
    <tr key={key}>
        <td key={key}>{item.id}</td>
        {props.header.map((item2, key2) => <td key={key2}>{
        // Show Image
        item2.key === 'image' ? <img src={item[item2.key]} alt="image" width="100" />
        : item2.key === 'images' ? item[item2.key].map((img) => <img src={img.image} alt="image" width="50" />)
        : item2.key === 'discount' ? item[item2.key] + '%'
        : item2.key === 'created_at' || item2.key === 'updated_at' ? TransformDate(item[item2.key])
        : item[item2.key] === '1995' ? "admin"
        : item[item2.key] === "2001" ? "User"
        : item[item2.key] === "1996" ? "Writer"
        : item[item2.key] === "1999" ? "Product Manager"
        : item[item2.key]
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
        <div className="col-3">
            <Form.Control onChange={(e) => setSearch(e.target.value)} className="my-2" type="search" aria-label="input example" placeholder="Search" />
        </div>
        <div className="col-5">
            <Form.Control onChange={(e) => setDate(e.target.value)} className="my-2" type="date" aria-label="input example" />
        </div>
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
                : searchLoading ? (
                    <tr>
                        <td colSpan={12} className="text-center">Searching...</td>
                    </tr>
                )
                : (dataShow)
            }
            </tbody>
        </Table>

        <div className="d-flex align-items-center justify-content-end flex-wrap">
            <div className="col-1">
                <Form.Select onChange={(e) => props.setLimit(e.target.value)}
                     aria-label="Default select example" style={{ width: "70px" }}>
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