import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth,db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email === 'admin@gmail.com' && password === 'abc') {
                navigate('/admin');
            }
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setError('User not found');
                return;
            }
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            setSuccessMessage('Login successful');
            navigate('/viewbills');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsLoggedIn(false); // Update isLoggedIn state upon successful logout
            navigate('/login'); 
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle logout error if necessary
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card mt-5">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 d-flex align-items-stretch">
                                    <img src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?w=740" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <h2 className="text-center mb-4">{isLoggedIn ? 'Logged In' : 'Login In'}</h2>
                                    {isLoggedIn ? (
                                        <div>
                                            <p>You are logged in.</p>
                                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleLogin}>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email:</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </form>
                                    )}
                                    {error && <p className="text-danger">{error}</p>}
                                    {successMessage && <p className="text-success">{successMessage}</p>}
                                </div>
                            </div>
                            <Link to="/register">Register New Account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
