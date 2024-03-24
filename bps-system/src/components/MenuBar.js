import { Link } from "react-router-dom";
 
const MenuBar = () => {
 
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#" >
                    <img height="45px" width="50px" title="Home"
                        src="https://img.freepik.com/free-vector/hand-drawn-money-logo-design_23-2150931748.jpg?t=st=1711267458~exp=1711271058~hmac=f71da3a31ccedcc6a2a2dcb5bd1643772d089766dc2d28e9157ddedf6565e3bc&w=740"
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
                            <Link className="nav-link active" to="pay">Payment</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="Dashboard">DashBoard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="logout">Logout</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search a payment.." />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};
 
export default MenuBar;