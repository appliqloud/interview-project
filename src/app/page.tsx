'use client'
import { useState } from "react";
import TabNav from "../components/tabnav";
import ProductsContainer from "../containers/productsContainer";
import { DialogsProvider } from '@toolpad/core/useDialogs';
import OrderContainer from "@/containers/orderContainer";


export default function Home() {
  const [indexTab, setIndexTab] = useState(0);
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
                    <OrderContainer />
                    :
                    <ProductsContainer />
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
