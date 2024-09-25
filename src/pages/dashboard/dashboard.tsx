import React from "react";
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
import AdminScreen from "..";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Order Count data
    const orderData = {
        labels,
        datasets: [
            {
                label: "Order Count",
                data: [0, 10, 20, 30, 0, 0, 10, 0, 45, 0, 0, 0], // Example data
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
                data: [0, 0, 0, 0, 0, 0, 500000, 0, 4000000, 0, 0, 0], // Example data
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
                data: [0, 0, 0, 0, 0, 0, 5, 0, 20, 0, 0, 0], // Example data
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
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

export default Dashboard;
