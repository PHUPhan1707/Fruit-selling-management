import { useState } from 'react';
import ReOrder from './ReOrder/ReOrder';
import OrderHistory from './OrderHistory/OrderHistory';
import StockAdjustment from './StockAdjustment/StockAdjustment';
import Inventory from './Inventory/Inventory';
import SearchBar from '../../../../components/SearchBar/SearchBar';

const Warehouse = () => {
  const [activeTab, setActiveTab] = useState('Inventory');

  const headerContainerStyle = {
    color: '#485935',
    fontSize: 26,
    fontFamily: 'Poppins',
    fontWeight: '800',
    wordWrap: 'break-word',
    margin: '63px 0 0 50px',
    width: '96%',
  };

  const infoBoxContainerStyle = {
    display: 'flex',
    width: '100%',
    margin: '60px 0 0 60px',
    gap: '30px',
  };

  const infoBoxStyle = (isActive) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: isActive ? '#485935' : '#7a8a67',
    fontSize: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    position: 'relative', // For positioning the underline
  });

  const underlineStyle = (isActive) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    backgroundColor: '#485935',
    width: isActive ? '100%' : '0%', // Animates from 0% to 100% width
    transition: 'width 0.3s ease', // Smooth left-to-right animation
  });

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '50px',
    overflowX: 'hidden',
    width: 'calc(100% - 50px)',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Inventory':
        return (
          <div style={contentStyle}>
            <Inventory />
          </div>
        );
      case 'Re-order':
        return (
          <div style={contentStyle}>
            <ReOrder />
          </div>
        );
      case 'Stock adjustment':
        return (
          <div style={contentStyle}>
            <StockAdjustment />
          </div>
        );
      case 'Order history':
        return (
          <div style={contentStyle}>
            <OrderHistory />
          </div>
        );
      default:
        return (
          <div style={contentStyle}>
            <Inventory />
          </div>
        );
    }
  };

  const tabs = [
    { label: 'Inventory', key: 'Inventory' },
    { label: 'Re-order', key: 'Re-order' },
    { label: 'Stock adjustment', key: 'Stock adjustment' },
    { label: 'Order history', key: 'Order history' },
  ];

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div style={headerContainerStyle}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '80%', fontSize: '36px' }}>
            <div>Warehouse Management</div>
          </div>
          <SearchBar />
        </div>
      </div>

      <div style={infoBoxContainerStyle}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            style={infoBoxStyle(activeTab === tab.key)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <div style={underlineStyle(activeTab === tab.key)} />
          </div>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default Warehouse;