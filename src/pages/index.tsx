import Header from "@/components/custom/header"
import SideBar from "@/components/custom/sidebar"
import { AdminProps } from "@/helpers/interface/adminTypes/adminTypes"
import React from "react"
const AdminScreen: React.FC<AdminProps> = ({ children,pageName }): JSX.Element => {
  return (
    <>
      <Header pageName={pageName}/>
      <SideBar />

      <div className="px-10 py-16 sm:ml-64">

        {children}
      </div>
    </>
  )
}

export default AdminScreen