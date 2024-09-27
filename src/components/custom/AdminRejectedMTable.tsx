import { baseUrl } from "@/helpers/api/urls";
import { config } from "@/helpers/functions/token";
import { MastersType } from "@/helpers/interface/adminTypes/adminTypes";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const AdminRejectedMTable = (): JSX.Element => {
    const { data, error, isLoading }: UseQueryResult<{ data: { object: MastersType[] } }> = useQuery({
        queryKey: ['rejectedmaster'],
        queryFn: async (): Promise<AxiosResponse<{ data: { object: MastersType[] } }>> => {
            const response = await axios.get(`${baseUrl}api/v1/user/rejected/list`, config);
            return response.data;
        },
    });

    const rejected: MastersType[] | undefined = data?.data.object;

    if (isLoading) {
        return (
            <div role="status " className="flex items-center w-full h-[40vh] justify-center">
                <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    if (error) {
        return <div>Error loading rejected masters</div>;
    }

    return (
        <div className="w-full h-[27rem] border p-5 bg-gray-50">
            <table className="w-full border-2 border-black">
                <thead>
                    <tr className="border-2 border-black">
                        <th className="w-1/6 border-r-2 border-black p-2">First Name</th>
                        <th className="w-1/6 border-r-2 border-black p-2">Last Name</th>
                        <th className="w-1/6 border-r-2 border-black p-2">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {rejected && rejected.length > 0 ? (
                        rejected.map((master: MastersType) => (
                            <tr key={master.id}>
                                <td className="w-1/6 border-2 border-black p-2">{master.firstName}</td>
                                <td className="w-1/6 border-2 border-black p-2">{master.lastName}</td>
                                <td className="w-1/6 border-2 border-black p-2">{master.phoneNumber}</td>
                            </tr>
                        ))
                    ) : (
                        <tr className="flex justify-center w-full text-orange-500">
                            <td colSpan={3}>No rejected masters</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminRejectedMTable;
