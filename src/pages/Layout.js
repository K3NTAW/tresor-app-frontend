import { Outlet, Link, useNavigate } from "react-router-dom";
import './../css/Navbar.css';

/**
 * Layout
 * @author Peter Rutschmann
 */
const Layout = ({ loginValues, setLoginValues }) => {
    const navigate = useNavigate();
    const isLoggedIn = loginValues && loginValues.email;
    const userEmail = isLoggedIn ? loginValues.email : null;

    const handleLogout = () => {
        sessionStorage.removeItem('loginValues');
        if(setLoginValues) {
            setLoginValues({ email: "", password: "", token: null });
        }
        navigate('/user/login');
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-brand">Tresor</Link>
                <ul className="navbar-links">
                    <li>
                        <Link to="/secret/secrets">Secrets</Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/secret/secrets">My Secrets</Link></li>
                            <li><Link to="/secret/newcredential">New Credential</Link></li>
                            <li><Link to="/secret/newcreditcard">New Credit-Card</Link></li>
                            <li><Link to="/secret/newnote">New Note</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/user/users">Users</Link>
                         <ul className="dropdown-menu">
                            <li><Link to="/user/users">All Users</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/about">About</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><span className="user-info">{userEmail}</span></li>
                            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                        </>
                    ) : (
                        <>
                          <li><Link to="/user/login">Login</Link></li>
                          <li><Link to="/user/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            <main style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;