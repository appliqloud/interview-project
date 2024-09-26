'use client'
import { useState } from "react";
import TabNav from "./components/tabnav";
export default function Home() {
  const [indexTab, setIndexTab] = useState(0);
  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-full">
          <div className="flex items-center justify-center pt-10">
            <div className="w-full flex items-center justify-center flex-col gap-4">
              <TabNav setNewState={setIndexTab}/>
              {indexTab === 0 ? 
              <div>
                <div>
                  <h1>Ordenes</h1>
                </div>
              </div> : 
              <div>
                <div>
                  <h1>Productos</h1>
                </div>
              </div>}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
