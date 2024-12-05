import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSlice from "../../../helpers/StringSlice";
import { NavLink } from "react-router-dom";

export default function SaleProducts(props) {

    const roundStars = Math.round(props.rating);
    const stars = Math.min(roundStars, 5);
    const showGoldStars = Array.from({length: stars}).map((_, index) => <FontAwesomeIcon key={index} icon={solidStar} />);
    const showEmptyStars = Array.from({length: 5 - stars}).map((_, index) => <FontAwesomeIcon key={index} icon={regularStar} />);

    return (
                    <NavLink to={`/product/${props.id}`} className={`col-lg-${props.col} col-md-6 col-12`}>
                        <div className="m-1 border rounded p-3 h-100">
                            <div className="border-bottom pb-3">
                                <p style={{ color: 'grey' }}>{StringSlice(props.title, 35)}</p>
                                <p className="text-black">{StringSlice(props.description, 100)}</p>
                                <div className="px-5 py-4 position-relative">
                                    {props.sale && <p className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center" style={{ width: '50px', height: '50px', lineHeight: '50px' }}>
                                        Sale
                                    </p>}
                                    <img src={props.image} alt="product image" className="img-fluid" />
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-2">
                                <div>
                                    {showGoldStars}
                                    {showEmptyStars}
                                    <div className="d-flex align-items-center gap-3">
                                        <h5 className="m-0 text-primary">{props.discount}$</h5>
                                        <h6 className="m-0" style={{ color: 'grey', textDecoration: 'line=through' }}>
                                            {props.price}$
                                        </h6>
                                    </div>
                                </div>
                                <div className="border p-2 rounded">
                                    <img src={require('../../../Assets/images/cart.png')} alt="cart" width='30' />
                                </div>
                            </div>
                        </div>
                    </NavLink>
    )
}