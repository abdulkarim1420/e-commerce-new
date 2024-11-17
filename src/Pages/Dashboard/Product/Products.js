import { useEffect, useState } from "react";
import { PRODUCT, PRODUCTS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/Table";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Products() {
        // States
        const [products, setProducts] = useState([]);
        // States for Pagination
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(3);
        const [total, setTotal] = useState(0);
        // Loading
        const [loading, setLoading] = useState(false);

        // Get All Products
        useEffect(() => {
            setLoading(true);
            Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
            .then((data) => {
              setProducts(data.data.data);
              setTotal(data.data.total);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        }, [limit, page]);

        const header = [
          {
            key: 'images',
            name: 'Images',
          },
          {
            key: 'title',
            name: 'Title',
          },
          {
            key: 'description',
            name: 'Description',
          },
          {
            key: 'price',
            name: 'Price',
          },
          {
            key: 'discount',
            name: 'Discount',
          },
          {
            key: 'rating',
            name: 'Rating',
          },
        ]

        // Handle Delete
        async function handleDelete(id) {
          try {
              const res = await Axios.delete(`${PRODUCT}/${id}`);
              setProducts(prev => prev.filter((item) => item.id !== id))
          } catch (err) {
              console.log(err);
          }
      }
    
        return (
            <div className="bg-white w-100 p-2">
                <div className="d-flex align-items-center justify-content-between">
                    <h1>Products Page</h1>
                    <Link className="btn btn-primary" to="/dashboard/product/add"><FontAwesomeIcon icon={faPlus} /> Add Product</Link>
                </div>
                
                <TableShow header={header} data={products} delete={handleDelete} page={page} limit={limit} setLimit={setLimit} setPage={setPage} total={total} loading={loading} />

            </div>
        )
  }