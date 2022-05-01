import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credential, setCredential] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NGNkMjk5YmU3YzM0ODQ1MTE1MTQ4In0sImlhdCI6MTY1MDc3MzU2MX0.eY0DQm32--ct4KPM3ypvgWtz5Nig6dS_6mm5fqVs0aU'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        })
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Redirect and save token
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Logged In Succesfully", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }


    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name='email' className="form-control" value={credential.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={credential.password} onChange={onChange} name='password' className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login