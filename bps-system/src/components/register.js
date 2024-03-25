import React, { useState } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUpAndStoreUserData = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      await addDoc(collection(db, "users"), {
        email: user.email,
        password: password
      });

      setSuccessMessage('User signed up and data stored successfully');
      navigate('/viewbills');
      setError(null); // Clear any previous error
    } catch (error) {
      setSuccessMessage('');
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUpAndStoreUserData}>
        <div className="container mt-6">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-4 d-flex align-items-stretch">
                    <img
                      src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1711259516~exp=1711263116~hmac=f4c1de3e8e32606252b46e26e97004fecea8209f0a4f533fd81a2702444faf42&w=740"
                      className="img-fluid rounded-start"
                      alt="Registration"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h3 className="card-title text-center">Register</h3>
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
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>{error && <p>{error}</p>}
        {successMessage && <h4>{successMessage}</h4>}</div>
    </div>
  );
};

export default Register;
