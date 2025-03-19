import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
	const [orderData, setOrderData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [hoveredCard, setHoveredCard] = useState(null);
	const [hoveredContent, setHoveredContent] = useState(null);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [selectedDate, setSelectedDate] = useState('');

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const response = await axios.get('http://localhost:8080/warehouse/import');
				setOrderData(response.data.content);
				setFilteredData(response.data.content);
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};

		fetchOrderData();
	}, []);

	// Sorting Logic
	const sortData = (key, direction) => {
		const sortedData = [...filteredData].sort((a, b) => {
			if (key === 'import_id' || key === 'quantity') {
				return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
			}
			if (key === 'import_date') {
				return direction === 'asc'
					? new Date(a.import_date) - new Date(b.import_date)
					: new Date(b.import_date) - new Date(a.import_date);
			}
			return 0;
		});
		setFilteredData(sortedData);
		setSortConfig({ key, direction });
	};

	// Date Filter Logic
	const handleDateChange = (e) => {
		const date = e.target.value;
		setSelectedDate(date);
		if (date) {
			const filtered = orderData.filter(
				(order) => new Date(order.import_date).toISOString().split('T')[0] === date
			);
			setFilteredData(filtered);
		} else {
			setFilteredData(orderData);
		}
	};

	const backgroundStyle = (isHovered) => ({
		width: '1000px',
		height: 'auto',
		borderRadius: '12px',
		border: '1px solid #e0e0e0',
		marginTop: '67px',
		marginLeft: '62px',
		padding: '40px',
		backgroundColor: '#3a4a2b',  // Green, darkens on hover
		boxShadow: isHovered ? '0 6px 12px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
		transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
	});

	const boxStyle = (isHovered) => ({
		display: 'flex',
		flexDirection: 'column',
		width: '900px',
		height: 'auto',
		borderRadius: '10px',
		background: isHovered ? '#f7faf6' : '#ffffff',
		margin: '0 auto 20px',
		padding: '25px',
		boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
		border: '1px solid #e6e9e2',
		transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
		cursor: 'pointer',
	});

	const titleStyle = (isHovered) => ({
		color: isHovered ? '#3a4a2b' : '#485935',
		fontSize: '22px',
		fontWeight: '700',
		marginBottom: '15px',
		transition: 'color 0.2s ease',
	});

	const contentStyle = (isHovered) => ({
		color: '#485935',
		fontSize: '18px',
		fontWeight: '400',
		lineHeight: '1.6',
		padding: '4px 8px',
		backgroundColor: isHovered ? '#e0f2e9' : 'transparent',
		borderRadius: '4px',
		transition: 'background-color 0.2s ease',
	});

	const labelStyle = {
		fontWeight: '600',
		marginRight: '8px',
	};

	const controlsStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '25px',
		gap: '20px',
	};

	const sortContainerStyle = {
		display: 'flex',
		gap: '10px',
		flexWrap: 'wrap',
	};

	const buttonStyle = {
		padding: '8px 12px',
		backgroundColor: '#ffffff', // White background
		color: '#485935', // Dark green text
		border: '1px solid #485935', // Green border for contrast
		borderRadius: '6px',
		cursor: 'pointer',
		fontSize: '16px',
		fontWeight: '500',
		transition: 'background-color 0.2s ease, color 0.2s ease',
	};

	const datePickerStyle = {
		padding: '8px 12px',
		border: '1px solid #e0e0e0',
		borderRadius: '6px',
		fontSize: '16px',
		transition: 'border-color 0.2s ease',
		'&:focus': {
			borderColor: '#485935',
			outline: 'none',
		},
	};

	const renderOrderBox = (order, index) => (
		<div
			style={boxStyle(hoveredCard === index)}
			key={order.import_id}
			onMouseEnter={() => setHoveredCard(index)}
			onMouseLeave={() => setHoveredCard(null)}
		>
			<div style={titleStyle(hoveredCard === index)}>Order no. {order.import_id}</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{[
					{ label: 'Product ID:', value: order.product_id },
					{ label: 'Supplier ID:', value: order.supplier_id },
					{ label: 'Quantity:', value: order.quantity },
					{ label: 'Import Date:', value: new Date(order.import_date).toLocaleDateString() },
					{ label: 'Supplier:', value: order.supplier.supplier_name },
				].map((item, contentIndex) => (
					<div
						key={contentIndex}
						style={contentStyle(hoveredContent === `${index}-${contentIndex}`)}
						onMouseEnter={() => setHoveredContent(`${index}-${contentIndex}`)}
						onMouseLeave={() => setHoveredContent(null)}
					>
						<span style={labelStyle}>{item.label}</span> {item.value}
					</div>
				))}
			</div>
		</div>
	);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div
			style={backgroundStyle(hoveredCard !== null)}
			onMouseEnter={() => setHoveredCard(-1)}
			onMouseLeave={() => setHoveredCard(null)}
		>
			<div style={controlsStyle}>
				<div style={sortContainerStyle}>
					<button
						style={{
							...buttonStyle,
							backgroundColor: sortConfig.key === 'import_id' && sortConfig.direction === 'asc' ? '#e0f2e9' : '#ffffff',
						}}
						onClick={() => sortData('import_id', 'asc')}
						onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0f2e9')}
						onMouseLeave={(e) => (e.target.style.backgroundColor = sortConfig.key === 'import_id' && sortConfig.direction === 'asc' ? '#e0f2e9' : '#ffffff')}
					>
						Order ID ↑
					</button>
					<button
						style={{
							...buttonStyle,
							backgroundColor: sortConfig.key === 'import_id' && sortConfig.direction === 'desc' ? '#e0f2e9' : '#ffffff',
							marginLeft: '10px',
						}}
						onClick={() => sortData('import_id', 'desc')}
						onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0f2e9')}
						onMouseLeave={(e) => (e.target.style.backgroundColor = sortConfig.key === 'import_id' && sortConfig.direction === 'desc' ? '#e0f2e9' : '#ffffff')}
					>
						Order ID ↓
					</button>
					<button
						style={{
							...buttonStyle,
							backgroundColor: sortConfig.key === 'quantity' && sortConfig.direction === 'asc' ? '#e0f2e9' : '#ffffff',
							marginLeft: '10px',
						}}
						onClick={() => sortData('quantity', 'asc')}
						onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0f2e9')}
						onMouseLeave={(e) => (e.target.style.backgroundColor = sortConfig.key === 'quantity' && sortConfig.direction === 'asc' ? '#e0f2e9' : '#ffffff')}
					>
						Quantity ↑
					</button>
					<button
						style={{
							...buttonStyle,
							backgroundColor: sortConfig.key === 'quantity' && sortConfig.direction === 'desc' ? '#e0f2e9' : '#ffffff',
							marginLeft: '10px',
						}}
						onClick={() => sortData('quantity', 'desc')}
						onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0f2e9')}
						onMouseLeave={(e) => (e.target.style.backgroundColor = sortConfig.key === 'quantity' && sortConfig.direction === 'desc' ? '#e0f2e9' : '#ffffff')}
					>
						Quantity ↓
					</button>
					<button
						style={{
							...buttonStyle,
							backgroundColor: sortConfig.key === 'import_date' && sortConfig.direction === 'asc' ? '#e0f2e9' : '#ffffff',
							marginLeft: '10px',
						}}
						onClick={() => sortData('import_date', 'asc')}
						onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0f2e9')}
						onMouseLeave={(e) => (e.target.style.backgroundColor = sortConfig.key === 'import_date' && sortConfig.direction === 'asc' ? '#e0f2e9' : '#ffffff')}
					>
						Date ↑
					</button>
					<button
						style={{
							...buttonStyle,
							backgroundColor: sortConfig.key === 'import_date' && sortConfig.direction === 'desc' ? '#e0f2e9' : '#ffffff',
							marginLeft: '10px',
						}}
						onClick={() => sortData('import_date', 'desc')}
						onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0f2e9')}
						onMouseLeave={(e) => (e.target.style.backgroundColor = sortConfig.key === 'import_date' && sortConfig.direction === 'desc' ? '#e0f2e9' : '#ffffff')}
					>
						Date ↓
					</button>
				</div>
				<div>
					<input
						type="date"
						style={datePickerStyle}
						value={selectedDate}
						onChange={handleDateChange}
					/>
				</div>
			</div>
			{filteredData.map((order, index) => renderOrderBox(order, index))}
		</div>
	);
};

export default OrderHistory;