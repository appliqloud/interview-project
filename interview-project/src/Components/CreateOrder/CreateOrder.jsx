import React, {useState} from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Products } from "../../views/Products";


export const CreateOrder = () => {
    const[idProduct, setIdProduct]= useState('');
    const[quantity, setQuantity]= useState('');    
    const redirect = useNavigate();

    const store = async(e) =>{
        e.preventDefault();
        let config = {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            }
          }
        await axios.post("/orders/", {"productId": idProduct,"quantity": quantity}, config)
        .then(()=>redirect('/orders'))
        .catch(()=>Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",            
          }))
        
    }


  return (
    <div className="container-fluid">
        <Products/>
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">Crear Orden</div>
                    <div className="card-body">
                        <form onSubmit={store}>
                            <label>Id Producto: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                            required={true} value={idProduct} onChange={ (e) => setIdProduct(e.target.value)}>
                            </input>
                            <label>Cantidad: </label>
                            <input type='text' id='descripcion' maxLength='150' 
                            className="form-control"
                            required={true} value={quantity} onChange={ (e) => setQuantity(e.target.value)}>
                            </input>
                            <button className="btn btn-success mt-3">Guardar</button>
                            &nbsp;
                            <button className="btn btn-secondary mt-3" onClick={() => redirect("/orders")}>Regresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
