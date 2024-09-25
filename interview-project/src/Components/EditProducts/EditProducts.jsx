import React, {useEffect, useState} from "react";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
    }
  }


export const EditProducts = () => {
    const[descriptionEn, setDescriptionEn]= useState('');
    const[descriptionEs, setDescriptionEs]= useState('');
    const[price, setPrice]= useState(0);
    const {id} = useParams();
    const redirect = useNavigate();

    useEffect( () =>{
        const getProduct = async() =>{
            const respuesta = await axios.get(`/products/${id}`,config);
            setDescriptionEn(respuesta.data.translations[0].description);
            setDescriptionEs(respuesta.data.translations[1].description);
            setPrice(respuesta.data.price);
        }
        getProduct();
    },[]);

    const update = async(e) =>{
        e.preventDefault();
     
        const article = {
            "price": price,
            "translations": [
              {
                "language": "es",
                "description": descriptionEs
              },
              {
                "language": "en",
                "description": descriptionEn
              },
            ]
          };
        const headers = { 
            'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
            'My-Custom-Header': 'foobar'
        };
        axios.put(`/products/${id}`, article, { headers })
            .then(()=>redirect('/products'))
            .catch((error)=> console.log(error));
    }


  return (
    <div className="container-fluid">
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <div className="card">
                    <div className="card-header bg-dark text-white">Editar productos</div>
                    <div className="card-body">
                        <form onSubmit={update}>
                            <label>Nombre: </label>
                            <input type='text' id='nombre' maxLength='80' 
                            className="form-control"
                            required={true} value={descriptionEn} onChange={ (e) => setDescriptionEn(e.target.value)}>
                            </input>
                            <label>Descripción: </label>
                            <input type='text' id='descripcion' maxLength='150' 
                            className="form-control"
                            required={true} value={descriptionEs} onChange={ (e) => setDescriptionEs(e.target.value)}>
                            </input>
                            <label>Precio: </label>
                            <input type='number' id='precio' 
                            className="form-control" step='0.1'
                            required={true} value={price} onChange={ (e) => setPrice(e.target.value)}>
                            </input>
                            <button className="btn btn-success mt-3">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
