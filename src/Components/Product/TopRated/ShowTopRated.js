import { useEffect, useState } from "react";
import TopRated from "./TopRated";
import { Axios } from "../../../Api/axios";
import { TOPRATED } from "../../../Api/Api";
import SkeletonShow from "../../Website/SkeletonShow";

export default function ShowTopRated() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`${TOPRATED}`)
        .then((res) => setProducts(res.data))
        .finally(() => setLoading(false));
    }, [])

    const showProducts = products.map((product, key) => (
        <TopRated 
        key={key} 
        title={product.title} 
        description={product.description}
        img={product.images[0].image}
        sale
        price={product.price}
        discount={product.discount}
        rating={product.rating}
        id={product.id}
        />
    ))

    return (
       <div className="col-md-6 col-12" style={{ border: '2px solid #0D6EFD' }}>
        <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
        <div className="p-5">
            { loading ? 
                <>
                    <SkeletonShow height='800px' length='1' classes='col-12' />
                </>
            : showProducts }
        </div>
       </div>

    )
  }