import { useRef, useEffect } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
);

const OrderChart = ({ weeklyOrders }) => {
    console.log('OrderChart ~ weeklyOrders:', weeklyOrders);
    const chartRef = useRef(null);

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    // Extract data for each category
    const labels = weeklyOrders?.map((item) => item.date);
    const placedOrders = weeklyOrders?.map((item) => item.placedOrders);
    const packagedOrders = weeklyOrders?.map((item) => item.packagedOrders);
    const shippedOrders = weeklyOrders?.map((item) => item.shippedOrders);

    return (
        <div className="relative h-full rounded-xl p-2 bg-green_dark1">
            <div className="absolute leading-3">
                <i className="fa fa-circle rounded-full border border-[#5A8A62] text-[0.8rem] text-offwhite"></i>
            </div>
            <div className="p-4">
                <span className="text-[1.125rem] font-bold text-[#FFFFFF]">Weekly Order</span>
            </div>

            <div className="h-[14rem] px-8">
                <Line
                    ref={chartRef}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Placed Orders',
                                data: placedOrders,
                                borderColor: '#26A69A', // Teal
                                backgroundColor: '#26A69A',
                                fill: false, // No fill for a pure line chart
                                tension: 0.3, // Slight curve for smoothness
                                pointRadius: 4, // Show points
                                pointBackgroundColor: '#26A69A',
                                borderWidth: 2,
                            },
                            {
                                label: 'Packaged Orders',
                                data: packagedOrders,
                                borderColor: '#FFCA28', // Yellow
                                backgroundColor: '#FFCA28',
                                fill: false,
                                tension: 0.3,
                                pointRadius: 4,
                                pointBackgroundColor: '#FFCA28',
                                borderWidth: 2,
                            },
                            {
                                label: 'Shipped Orders',
                                data: shippedOrders,
                                borderColor: '#FF9800', // Orange
                                backgroundColor: '#FF9800',
                                fill: false,
                                tension: 0.3,
                                pointRadius: 4,
                                pointBackgroundColor: '#FF9800',
                                borderWidth: 2,
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                ticks: {
                                    color: '#FFFFFF', // White labels
                                },
                                grid: {
                                    display: false, // No grid lines
                                },
                                border: {
                                    color: '#FFFFFF', // White x-axis line
                                },
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#FFFFFF', // White labels
                                    stepSize: 5, // Adjust based on data range
                                    callback: (value) => `${value}`,
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)', // Faint white grid lines
                                    display: true,
                                },
                                border: {
                                    color: '#FFFFFF', // White y-axis line
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: true, // Show legend to identify lines
                                labels: {
                                    color: '#FFFFFF', // White legend text
                                },
                            },
                            tooltip: {
                                enabled: true,
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: '#FFFFFF',
                                bodyColor: '#FFFFFF',
                                callbacks: {
                                    label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
                                },
                            },
                        },
                    }}
                />
            </div>

            <div className="space-y-4 p-4 text-[#FFFFFF]">
                <span className="text-[1.125rem] font-bold">Upcoming orders</span>
                <div className="space-y-4 rounded-lg border border-grey_light1 bg-[#FAFAFB] px-8 py-4">
                    <div className="flex space-x-4">
                        <i className="fa fa-calendar-check text-[3rem] text-green_dark1"></i>
                        <div>
                            <span className="text-redpink_dark1">25 Order</span>
                            <div className="text-green_dark1">Total successfully placed orders</div>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <i className="fa fa-box text-[3rem] text-green_dark1"></i>
                        <div>
                            <span className="text-redpink_dark1">12 Order</span>
                            <div className="text-green_dark1">Total packaged orders</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderChart;