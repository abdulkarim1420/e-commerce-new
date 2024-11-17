import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../Api/axios';
import { CATEGORY } from '../../../Api/Api';
import Loading from '../../../Components/Loading/Loading';

export default function AddCategory() {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    // Ref
    const focus = useRef("");

    // Handle Focus
    useEffect(() => {
        focus.current.focus();
    }, [])

    // Handle Submit
    async function HandleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('image', image);
        try {
           const res = await Axios.post(`${CATEGORY}/add`, form);
           window.location.pathname = "/dashboard/categories";
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }
    
    return (
        <>
        { loading && <Loading /> }
            <Form className='bg-white w-100 mx-2 p-3' onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} ref={focus} required />
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => setImage(e.target.files.item(0))} required />
                </Form.Group>

                <button disabled={ title.length > 1 ? false : true} className='btn btn-primary'>Save</button>
            </Form>
        </>
    )
  }