import { useAuthStore } from "@/app/lib/authStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/app/lib/userProductStore";
const roleMaster = "ADMIN";
const TableOrders = ({ products, refreshProducts }: any) => {
  const { role } = useAuthStore();
  const { orders, getOrders, receiveOrder, cancelOrder } = useProductStore();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">status</th>
            <th className="px-4 py-2">productId</th>
            <th className="px-4 py-2">quantity</th>
            <th className="px-4 py-2">total</th>
            <th className="px-4 py-2">cancel</th>
            {role === roleMaster && <th className="px-4 py-2">receive</th>}
            {/* <th className="px-4 py-2">Deactivate</th> */}
          </tr>
        </thead>
        <tbody>
          {/* Aquí se deben mostrar los productos */}
          {orders.map((order: any) => (
            <tr key={order.id} className="bg-gray-100">
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">{order.productId}</td>
              <td className="border px-4 py-2 ">{order.quantity}</td>
              <td className="border px-4 py-2">{order.total}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    cancelOrder(order.id);
                    setTimeout(() => {
                      getOrders();
                    }, 1000);
                  }}
                >
                  cancel
                </button>
              </td>
              {role === roleMaster && (
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      receiveOrder(order.id);
                      setTimeout(() => {
                        getOrders();
                      }, 1000);
                    }}
                  >
                    receive
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOrders;
