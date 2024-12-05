import { useEffect, useState } from "react"
import { Axios } from "../../Api/axios";
import { CATEGORIES } from "../../Api/Api";
import { Container } from "react-bootstrap";
import StringSlice from "../../helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../../Components/Website/SkeletonShow";

export default function WebsiteCategories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`${CATEGORIES}`)
        .then((res) => setCategories(res.data.slice(-5)))
        .finally(() => setLoading(false));
    }, [])

    const showCategories = categories.map((category, key) => (
        <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
            <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
                <img className="ms-3" width="50" src={category.image} alt="just an image" />
                <p className="m-0">
                    {StringSlice(category.title, 15)}
                </p>
            </div>
        </div>
    ))

    return (
        <>
        <div className="bg-secondary py-5">
            <Container>
                <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
                    {loading ? 
                    <>
                        <SkeletonShow baseColor="white" highlightColor="#b7b7b7" height='80px' length='8' classes='col-lg-2 col-md-6 col-12' />
                    </>
                    : showCategories}
                </div>
            </Container>
        </div>
    </>
    );
}