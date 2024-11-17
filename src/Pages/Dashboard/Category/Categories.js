import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Categories() {
        // States
        const [categories, setCategories] = useState([]);
        // States for Pagination
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(3);
        const [total, setTotal] = useState(0);
        // Loading
        const [loading, setLoading] = useState(false);

        // Get All Categories
        useEffect(() => {
            setLoading(true);
            Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
            .then((data) => {
              setCategories(data.data.data);
              setTotal(data.data.total);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        }, [limit, page]);

        const header = [
          {
            key: 'title',
            name: 'Title',
          },
          {
            key: 'image',
            name: 'Image',
          },
        ]

        // Handle Delete
        async function handleDelete(id) {
          try {
              const res = await Axios.delete(`${CATEGORY}/${id}`);
              setCategories(prev => prev.filter((item) => item.id !== id))
          } catch (err) {
              console.log(err);
          }
      }
    
        return (
            <div className="bg-white w-100 p-2">
                <div className="d-flex align-items-center justify-content-between">
                    <h1>Categories Page</h1>
                    <Link className="btn btn-primary" to="/dashboard/category/add"><FontAwesomeIcon icon={faPlus} /> Add Category</Link>
                </div>
                
                <TableShow header={header} data={categories} delete={handleDelete} page={page} limit={limit} setLimit={setLimit} setPage={setPage} total={total} loading={loading} />
      
            </div>
        )
  }