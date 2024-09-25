import React, {useState} from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Navbar } from "../Navbar/Navbar";
import { useTranslation } from 'react-i18next';



export const CreateProduct = () => {
    const[descriptionEn, setDescriptionEn]= useState('');
    const[descriptionEs, setDescriptionEs]= useState('');    
    const[price, setPrice]= useState(0);
    const redirect = useNavigate();
    const { t } = useTranslation();

    const store = async(e) =>{
        e.preventDefault();
        let products = JSON.parse(sessionStorage.getItem("products"));
        let newTaskId = 1;
          
        const ids = products.map(object => {
          return object.id;
        });
        if (ids.length > 0) {
          const max = Math.max(...ids);
          newTaskId = max + 1;  
        }

        let config = {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            }
          }
        await axios.post("/products/", {id:newTaskId.toString(), price:price, translations:[{language: "en", description:descriptionEn}, {language:"es", description: descriptionEs}]}, config)
        .then(()=>redirect('/products'))
        .catch(()=>Swal.fire({
            icon: "error",
            title: "Oops...",
            text: t("textWrong"),
          }))
        
    }

  return (
    <>
    <Navbar></Navbar>
    <div className="container-fluid">
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">{t("textAdd")} </div>
                    <div className="card-body">
                        <form onSubmit={store}>
                            <label>{t("textTableDescription")} *EN: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                            required={true} value={descriptionEn} onChange={ (e) => setDescriptionEn(e.target.value)}>
                            </input>
                            <label>{t("textTableDescription")} *ES: </label>
                            <input type='text' id='descripcion' maxLength='150' 
                            className="form-control"
                            required={true} value={descriptionEs} onChange={ (e) => setDescriptionEs(e.target.value)}>
                            </input>
                            <label>{t("textTablePrice")}: </label>
                            <input type='number' id='precio' 
                            className="form-control" step='0.1'
                            required={true} value={price} onChange={ (e) => setPrice(e.target.value)}>
                            </input>
                            <button className="btn btn-success mt-3">{t("btnSave")}</button>
                            &nbsp;
                            <button className="btn btn-secondary mt-3" onClick={() => redirect("/products")}>{t("btnBack")}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
