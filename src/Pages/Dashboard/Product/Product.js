import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { CATEGORIES, PRODUCT } from '../../../Api/Api';
import Loading from '../../../Components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function UpdateProduct() {
    // States
    const [form, setForm] = useState({
        category: "Select Category",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
    });
    const [images, setImages] = useState([]);
    const [imagesFormServer, setImagesFromServer] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [idsFormServer, setIdsFromServer] = useState([]);
    const { id } = useParams();
    const nav = useNavigate();

    // Ref
    const focus = useRef("");
    const openImage = useRef(null);
    const progress = useRef([]);
    const ids = useRef([]);

    // Handle Focus
    useEffect(() => {
        focus.current.focus();
    }, [])

    // Open Image Upload
    function handleOpenImage() {
        openImage.current.click()
    }

    // Get All Categories
    useEffect(() => {
        Axios.get(`/${CATEGORIES}`)
        .then((data) => setCategories(data.data.data))
        .catch((err) => console.log(err));
    }, []);

    // Get Data
    useEffect(() => {
        setLoading(true);
        Axios.get(`${PRODUCT}/${id}`).then(data => {
            setForm(data.data[0])
            setImagesFromServer(data.data[0].images);
            setLoading(false);
        })
        // .then(() => setDisable(false)).catch(() => nav('/dashboard/categories/page/404', { replace: true }));
    }, [])

    // Handle Edit
    async function HandleEdit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            for (let i = 0; i < idsFormServer.length; i++) {
                await Axios.delete(`product-img/${idsFormServer[i]}`).then((data) =>
                console.log(data));   
            }
           await Axios.post(`${PRODUCT}/edit/${id}`, form);
           nav('/dashboard/products');
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }
    
    // Handle Change
    function handleChange(e) {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const j = useRef(-1);

    // Handle Image Changes
    async function handleImagesChange(e) {
        setImages((prev) => [...prev, ...e.target.files]);
        const imagesAsFiles = e.target.files;
        const data = new FormData();
        for (let i = 0; i < imagesAsFiles.length; i++) {
            j.current++;
            data.append("image", imagesAsFiles[i]);
            data.append("product_id", id);
            try {
                const res = await Axios.post('/product-img/add', data, {
                    onUploadProgress: (ProgressEvent) => {
                        const { loaded, total } = ProgressEvent;
                        const percent = Math.floor((loaded * 100) / total);
                        if (percent % 10 === 0) {
                            progress.current[j.current].style.width = `${percent}%`;
                            progress.current[j.current].setAttribute('percent', `${percent}%`);
                        }
                    } 
                });
                ids.current[j.current] = res.data.id;
            } catch(err) {
                console.log(err)
            }
        }
    }

    // Handle Delete Image
    async function handleImageDelete(id, img) {
        const findId = ids.current[id];
        try {
            const res = await Axios.delete(`product-img/${findId}`)
            setImages((prev) => prev.filter((image) => image !== img));
            ids.current = ids.current.filter((i) => i !== findId);
            --j.current;
        } catch (err) {
            console.log(err);
        }
    }

    // Handle Delete Image From Server
    async function handleDeleteImageFromServer(id) {
        setImagesFromServer((prev) => prev.filter((image) => image.id !== id));
        setIdsFromServer((prev => { return [...prev, id] }));
    }

    // Mapping
    const showCategories = categories.map((item, key) => <option value={item.id} key={key}>{item.title}</option>);

    const showImages = images.map((img, key) =>
    <div key={key} className='p-2 w-100 border'>
        <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center justify-content-start gap-2'>
                <img src={URL.createObjectURL(img)} alt='' width={80} />
                <div className='mb-1'>
                    <p>{img.name}</p>
                    <p>{ (img.size / 1024) < 900 ? (img.size / 1024).toFixed(2) + "KB" : (img.size / (1024 * 1024)).toFixed(2) + "MB" }</p>
                </div>
            </div>
            <Button onClick={() => handleImageDelete(key, img)} variant="danger">Delete</Button>
        </div>
        <div className='custom-progress mt-2'>
            <span ref={(e) => (progress.current[key] = e)} className='inner-progress'></span>
        </div>
    </div> 
    )

    const showImagesFromServer = imagesFormServer.map((img, key) =>
        <div key={key} className='p-2 col-2 border position-relative'>
            <div className='d-flex align-items-center justify-content-start gap-2'>
                <div className='d-flex align-items-center justify-content-start gap-2'>
                    <img src={img.image} alt='' className='w-100' />
                </div>
                <Button onClick={() => handleDeleteImageFromServer(img.id)} variant="danger">X</Button>
            </div>
        </div> 
        )

    return (
        <>
        { loading && <Loading /> }
            <Form className='bg-white w-100 mx-2 p-3' onSubmit={HandleEdit}>
            <Form.Group className="mb-3" controlId="Category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" value={form.category} onChange={handleChange} ref={focus}>
                    <option disabled>Select Category</option>
                    {showCategories}
                    </Form.Select>
            </Form.Group>

                <Form.Group className="mb-3" controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="text" name="discount" placeholder="Discount" value={form.discount} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="About">
                    <Form.Label>About</Form.Label>
                    <Form.Control type="text" name="About" placeholder="About" value={form.About} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="images">
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="file" ref={openImage} hidden multiple onChange={handleImagesChange} />

                        <div onClick={handleOpenImage} className='d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column'
                         style={{ border:"2px dashed #3399db", cursor: "pointer" }}>
                            <img src={require('../../../Assets/images/upload.png')} alt="upload here" width={100} />
                            <p className='fw-bold mb-0' style={{ color: "#3399db" }}>Upload Images</p>
                        </div>
                </Form.Group>

                <div className='d-flex align-items-start flex-wrap gap-2'>{showImagesFromServer}</div>

                <div className='d-flex align-items-start flex-column gap-2'>{showImages}</div>

                <button className='btn btn-primary'>Save</button>
            </Form>
        </>
    )
  }