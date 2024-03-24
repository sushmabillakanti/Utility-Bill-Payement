import React from 'react';
import { Link } from 'react-router-dom';
import ManageUsers from './users';

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div className="list-group">
                <br/>
                <Link to="/users" className="list-group-item list-group-item-action">
                    Manage Users
                </Link>
                <br/>
                <Link to="/Adminpaymentmethods" className="list-group-item list-group-item-action">
                    Manage Payment Methods
                </Link>
                <Link to="/AddUtility" className="list-group-item list-group-item-action">
                    Manage Utilities
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
