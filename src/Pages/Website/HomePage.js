import Landing from "../../Components/Website/Landing/Landing";
import ShowLatestSaleProducts from "../../Components/Product/SaleProducts/ShowLatestSaleProducts";
import ShowTopRated from "../../Components/Product/TopRated/ShowTopRated";

import "./homepage.css";
import { Container } from "react-bootstrap";
import ShowLatestProducts from "../../Components/Product/LatestProducts/ShowLatestProducts";

export default function HomePage() {
    
  return (
    <div className="mb-5">
      <Landing />
      <ShowLatestSaleProducts />
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
    </div>
  );
}