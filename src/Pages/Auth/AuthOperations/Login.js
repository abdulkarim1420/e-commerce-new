import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { baseURL, LOGIN } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from 'cookie-universal';
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Login() {

    // States
    const [form, setForm] = useState({
        name: '',
        password: '',
    });

    // Navigate
    const navigate = useNavigate();

    // Handle Form Change
    function handleChange(e) {
        setForm({ ...form, [e.target.name] : e.target.value })
      }

    // Loading
    const [loading, setLoading] = useState(false);

    // Cookies
    const cookie = Cookie();

    // Err
    const [err, setErr] = useState('');

    //  Ref
    const focus = useRef("");

    // Handle Focus
    useEffect(() => {
        focus.current.focus();
    }, [])

    // Handle Submit
      async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${baseURL}/${LOGIN}`, form); 
            setLoading(false);

            const token = res.data.token;
            const role = res.data.user.role;
            const go = role === '1995' ? 'users' : role === '1999' ? 'categories' : '404';
            cookie.set('e-commerce', token);
            window.location.pathname = `/dashboard/${go}`;
            
        } catch(err) {
            setLoading(false);
            if (err.response.status === 401) {
                setErr('Wrong Email Or Password');
            } else {
                    setErr('Internal Server ERR');
            }
        }
      }

    return (
        <>
        { loading && <Loading />}
        <div className="container">
            <div className="row" style={{ height: "100vh" }}>     
                <Form className="form" onSubmit={handleSubmit}>
                    <div className="custom-form">
                        <h1 className="mb-5">Login</h1>
                        <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                            <Form.Control type="email" name="email" placeholder="Enter Your Email.." value={form.email} onChange={handleChange} ref={focus} required />
                            <Form.Label>Email</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
                            <Form.Control type="password" name="password" placeholder="Enter Your Password.." value={form.password} onChange={handleChange} minLength="6" required />
                            <Form.Label>Password</Form.Label>
                        </Form.Group>

                        <button className="btn btn-primary">Sumbit</button>
                        {/* Google button */}
                        {/* <div className="google-btn">
                            <a href={`http://127.0.0.1:8000/login-google`} >
                                <div className="google-icon-wrapper">
                                    <img className="google-icon" src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" alt="sign in with google" />
                                </div>
                                <p className="btn-text"><b>Sign in with Google</b></p>
                            </a>
                        </div> */}

                        { err !== '' && <span className="error">{err}</span> }
                    </div>
                </Form>
            </div>
        </div>
        </>
    )
  }