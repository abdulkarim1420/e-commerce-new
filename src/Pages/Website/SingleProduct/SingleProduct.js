import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CART, PRODUCT } from "../../../Api/Api";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonShow from "../../../Components/Website/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../Components/Website/PlusMinusBtn";

export default function SingleProduct() {
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(5);
    const [productImages, setProductImages] = useState([]);
    const [error, setError] = useState('');
    const [loadingCart, setLoadingCart] = useState(false);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { setIsChange } = useContext(Cart);

    const roundStars = Math.round(product.rating);
    const stars = Math.min(roundStars, 5);
    const showGoldStars = Array.from({length: stars}).map((_, index) => <FontAwesomeIcon key={index} icon={solidStar} />);
    const showEmptyStars = Array.from({length: 5 - stars}).map((_, index) => <FontAwesomeIcon key={index} icon={regularStar} />);

    useEffect(() => {
        Axios.get(`${PRODUCT}/${id}`)
        .then((res) => {
            setProduct(res.data[0]);
            setProductImages(res.data[0].images.map((img, key) => {return {original: img.image, thumbnail: img.image}}));
        })
        .finally(() => setLoading(false));
    }, [])

    const checkStock = async () => {
        try {
            setLoadingCart(true);
            const getItems = JSON.parse(localStorage.getItem("product")) || [];
            const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;
            await Axios.post(`${CART}/check`, {
                product_id: product.id,
                count: count + (productCount ? productCount : 0),
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            setLoadingCart(false);
        }
    }

    const handleSave = async () => {
        const check = await checkStock();

        if(check) {
        const getItems = JSON.parse(localStorage.getItem("product")) || [];

        const productExist = getItems.findIndex((product) => Number(product.id) ===  Number(id));
        
        if (productExist !== -1) {
            if (getItems[productExist].count) {
                getItems[productExist].count += count;
            } else {
                getItems[productExist].count = count;
            }
        } else {
            if (count > 1) {
                product.count = count;
            }
            getItems.push(product);
        }
        localStorage.setItem("product", JSON.stringify(getItems));
        setIsChange((prev) => !prev);
        }
    }

    return (
        <Container>
            <div className="d-flex align-items-start flex-warp row-gap-5 mt-5">
            {loading ?
            <>
                <div className="col-lg-4 col-md-6 col-12">
                    <SkeletonShow height='250px' length='1' classes='col-12' />
                    <div className="col-12 d-flex mt-1">
                    <SkeletonShow height='100px' length='1' classes='col-4' />
                    <SkeletonShow height='100px' length='1' classes='col-4' />
                    <SkeletonShow height='100px' length='1' classes='col-4' />
                    </div>
                </div>

                <div className="col-lg-8 col-md-6 col-12">
                    <SkeletonShow height='40px' length='1' classes='col-12' />
                    <SkeletonShow height='210px' length='1' classes='col-12 mt-2' />
                    <hr className="col-12" />
                    <div className="d-flex align-items-center justify-content-between col-12">
                        <SkeletonShow height='50px' length='1' classes='col-2 mt-2' />
                        <SkeletonShow height='50px' length='1' classes='col-1 mt-2' />
                    </div>
                </div>
            </>
            :
            (
            <>
                <div className="col-lg-4 col-md-6 col-12">
                    <ImageGallery items={productImages} />
                </div>
                <div className="col-lg-8 col-md-6 col-12">
                    <div className="ms-5">
                        <h1>{product.title}</h1>
                        <p style={{ color: 'grey' }}>{product.About}</p>
                        <h3 className="fw-normal fs-5">{product.description}</h3>
                        <hr/>
                        <div className="d-flex align-items-center justify-content-between pt-4">
                            <div>
                                {product.stock === 1 && (<p className="text-danger">There is only 1 left</p>)}
                                {showGoldStars}
                                {showEmptyStars}

                                <div className="d-flex align-items-center gap-3">
                                    <h5 className="m-0 text-primary">{product.discount}$</h5>
                                    <h6 className="m-0" style={{ color: 'gray', textDecoration: 'line-through' }}>
                                        {product.price}$
                                    </h6>
                                </div>
                            </div>
                            {product.stock === 0 ? (
                                <p>This Product is unavilable</p>
                            )
                            :
                            (
                                <div className="d-flex align-items-center gap-4">
                                <PlusMinusBtn setCount={(data) => setCount(data)} />
                                <div onClick={handleSave} className="border p-2 rounded">
                                    {loadingCart ? 
                                    ( "Loading" )
                                    : (
                                        <img src={require('../../../Assets/images/cart.png')} alt="cart" width="30px" />
                                    )}
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
            )}    
            </div>
        </Container>
    )
}