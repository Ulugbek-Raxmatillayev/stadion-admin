import { useQuery } from "react-query"
import AdminScreen from ".."
import { baseUrl } from "@/helpers/api/urls"
import { config } from "@/helpers/functions/token"
import AdminClientTable from "@/components/custom/AdminClientTable"

function Client():JSX.Element {
  
  return (
    <AdminScreen pageName={"Client"}>
      <div className="mt-10">
        <AdminClientTable/>
      </div>
    </AdminScreen>
  )
}

export default Client