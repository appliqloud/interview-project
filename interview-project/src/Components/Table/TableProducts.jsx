import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

/*Icons*/ 
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdBlockFlipped } from "react-icons/md";
import { PiSealCheck } from "react-icons/pi";

export const TableProducts = ({listProducts, blockActions, deleteProduct, activateProduct, desactivateProduct}) => {   
    const { t } = useTranslation(); 
    const redirect = useNavigate();
    
  return (
    <div className="table-responsive">
        <table className="table table-bordered">
            <thead>
                <tr><th>#</th><th>{t("textTableProduct")}</th><th>{t("textTableDescription")}</th><th>{t("textTablePrice")}</th><th></th></tr>
            </thead>
            
            <tbody className="table-group-divider">
            {listProducts != "" ? 
                listProducts.map( (product, i)=>(
                    
                    <tr key={product.id}>
                        <td>{(i+1)}</td>
                        <td>{product.id}</td>
                        <td>{product.translations[0].description}</td>
                        <td>$ { new Intl.NumberFormat('es-mx').format(product.price)}</td>
                        <td>
                            <button className="btn btn-success" disabled={blockActions} onClick={()=>redirect(`/edit/${product.id}`)}>{t("btnAdd")} <FaRegEdit /></button>
                            &nbsp;
                            <button className="btn btn-danger" disabled={blockActions} onClick={()=>deleteProduct(product.id)}>{t("btnDelete")} <MdDeleteOutline /></button>
                            &nbsp;
                            {!product.isActive ? 
                                <button className="btn btn-secondary ml-2" disabled={blockActions} onClick={()=>activateProduct(product.id)}>{t("btnActivate")} <PiSealCheck /></button> :
                                <button className="btn btn-warning ml-2" disabled={blockActions} onClick={()=>desactivateProduct(product.id)}>{t("btnDeactive")} <MdBlockFlipped /></button>
                            }
                            
                            
                        </td>
                    </tr>
                ))
                : <tr><td><span className='text-center'>No hay productos</span></td></tr>}
            </tbody>
        </table>
    </div>
  )
}
