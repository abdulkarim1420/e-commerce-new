import { useEffect, useState } from "react";
import { Container, Navbar, Card, Form } from "react-bootstrap";
import { PRODUCTS, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import "./homepage.css"
import PaginatedItems from "../../Components/Dashboard/Pagination/Pagination";
import Loading from "../../Components/Loading/Loading";


export default function HomePage() {
    // States
    const [currentUser, setCurrentUser] = useState("");
    const [products, setProducts] = useState([]);
    // States for Pagination
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [total, setTotal] = useState(0);
    // Loading
    const [loading, setLoading] = useState(false);
  
    // Get Current User
    useEffect(() => {
      Axios.get(`/${USER}`).
      then((data) => setCurrentUser(data.data.name))
      .catch((err) => console.log(err));
  }, []);

    // Get Products
    useEffect(() => {
      setLoading(true);
      Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`).
      then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [limit, page]);

  // Discount Function
  function calculateOriginalPrice(discountedPrice, discountPercentage) {
    const discountDecimal = discountPercentage / 100;
    const originalPrice = discountedPrice / (1 - discountDecimal);
    
    return originalPrice;
}

  // Mapping
  const showProducts = products.map((item, key) => (
    <Card className="custom-card shadow" key={key}>
      {item.images.map((img, key) => <Card.Img key={key} variant="top" src={img.image} alt="product image" />)}
    <Card.Body>
      <Card.Title>{item.title}</Card.Title>
      <Card.Text style={{ height: '170px' }}>
        {item.description}
      </Card.Text>
      <div className="d-flex align-items-end justify-content-between flex-row gap-2">
        <p style={{ position: 'absolute', bottom: '40px'}}><span className="me-3" style={{ color: 'red', fontWeight: 'bold' }}>{item.discount}%</span>List Price: <span style={{textDecoration: 'line-through'}}>{calculateOriginalPrice(item.price, item.discount).toFixed(2)}</span> SAR</p>
        <p className="fs-4 text-success mt-3">{item.price} SAR</p>
        <p className="text-dark">{item.About}</p>
      </div>
    </Card.Body>
  </Card>
  ))
  



  return (
    <>
    {loading && <Loading />}
      <Navbar className="bg-body-tertiary shadow mb-5">
        <Container>
          <Navbar.Brand href="#home">
            <img src="https://react-bootstrap.netlify.app/img/logo.svg" alt="logo" width="30" className="d-inline-block align-top me-2" />
            E-Commerce
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="" className="cyan">{currentUser}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div>
          <p>{products.length} results for <span className="cyan">Products</span></p>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-5">
          {showProducts}
        </div>

        <div className="d-flex align-items-center justify-content-end flex-wrap mt-5">
            <div className="col-1">
                <Form.Select onChange={(e) => setLimit(e.target.value)} aria-label="Default select example" style={{ width: "70px" }}>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </Form.Select>
            </div>
            <PaginatedItems itemsPerPage={limit} setLimit={setLimit} setPage={setPage} total={total} />
        </div>
      </Container>
      
    </>
  );
}