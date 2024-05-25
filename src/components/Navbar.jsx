import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();

    const handleLogout = () => {
        // Remove the JWT token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        window.location.href = '/login';
    };


    useEffect(() => {

        console.log(location.pathname);
    }, [location])


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                    </li>
                </ul>
            </div>
            <button onClick={handleLogout} className="btn btn-danger">
                Logout
            </button>
            <Link to='/login' className='btn btn-primary mx-2'> Login </Link>
            <Link to='/signup' className='btn btn-primary mx-2'> SignUp </Link>
        </nav>
    )
}

export default Navbar