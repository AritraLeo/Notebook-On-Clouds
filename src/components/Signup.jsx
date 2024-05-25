import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = (props) => {


    const [signup, setSignup] = useState({ name: '', email: '', password: '', cpassword: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NGNkMjk5YmU3YzM0ODQ1MTE1MTQ4In0sImlhdCI6MTY1MDc3MzU2MX0.eY0DQm32--ct4KPM3ypvgWtz5Nig6dS_6mm5fqVs0aU'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ name: signup.name, email: signup.email, password: signup.password })
        })
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Redirect and save token
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Sign Succesfull", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }


    return (
        <div className='container my-3'>
            <h1>Sign Up to save your notes for Freeee!</h1>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="text" value={signup.name} required minLength={3} onChange={onChange} name='name' className="form-control" id="name" placeholder="Name" />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name='email' className="form-control" value={signup.email} onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={signup.password} required minLength={5} onChange={onChange} name='password' className="form-control" id="password" placeholder="Password" />
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" value={signup.cpassword} required minLength={5} onChange={onChange} name='cpassword' className="form-control" id="cpassword" placeholder="Confirm Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default SignUp