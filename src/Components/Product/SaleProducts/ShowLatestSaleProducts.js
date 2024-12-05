import { Axios } from "../../../Api/axios";
import { useEffect, useState } from "react"
import { LATESTSALE } from "../../../Api/Api"
import SaleProducts from "./SaleProducts";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../Website/SkeletonShow";

export default function LatestSaleProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`${LATESTSALE}`)
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
    col='3' 
    />
    )

    return (
        <Container>
            <p className="mt-4 fs-3">Latest Sale Products</p>
            <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2">
                { loading ? 
                <>
                    <SkeletonShow height='300px' length='4' classes='col-lg-3 col-md-6 col-12' />
                </>
                 : showProducts }
            </div>
        </Container>
    )
}