import { baseUrl } from "@/helpers/api/urls";
import { config } from "@/helpers/functions/token";
import { MastersType, StadiumsType } from "@/helpers/interface/adminTypes/adminTypes";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { QueryClient, useMutation, useQuery, UseQueryResult } from "react-query";

const queryClient = new QueryClient();

const AdminConfirmedMTable = (): JSX.Element => {
    const [selected, setSelected] = useState<string>('');
    const [isInfo, setIsInfo] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const openDelete = (): void => {
        setIsDelete((prev) => !prev);
    };

    const openInfo = (): void => {
        setIsInfo((prev) => !prev);
    };

    const getMasters: UseQueryResult<{ data: { object: MastersType[] } }> = useQuery({
        queryKey: ['master'],
        queryFn: async (): Promise<AxiosResponse<{ data: { object: MastersType[] } }>> => {
            const response = await axios.get(`${baseUrl}api/v1/user/masters/list?page=0&size=10`, config);
            return response.data;
        }
    });

    const getStadiumInfo: UseQueryResult<{ data: StadiumsType[] }> = useQuery({
        queryKey: ['stadiumInfo', selected],
        queryFn: async (): Promise<AxiosResponse<{ data: StadiumsType[] }>> => {
            const response = await axios.get(`${baseUrl}api/v1/stadium/list/for/admin/${selected}`, config);
            return response.data;
        },
        enabled: !!selected,
    });

    const deleteMaster = useMutation({
        mutationKey: ['deleteMaster', selected],
        mutationFn: async (): Promise<AxiosResponse<void>> => {
            const response = await axios.delete(`${baseUrl}api/v1/user/${selected}`, config);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['master'] });
            setIsDelete(false);
        },
        onError: (error) => {
            console.log("Error data message", error);
        }
    });

    const masters: MastersType[] | undefined = getMasters.data?.data?.object;
    const stadium: StadiumsType[] | undefined = getStadiumInfo.data?.data;

    if (getMasters.isLoading || (selected && getStadiumInfo.isLoading)) {
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

    if (getMasters.error) {
        return <div>Error loading masters</div>;
    }

    if (getStadiumInfo.error) {
        return <div>Error loading stadium info</div>;
    }

    return (
        <div className="w-full h-[27rem] border p-5 bg-gray-50">
            <table className="w-full border-2 border-black">
                <thead>
                    <tr className="border-2 border-black">
                        <th className="w-1/6 border-r-2 border-black p-2">First Name</th>
                        <th className="w-1/6 border-r-2 border-black p-2">Last Name</th>
                        <th className="w-1/6 border-r-2 border-black p-2">Phone Number</th>
                        <th className="w-1/6 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {masters ? masters.map((master: MastersType) => (
                        <tr key={master.id}>
                            <td className="w-1/6 border-2 border-black p-2">{master.firstName}</td>
                            <td className="w-1/6 border-2 border-black p-2">{master.lastName}</td>
                            <td className="w-1/6 border-2 border-black p-2">{master.phoneNumber}</td>
                            <td className="border-2 border-black flex justify-around py-2">
                                <button onClick={() => (setSelected(master.id), openDelete())} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                                <button onClick={() => (setSelected(master.id), openInfo())} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Info
                                </button>
                            </td>
                        </tr>
                    )) : <tr className="border-2 border-black text-center pl-10">No confirmed masters</tr>}
                </tbody>
            </table>
            {isInfo &&
                <div id="default-modal" aria-hidden="true" className="flex backdrop-blur-md bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-green-700 dark:text-white">
                                    Master Stadiums
                                </h3>
                                <button onClick={openInfo} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                {selected ? (
                                    stadium && stadium.length > 0 ? (
                                        stadium.map((stadium: StadiumsType) => (
                                            <ul className="ml-40" key={stadium.id}>
                                                <li><span className="font-bold">Stadium Name -</span> <span className="text-gray-600 font-semibold">{stadium.name}</span></li>
                                                <li><span className="font-bold">Description -</span> <span className="text-gray-600 font-semibold">{stadium.description}</span></li>
                                                <li><span className="font-bold">Favourite -</span> <span className="text-gray-600 font-semibold">{stadium.favourite ? "Favourite" : "No favourite"}</span></li>
                                            </ul>
                                        ))
                                    ) : <h1 className="text-center text-yellow-500">No stadiums yet</h1>
                                ) : <h1 className="text-center text-yellow-500">No stadium selected</h1>}
                            </div>
                            <div className="flex bg-gray-50 items-center p-4 md:p-5 justify-end rounded-b dark:border-gray-600">
                                <button onClick={openInfo} data-modal-hide="default-modal" type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isDelete &&
                <div id="popup-modal" className="flex backdrop-blur-md bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={openDelete} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="pt-5">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-center text-xl font-bold text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>
                                <div className="bg-gray-50 flex justify-end p-3 rounded-b-md w-full">
                                    <button onClick={openDelete} data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                        No
                                    </button>
                                    <button onClick={() => deleteMaster.mutate()} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-red-200 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-700 dark:bg-red-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AdminConfirmedMTable;
