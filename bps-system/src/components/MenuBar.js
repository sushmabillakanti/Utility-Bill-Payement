import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase";


const MenuBar = () => {
    const [userEmail, setUserEmail] = useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // Use Firebase Auth state listener to track user authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                setUserEmail(user.email);
                setIsUserLoggedIn(true);
            } else {
                // User is signed out
                setUserEmail('');
                setIsUserLoggedIn(false);
            }
        });

        // Clean up listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#" >
                    <img height="45px" width="50px" title="Home"
                        src="https://media.istockphoto.com/id/1764859152/photo/3d-realistic-loan-money-icon-3d-icon-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=VQ0dA69FdiStp-FdTKrcLMB3SlKxB1nU4nZgzn-OtNw="
                        alt="deloitte logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;