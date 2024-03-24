import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import MenuBar from './MenuBar';
import AdminDashboard from './Admin/AdminDashboard';
import ManageUsers from './Admin/users';
import PaymentMethods from './Admin/AdminPaymentmethods';

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <>
                    <MenuBar />
                </>
                <div className='container'>
                    <Routes >
                        <Route exact path='login' element={<Login />} />
                        <Route exact path = 'Dashboard' element={<AdminDashboard/>}/>
                        <Route exact path = 'users' element={<ManageUsers/>}/>
                        <Route exact path = 'Adminpaymentmethods' element={<PaymentMethods/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;