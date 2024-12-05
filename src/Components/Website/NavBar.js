import { Axios } from "../../Api/axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CATEGORIES } from "../../Api/Api";

import "./navbar.css";
import StringSlice from "../../helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "./SkeletonShow";
import { Cart } from "../../Context/CartChangerContext";
import PlusMinusBtn from "./PlusMinusBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const { isChange } = useContext(Cart);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        Axios.get(`${CATEGORIES}`)
        .then((res) => setCategories(res.data.slice(-8)))
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const getProducts = JSON.parse(localStorage.getItem("product")) || [];
        setProducts(getProducts);
    }, [isChange])

    const handleDelete = (id) => {
        const filterProduct = products.filter((product) => product.id !== id);
        setProducts(filterProduct);
        localStorage.setItem("product", JSON.stringify(filterProduct));
    }

    const changeCount = (id, btnCount) => {
        const getProducts = JSON.parse(localStorage.getItem("product")) || [];
        const findProduct = getProducts.find((product => product.id === id));
        findProduct.count = btnCount;
        localStorage.setItem("product", JSON.stringify(getProducts));
    }

    const showProducts = products?.map((product, key) => (
        <div key={key} className="mb-4 position-relative">
            <div onClick={() => handleDelete(product.id)} className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white" style={{ width: '20px', height: '20px', cursor: 'pointer' }}>
                <FontAwesomeIcon width='10px' icon={faXmark} />
            </div>
            <div className="d-flex align-items-start gap-2 flex-wrap">
                <img src={product.images[0].image} alt="product image" className="rounded col-sm-3 col-12" height="80" style={{ objectFit: 'cover' }} />
                <div className="col-sm-6 col-12">
                    <p>{product.title}</p>
                    <p className="m-0 text-truncate">{product.description}</p>
                    <div className="d-flex align-items-center gap-3">
                        <h5 className="m-0 text-primary">{product.discount}$</h5>
                        <p className="m-0" style={{ color: 'grey', textDecoration: 'line-through' }}>{product.price}$</p>
                    </div>
                </div>
                <PlusMinusBtn id={product.id} count={product.count || 1} setCount={setCount} changeCount={changeCount} />
            </div>
        </div>
    ))

    const showCategories = categories.map((category, key) =>
        <Link key={key} to="" className="text-black category-title">
            {StringSlice(category.title, 15)}
        </Link>)

    return (
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showProducts}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>
        
    <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <Link to="/">
                <img src={require('../../Assets/images/logo.png')} alt="logo" width="170" className="d-inline-block align-top me-2" />
            </Link>
            {/* <Navbar.Toggle /> */}
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
                <Form.Control type="search" className="form-control custom-search py-3 rounded-0" placeholder="Search .." />
                <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center">Search</h3>
            </div>
                <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
                    <Link to="/cart">
                        <img src={require('../../Assets/images/user.png')} alt="cart" width="45" className="d-inline-block align-top me-2" />
                    </Link>
                    <div onClick={handleShow}>
                        <img src={require('../../Assets/images/cart.png')} alt="user" width="45" className="d-inline-block align-top me-2" />
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="d-flex align-items-center justify-content-center gap-5 flex-wrap">
                    { loading ? 
                    <>
                        <SkeletonShow height='30px' width='80px' length='4' />
                    </>
                    : showCategories}
                    <Link to="/categories" className="text-black category-title">
                        Show All
                    </Link>
                </div>
            </div>
        </Container>
      </nav>
      </>
    )
}