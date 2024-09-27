import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { baseUrl } from "@/helpers/api/urls";
import { useQuery, UseQueryResult } from "react-query";
import axios, { AxiosResponse } from "axios";
import { config } from "@/helpers/functions/token";
import { useEffect } from "react";
import AdminScreen from "@/pages";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface OrderData {
    orderCount: number[];
    totalPrice: number[];
}

interface ClientData {
    clientCount: number[];
}

const Chart: React.FC = () => {
    const labels: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const { isLoading, error, data }: UseQueryResult<OrderData> = useQuery<OrderData>({
        queryKey: ["dashboard"],
        queryFn: async (): Promise<AxiosResponse<OrderData>> => {
            const response = await axios.get(`${baseUrl}api/v1/statistic/for/admin/yearly-statistic?year=2024`, config);
            return response.data;
        }
    });

    const { data: clientData }: UseQueryResult<ClientData> = useQuery<ClientData>({
        queryKey: ["dashboard2"],
        queryFn: async (): Promise<AxiosResponse<ClientData>> => {
            const response = await axios.get(`${baseUrl}api/v1/statistic/for/admin/yearly-clientCount?year=2024`, config);
            return response.data;
        }
    });

    useEffect(() => {
        clientData;
    }, [clientData]);

    if (isLoading) {
        return (
            <div className="w-full h-screen">

                <div role="status" className="flex items-center h-screen justify-center">
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>

        )
    }
    if (error) return <div>Error fetching data</div>;

    const fetchedOrderData: number[] = data?.data[0]?.orderCount || [];
    const fetchedPriceData: number[] = data?.data[0]?.totalPrice || [];
    const fetchedClientData: number[] = clientData?.data[0]?.clientCount || [];

    const orderData = {
        labels,
        datasets: [
            {
                label: "Order Count",
                data: [0, 0, 0, 0, 0, 0, 0, 0, fetchedOrderData, 0, 0, 0],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    const priceData = {
        labels,
        datasets: [
            {
                label: "Total Price",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, fetchedPriceData, 0, 0, 0],
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
            },
        ],
    };

    const clientCountData = {
        labels,
        datasets: [
            {
                label: "Client Count",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, fetchedClientData, 0, 0, 0],
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const options: {
        responsive: boolean;
        plugins: {
            legend: {
                position: 'top';
            };
            title: {
                display: boolean;
                text: string;
            };
        };
    } = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Yearly Statistics for 2024',
            },
        },
    };

    return (
        <AdminScreen pageName={"Dashboard"}>
            <div className="dashboard">
                <div className="chart-container">
                    <div>
                        <h3>Order Count</h3>
                        <Line data={orderData} options={options} />
                    </div>
                    <div>
                        <h3>Total Price</h3>
                        <Line data={priceData} options={options} />
                    </div>
                    <div>
                        <h3>Client Count</h3>
                        <Line data={clientCountData} options={options} />
                    </div>
                </div>
            </div>
        </AdminScreen>
    );
};

export default Chart;
