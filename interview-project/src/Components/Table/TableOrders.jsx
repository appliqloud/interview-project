/*Dependencies */
import React from 'react';
import { useTranslation } from 'react-i18next';

/*Icons */
import { AiOutlineFileDone } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";


export const TableOrders = ({listOrders, role, receiveOrder, cancelOrder}) => {
    const { t } = useTranslation();
  return (
    <div className="table-responsive">
        <table className="table table-bordered">
            <thead>
                <tr><th>#</th><th>{t("textTableId")}</th><th>{t("textTableStatus")}</th><th>{t("textTableQuantity")}</th><th>{t("textTableTotal")}</th><th></th></tr>
            </thead>
            <tbody className="table-group-divider">
                { listOrders.map( (product, i)=>(                    
                    <tr key={product.id}>
                        <td>{(i+1)}</td>
                        <td>{product.productId}</td>
                        <td>{product.status}</td>
                        <td>{product.quantity}</td>
                        <td>${new Intl.NumberFormat('es-mx').format(product.total)}</td>
                        {product.status !== "CANCELLED" &&
                            <td>
                                {role !== "USER" && <button className="btn btn-success" disabled={product.status === "RECEIVED"} onClick={()=>receiveOrder(product.id)}>{t("btnReceive")} <AiOutlineFileDone/></button>}
                                &nbsp;
                                <button className="btn btn-danger" disabled={product.status === "RECEIVED"} onClick={()=>cancelOrder(product.id)}>{t("btnCancel")} <ImCancelCircle />                                            </button>
                            </td>
                        }
                        
                    </tr>
                ))

                }
            </tbody>
        </table>
</div>
  )
}
