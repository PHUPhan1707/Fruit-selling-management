import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import PropTypes from 'prop-types'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend)

const WeeklyRevenue = ({ weeklyRevenue = [] }) => {
    // Calculate percentage change from the beginning to the end of the week
    const calculatePercentageChange = () => {
        if (weeklyRevenue.length < 2) return { percentage: 0, isIncrease: true };

        const firstValue = weeklyRevenue[0].totalRevenue; // First day (e.g., Saturday)
        const lastValue = weeklyRevenue[weeklyRevenue.length - 1].totalRevenue; // Last day (e.g., Friday)

        if (firstValue === 0) return { percentage: 0, isIncrease: true };

        const change = lastValue - firstValue;
        const percentage = Math.abs((change / firstValue) * 100).toFixed(1);
        const isIncrease = change >= 0;

        return { percentage, isIncrease };
    };

    const { percentage, isIncrease } = calculatePercentageChange();

    const chartData = {
        labels: weeklyRevenue.map((item) => item.date),
        datasets: [
            {
                label: 'Weekly Revenue',
                data: weeklyRevenue.map((item) => item.totalRevenue),
                borderColor: '#FF5252',
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(255, 82, 82, 0.6)');
                    gradient.addColorStop(0.5, 'rgba(255, 82, 82, 0.3)');
                    gradient.addColorStop(1, 'rgba(90, 138, 98, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.5,
                pointRadius: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 4000,
                ticks: {
                    callback: (value) => `$${value / 1000}k`,
                    color: '#FFFFFF',
                    stepSize: 1000,
                },
                grid: {
                    display: false,
                },
                border: {
                    color: '#FFFFFF', // White y-axis line
                },
            },
            x: {
                ticks: {
                    color: '#FFFFFF',
                },
                grid: {
                    display: false,
                },
                border: {
                    color: '#FFFFFF', // White x-axis line
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(255, 82, 82, 0.8)',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                callbacks: {
                    label: (context) => `$${context.parsed.y}`,
                },
            },
        },
    };

    return (
        <div className="relative h-full rounded-xl p-2 bg-green_dark1">
            <div className="absolute leading-3">
                <i className="fa fa-circle rounded-full border border-[#5A8A62] text-[0.8rem] text-offwhite"></i>
            </div>
            <div className="flex justify-between p-4">
                <span className="text-[1.125rem] font-bold text-[#FFF]">Weekly Revenue ($)</span>
                <div className="flex space-x-2 items-center">
                    {isIncrease ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={12}
                            height={18}
                            viewBox="0 0 12 18"
                            fill="none"
                        >
                            <path
                                d="M6.53033 0.469669C6.23744 0.176777 5.76256 0.176777 5.46967 0.469669L0.696699 5.24264C0.403805 5.53553 0.403805 6.01041 0.696699 6.3033C0.989592 6.59619 1.46447 6.59619 1.75736 6.3033L6 2.06066L10.2426 6.3033C10.5355 6.59619 11.0104 6.59619 11.3033 6.3033C11.5962 6.01041 11.5962 5.53553 11.3033 5.24264L6.53033 0.469669ZM6.75 18L6.75 1L5.25 1L5.25 18L6.75 18Z"
                                fill="#A0D900"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={12}
                            height={18}
                            viewBox="0 0 12 18"
                            fill="none"
                            className="rotate-180"
                        >
                            <path
                                d="M6.53033 0.469669C6.23744 0.176777 5.76256 0.176777 5.46967 0.469669L0.696699 5.24264C0.403805 5.53553 0.403805 6.01041 0.696699 6.3033C0.989592 6.59619 1.46447 6.59619 1.75736 6.3033L6 2.06066L10.2426 6.3033C10.5355 6.59619 11.0104 6.59619 11.3033 6.3033C11.5962 6.01041 11.5962 5.53553 11.3033 5.24264L6.53033 0.469669ZM6.75 18L6.75 1L5.25 1L5.25 18L6.75 18Z"
                                fill="#FF5252"
                            />
                        </svg>
                    )}
                    <span className={isIncrease ? 'text-[#A0D900]' : 'text-[#FF5252]'}>
                        {percentage}%
                    </span>
                </div>
            </div>
            <div className="px-8 h-[80%]">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    )
}

WeeklyRevenue.propTypes = {
    weeklyRevenue: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            totalRevenue: PropTypes.number.isRequired,
        })
    ).isRequired,
}

export default WeeklyRevenue