import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <>
        <h2>Admin Dashboard</h2>
        <div style={{ marginLeft: '250px' }}>
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-1">
                    <div className="col-md-4">
                        <img src="https://img.freepik.com/free-vector/brand-loyalty-concept-illustration_114360-15542.jpg?t=st=1711299064~exp=1711302664~hmac=1d3826287a953fb213b56e80f46b6ccc6eb1e8bfd092bd74851bb91ab104c31f&w=740" className="img-fluid rounded-start" alt="Manage Users" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Manage Users</h5>
                            <p className="card-text">Manage user accounts and permissions.</p>
                            <Link to="/users" className="btn btn-primary">Go to Users</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://img.freepik.com/free-vector/detailed-point-exchange-concept_23-2148879876.jpg?t=st=1711299221~exp=1711302821~hmac=64e7210ac1ded65d15dc73eda7b6f5b02fa7308307a000da62763beb0316f243&w=740" className="img-fluid rounded-start" alt="Manage Payment Methods" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Manage Payment Methods</h5>
                            <p className="card-text">Manage available payment methods.</p>
                            <Link to="/Adminpaymentmethods" className="btn btn-primary">Go to Payment Methods</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://img.freepik.com/free-vector/building-information-modeling-abstract-concept-illustration-collaborative-construction-construction-project-management-3d-model-based-process-operational-information_335657-3369.jpg?t=st=1711299317~exp=1711302917~hmac=da861c455207c10d0ddf9f10dd498a7bad6853275d383714eed2d94b69836c77&w=740" className="img-fluid rounded-start" alt="Manage Utilities" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Manage Utilities</h5>
                            <p className="card-text">Manage utility services and settings.</p>
                            <Link to="/AddUtility" className="btn btn-primary">Go to Utilities</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AdminDashboard;
