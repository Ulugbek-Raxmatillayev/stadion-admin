import { baseUrl } from "@/helpers/api/urls"
import { config } from "@/helpers/functions/token"
import { MastersType } from "@/helpers/interface/adminTypes/adminTypes"
import axios from "axios"
import { useQuery } from "react-query"

const AdminNotConfirmedMTable = (): JSX.Element => {
    const getMasters = useQuery({
        queryKey: ['master'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}api/v1/user/not/confirmed/master/list?page=0&size=10`, config)
            return response.data            
        }
    })
    const masters = getMasters.data?.data?.object;

    if (getMasters.isLoading) {
        return <div>Loading</div>
    }
    if (getMasters.error) {
        return <div>Error</div>
    }
    return (
        <div className="w-full h-[27rem] border p-5 bg-gray-50">
            <table className="w-full border-2 border-black">
                <thead>
                    <tr className="border-2 border-black">
                        <th className="w-1/6 border-r-2 border-black p-2">First Name</th>
                        <th className="w-1/6 border-r-2 border-black p-2">Last Name</th>
                        <th className="w-1/6 border-r-2 border-black p-2">Phone Number</th>
                        <th className="w-1/6  p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {masters && masters.map((master: MastersType) => (
                        <tr>
                            <td className="w-1/6 border-2 border-black p-2">{master.firstName}</td>
                            <td className="w-1/6 border-2 border-black p-2">{master.lastName}</td>
                            <td className="w-1/6 border-2 border-black p-2">{master.phoneNumber}</td>
                            <td className=" border-2 border-black flex justify-around py-2">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Confirm
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminNotConfirmedMTable