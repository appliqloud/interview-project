import React, {useEffect, useState} from 'react'
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../Components/Navbar/Navbar';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';


let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
    }
  }
  

export const Products = () => {
    const redirect = useNavigate();
    const [products, setProducts] = useState([]);
    const [blockActions, setBlockActions] = useState(false);
    const { t } = useTranslation();
    
    useEffect(() => {
        sessionStorage.getItem("role") === "USER" && setBlockActions(true)
        getProducts();
    },[]);
    
    const getProducts = async() =>{        
        await axios.get( '/products/',config)
        .then( ( response ) => {
            setProducts( response.data )
        }).catch((error)=>console.log(error))
        
    }

    const deleteProduct = async(id) =>{      
        (await axios.delete(`/products/${id}`,config)
        .then(()=>
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto eliminado",
            showConfirmButton: false,
            timer: 1500
        })
        
    ).then(()=>getProducts())
    .catch((error)=>console.log(error))
    )     
    }

    const activateProduct = async(id) =>{      
        const article = {};
        const headers = { 
            'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
            'My-Custom-Header': 'foobar'
        };
        axios.put(`/products/activate/${id}`, article, { headers })
            .then(()=>
                getProducts(),        
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Producto activado",
                    showConfirmButton: false,
                    timer: 1500
                }))
            .catch((error)=> console.log(error));
    }
    
    const desactivateProduct = async(id) =>{           
        const article = {};
        const headers = { 
            'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
            'My-Custom-Header': 'foobar'
        };
        axios.put(`/products/deactivate/${id}`, article, { headers })
            .then(()=>
                getProducts(),
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Producto desactivado",
                showConfirmButton: false,
                timer: 1500
            })
        )
            .catch((error)=> console.log(error));
    }

    sessionStorage.setItem("products", JSON.stringify(products));

  return (
    <>
    <Navbar></Navbar>
    <div className="container-fluid">
    <h1 className='text-center'>{t("titleProduct")}</h1>
        {!blockActions && 
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <Link to='/create' className="btn btn-dark">{t("textAdd")}</Link>
                    </div>
                </div>
            </div>
        }
        
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr><th>#</th><th>{t("textTableProduct")}</th><th>{t("textTableDescription")}</th><th>{t("textTablePrice")}</th><th></th></tr>
                        </thead>
                        <tbody className="table-group-divider">
                            { products.map( (product, i)=>(
                                
                                <tr key={product.id}>
                                    <td>{(i+1)}</td>
                                    <td>{product.id}</td>
                                    <td>{product.translations[0].description}</td>
                                    <td>$ { new Intl.NumberFormat('es-mx').format(product.price)}</td>
                                    <td>
                                        <button className="btn btn-success" disabled={blockActions} onClick={()=>redirect(`/edit/${product.id}`)}>{t("btnAdd")}</button>
                                        &nbsp;
                                        <button className="btn btn-danger" disabled={blockActions} onClick={()=>deleteProduct(product.id)}>{t("btnDelete")}</button>
                                        &nbsp;
                                        {!product.isActive ? 
                                            <button className="btn btn-secondary ml-2" disabled={blockActions} onClick={()=>activateProduct(product.id)}>{t("btnActivate")}</button> :
                                            <button className="btn btn-warning ml-2" disabled={blockActions} onClick={()=>desactivateProduct(product.id)}>{t("btnDeactive")}</button>
                                        }
                                        
                                        
                                    </td>
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
