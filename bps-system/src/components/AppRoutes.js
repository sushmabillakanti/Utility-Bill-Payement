import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import MenuBar from './MenuBar';
import AdminDashboard from './Admin/AdminDashboard';
import ManageUsers from './Admin/users';
import PaymentMethods from './Admin/AdminPaymentmethods';
import Register from './register';
import Bills from './Bills';
import AddUtility from './Admin/AddUtility';
import AddBill from './AddBill';

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
                        <Route exact path='admin' element={<AdminDashboard />} />
                        <Route exact path='users' element={<ManageUsers />} />
                        <Route exact path='Adminpaymentmethods' element={<PaymentMethods />} />
                        <Route exact path='register' element={<Register />} />
                        <Route exact path='viewbills' element={<Bills />} />
                        <Route exact path='AddUtility' element={<AddUtility />}></Route>
                        <Route exact path= 'AddBill' element={<AddBill/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;