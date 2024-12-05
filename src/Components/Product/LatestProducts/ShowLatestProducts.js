import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { LATEST } from "../../../Api/Api";
import SaleProducts from "../SaleProducts/SaleProducts";
import SkeletonShow from "../../Website/SkeletonShow";

export default function ShowLatestProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`${LATEST}`)
        .then((res) => setProducts(res.data))
        .finally(() => setLoading(false))
    }, [])

    const showProducts = products.map((product, key) => 
    <SaleProducts 
    key={key} 
    title={product.title} 
    description={product.description} 
    image={product.images[0].image} 
    price={product.price} 
    discount={product.discount} 
    rating={product.rating} 
    id={product.id}
    sale 
    col='6' 
    />
    )

    return (
        <div className="col-md-6 col-12">
            <div className="ms-md-3">
                <h1>Latest Products</h1>
                <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
                    { loading ? 
                    <>
                        <SkeletonShow height='300px' length='4' classes='col-md-6 col-12' />
                    </>
                    : showProducts }
                </div>
            </div>
        </div>
    )
}