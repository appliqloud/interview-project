/*Dependencies */
import React, {useState} from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

/*Components */
import { Products } from "../../views/Products";
import { config } from "../../utils/utils";


export const CreateOrder = () => {
    const { t } = useTranslation();
    const[idProduct, setIdProduct]= useState('');
    const[quantity, setQuantity]= useState('');    
    const redirect = useNavigate();

    //Store to create new order
    const store = async(e) =>{
        e.preventDefault();
        
        await axios.post("/orders/", {"productId": idProduct,"quantity": quantity}, config)
        .then(()=>redirect('/orders'))
        .catch((response)=>Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.message,            
          }))
        
    }


  return (
    <div className="container-fluid">
        <Products/>
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">{t("textCreateOrder")}</div>
                    <div className="card-body">
                        <form onSubmit={store}>
                            <label>{t("productID")}: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                            required={true} value={idProduct} onChange={ (e) => setIdProduct(e.target.value)}>
                            </input>
                            <label>{t("Quantity")}: </label>
                            <input type='text' id='descripcion' maxLength='150' 
                            className="form-control"
                            required={true} value={quantity} onChange={ (e) => setQuantity(e.target.value)}>
                            </input>
                            <button className="btn btn-success mt-3">{t("btnSave")}</button>
                            &nbsp;
                            <button className="btn btn-secondary mt-3" onClick={() => redirect("/orders")}>{t("btnBack")}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
