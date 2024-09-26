/*Dependencies */
import React, {useEffect, useState} from 'react'
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

/*Components */
import { Navbar } from '../Components/Navbar/Navbar';
import { config } from '../utils/utils';
import { TableOrders } from '../Components/Table/TableOrders';




export const Orders = () => {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [role, setRole] = useState("");
    
    //UseEffect to set role and get orders
    useEffect(() => {
        setRole(sessionStorage.getItem("role"))
        getOrders();
    },[]);
    
    //getOrders to display all orders
    const getOrders = async() =>{        
        await axios.get( '/orders/',config)
        .then( ( response ) => {
            setOrders( response.data )
        }).catch((error)=>console.log(error))
        
    }

    //receiveOrder to set receive order
    const receiveOrder = async(id) =>{      
        const article = {};
        const headers = { 
            'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
            'My-Custom-Header': 'foobar'
        };
        axios.put(`/orders/receive/${id}`, article, { headers })
            .then(()=>getOrders())
            .catch((error)=> console.log(error));
    }
    
    const cancelOrder = async(id) =>{           
        const article = {};
        const headers = { 
            'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
            'My-Custom-Header': 'foobar'
        };
        axios.put(`/orders/cancel/${id}`, article, { headers })
            .then(()=>getOrders())
            .catch((error)=> console.log(error));
    }


  return (
    <>
    <Navbar></Navbar>
    <div className="container-fluid">
        <h1 className='text-center'>{t("titleOrders")}</h1>
        <div className="row mt-3">
            <div className="col-md-4 offset-md-4">
                {role === "USER" && 
                    <div className="d-grid mx-auto">
                        <Link to='/create-order' className="btn btn-dark">{t("titleCreateOrders")}</Link>
                    </div>
                }
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <TableOrders listOrders={orders} role={role} receiveOrder={receiveOrder} cancelOrder={cancelOrder} />
            </div>
        </div>
    </div>
    </>
  )
}
