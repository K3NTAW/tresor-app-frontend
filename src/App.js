import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import './css/mvp.css';
import Home from './pages/Home';
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Users from './pages/user/Users';
import LoginUser from "./pages/user/LoginUser";
import RegisterUser from "./pages/user/RegisterUser";
import Secrets from "./pages/secret/Secrets";
import NewCredential from "./pages/secret/NewCredential";
import NewCreditCard from "./pages/secret/NewCreditCard";
import NewNote from "./pages/secret/NewNote";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";

/**
 * App
 * @author Peter Rutschmann
 */
function App() {
    const [loginValues, setLoginValues] = useState({ email: "", password: "", token: null });

    useEffect(() => {
        const saved = sessionStorage.getItem("loginValues");
        if (saved) {
            setLoginValues(JSON.parse(saved));
        }
    }, []);

    const handleSetLogin = (values) => {
        if (values && values.email) {
            sessionStorage.setItem("loginValues", JSON.stringify(values));
        } else {
            sessionStorage.removeItem("loginValues");
        }
        setLoginValues(values);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout loginValues={loginValues} setLoginValues={handleSetLogin} />}>
                    <Route index element={<Home/>}/>
                    <Route path="/user/users" element={<Users loginValues={loginValues}/>}/>
                    <Route path="/user/login" element={<LoginUser setLoginValues={handleSetLogin}/>}/>
                    <Route path="/user/register" element={<RegisterUser setLoginValues={handleSetLogin}/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/secret/secrets" element={<Secrets loginValues={loginValues}/>}/>
                    <Route path="/secret/newcredential" element={<NewCredential loginValues={loginValues}/>}/>
                    <Route path="/secret/newcreditcard" element={<NewCreditCard loginValues={loginValues}/>}/>
                    <Route path="/secret/newnote" element={<NewNote loginValues={loginValues}/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;