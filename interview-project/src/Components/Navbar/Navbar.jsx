/* Dependencies */
import React, {useEffect} from 'react'
import { jwtDecode } from "jwt-decode";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* Assets */
import logo from '../../assets/logo.png'

/* Styles */
import "../Navbar/Navbar.css";

/*Icons */
import { BiBarcode } from "react-icons/bi";
import { MdContentPasteSearch } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

export const Navbar = () => {
    const redirect = useNavigate();
    const { t, i18n } = useTranslation();

    //UseEffect to get Token and decode time expiration, role and redirect to login if the token expires
    useEffect(()=>{
        let token = sessionStorage.getItem("accessToken");

        if (token !== null) {
            const { exp, role } = jwtDecode(token)
            const expirationTime = (exp * 1000) - 60000
            sessionStorage.setItem("role", role)
        
            if (Date.now() >= expirationTime) {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("role");
                redirect("/")
            }    
        }else{
            alert("Token expirado");
            redirect("/")
        }

        handleTrans("es")
        
    },[])

    //Const for change language
    const handleTrans = (code) => {
        i18n.changeLanguage(code);
    };

    //Function to logOut the user and redirect to login
    function logOut(){
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("role");
        redirect("/");
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <a className="navbar-brand" href="/products"><img src={logo} width={120}></img></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to={`/products`} className='btn'>{t("navProduct")} <BiBarcode/></Link>
                </li>
                <li className="nav-item">
                    <Link to={`/orders`} className='btn'>{t("navOrders")} <MdContentPasteSearch/></Link>
                </li>
                <li className="nav-item dropdown">
                    <div className="input-group mb-3">
                        <select className="custom-select" id="inputGroupSelect02" onChange={(e)=> handleTrans(e.target.value)}>
                            <option value="es" selected>Español</option>
                            <option value="en">Inglés</option>                            
                        </select>
                        

                    </div>
                    
                </li>   
                <li className="nav-item">
                    <button className="btn ml-2" onClick={()=>logOut()}>{t("navLogOut")} <IoLogOutOutline/></button>
                </li>  
            </ul>        
        </div>
    </nav>
  )
}
