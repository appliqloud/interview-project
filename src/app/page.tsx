// Resources React
'use client'
import { useState, useEffect } from "react";

// Components and Containers
import TabNav from "../components/tabnav";
import ProductsContainer from "../containers/productsContainer";
import OrderContainer from "@/containers/orderContainer";

// Material UI
import { DialogsProvider } from '@toolpad/core/useDialogs';
import { EUserRole, IUser } from "./interfaces/user";


export default function Home() {

  const [indexTab, setIndexTab] = useState(0);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(user);
  }, []);

  return (
    <>
      <DialogsProvider>
        <div className="w-full h-screen">
          <div className="w-full h-full">
            <div className="flex items-center justify-center pt-10">
              <div className="w-full flex items-center justify-center flex-col gap-4">
                <TabNav setNewState={setIndexTab} />
                <div className="p-4 w-full">
                  {indexTab === 0 ?
                    <OrderContainer role={user?.role as EUserRole} />
                    :
                    <ProductsContainer role={user?.role as EUserRole} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogsProvider>
    </>
  );
}
