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
import { useQuery } from "react-query";
import axios from "axios";
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

const Chart = () => {
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Use react-query to fetch the statistics data
    const { isLoading, error, data } = useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}api/v1/statistic/for/admin/yearly-statistic?year=2024`,config);
            return response.data; // Assuming the response returns an object with `orderData`, `priceData`, and `clientData`
        }
    });
    const data2 = useQuery({
        queryKey: ["dashboard2"],
        queryFn: async () => {
            const response2 = await axios.get(`${baseUrl}api/v1/statistic/for/admin/yearly-clientCount?year=2024`,config);
            return response2.data; // Assuming the response returns an object with `orderData`, `priceData`, and `clientData`
        }
    });
    
    useEffect(()=>{
        data2.data
    },[])
    

    // Show loading state or error state
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    // Assuming the API response structure is as follows:
    // { orders: [..], totalPrice: [..], clients: [..] }
    const fetchedOrderData = data?.data[0].orderCount || [];
    const fetchedPriceData = data?.data[0].totalPrice || [];
    const fetchedClientData = data2?.data.data[0].clientCount || [];
    // console.log( );
    

    // Order Count data
    const orderData = {
        labels,
        datasets: [
            {
                label: "Order Count",
                data: [0,0,0,0,0,0,0,0,fetchedOrderData,0,0], // Use fetched data
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    // Total Price data
    const priceData = {
        labels,
        datasets: [
            {
                label: "Total Price",
                data: [0,0,0,0,fetchedPriceData,0,0,0,0,0,0,0], // Use fetched data
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
            },
        ],
    };

    // Client Count data
    const clientData = {
        labels,
        datasets: [
            {
                label: "Client Count",
                data: [0,0,0,0,0,0,0,0,fetchedClientData,0,0,0], // Use fetched data
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const options = {
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
                        <Line data={clientData} options={options} />
                    </div>
                </div>
            </div>
        </AdminScreen>
    );
};

export default Chart;
