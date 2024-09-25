import React, {useEffect, useState} from 'react'
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { Navbar } from '../Components/Navbar/Navbar';
import { useTranslation } from 'react-i18next';

let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
    }
  }

export const Orders = () => {
    const [products, setProducts] = useState([]);
    const [role, setRole] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        setRole(sessionStorage.getItem("role"))
        getOrders();
    },[]);
    
    const getOrders = async() =>{        
        await axios.get( '/orders/',config)
        .then( ( response ) => {
            setProducts( response.data )
        }).catch((error)=>console.log(error))
        
    }

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
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr><th>#</th><th>{t("textTableId")}</th><th>{t("textTableStatus")}</th><th>{t("textTableQuantity")}</th><th>{t("textTableTotal")}</th><th></th></tr>
                        </thead>
                        <tbody className="table-group-divider">
                            { products.map( (product, i)=>(
                                
                                <tr key={product.id}>
                                    <td>{(i+1)}</td>
                                    <td>{product.productId}</td>
                                    <td>{product.status}</td>
                                    <td>{product.quantity}</td>
                                    <td>${new Intl.NumberFormat('es-mx').format(product.total)}</td>
                                    {product.status !== "CANCELLED" &&
                                        <td>
                                            {role !== "USER" && <button className="btn btn-success" disabled={product.status === "RECEIVED"} onClick={()=>receiveOrder(product.id)}>{t("btnReceive")}</button>}
                                            &nbsp;
                                            <button className="btn btn-danger" disabled={product.status === "RECEIVED"} onClick={()=>cancelOrder(product.id)}>{t("btnCancel")}</button>
                                        </td>
                                    }
                                    
                                </tr>
                            ))

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
