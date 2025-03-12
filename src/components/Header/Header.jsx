import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { NavItemCustomer, NavItemAdminn } from '../../components/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAction } from '../../redux/userReducer/userReducer';
import { getInfor } from '../../redux/userReducer/userThunk';

const Header = ({ roleName }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const { inforUser, userId } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (userId) {
            dispatch(getInfor(userId));
        }
    }, [userId, dispatch]);

    const menu = roleName === 'admin' ? NavItemAdminn : NavItemCustomer;

    // Function to build breadcrumb
    const getBreadcrumb = () => {
        const path = location.pathname;
        let breadcrumbParts = [roleName || 'Welcome'];

        const mainItem = menu.find(item => path.startsWith(item.link));
        if (mainItem) {
            breadcrumbParts.push(mainItem.name);

            if (mainItem.subItems) {
                const subItem = mainItem.subItems.find(sub => sub.link && path === sub.link);
                if (subItem) {
                    breadcrumbParts.push(subItem.name);
                }
            }
        } else if (!path.includes('home')) {
            breadcrumbParts.push('Home');
        }

        return breadcrumbParts.join(' > ');
    };

    // Flatten menu items including sub-items for search
    const flattenedMenu = menu
        .filter(item => item.name !== 'Logout')
        .flatMap(item => [
            { name: item.name, link: item.link },
            ...(item.subItems || []).map(sub => ({
                name: sub.link ? sub.name : `${item.name} - ${sub.name}`,
                link: sub.link || item.link, // Use sub.link if available, else parent link
            })),
        ]);

    const filteredMenu = flattenedMenu.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchSelect = (link) => {
        setSearchQuery('');
        navigate(link);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
        setIsNotificationOpen(false);
    };

    const toggleNotifications = () => {
        setIsNotificationOpen(prev => !prev);
        setIsDropdownOpen(false);
    };

    const handleLogoutClick = () => {
        dispatch(logOutAction());
        setIsDropdownOpen(false);
        navigate('/auth/welcome');
    };

    const notifications = [
        { id: 1, message: 'Product added to store', time: '2 mins ago' },
        { id: 2, message: 'Account updated', time: '10 mins ago' },
        { id: 3, message: 'New order placed', time: '1 hour ago' },
    ];

    const settingsLink = menu.find(item => item.name === 'Setting')?.link || '#';

    return (
        <div className="fixed top-0 w-[85%] bg-green_dark1 text-white shadow-lg z-50 mx-2">
            <header>
                <nav className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-offwhite">
                            {getBreadcrumb()}
                        </div>

                        <div className='w-[80%] flex items-center justify-between'>
                            <div className="relative flex items-center w-[70%]">
                                <svg
                                    className="w-5 h-5 absolute left-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search features, services, settings and more"
                                    className="bg-offwhite text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
                                />
                                {searchQuery && (
                                    <div className="absolute top-full left-0 mt-1 w-full bg-offwhite rounded-lg shadow-lg z-10">
                                        {filteredMenu.length > 0 ? (
                                            filteredMenu.map((item) => (
                                                <div
                                                    key={item.link || item.name} // Use link if available, else name
                                                    onClick={() => handleSearchSelect(item.link)}
                                                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
                                                >
                                                    {item.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-gray-400">No results found</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className='w-[20%] flex items-center justify-end gap-[30px]'>
                                {/* Notification Bell */}
                                <div className="relative">
                                    <button onClick={toggleNotifications} className="focus:outline-none">
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            style={{ color: 'white' }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.052-.595 1.436L2 17h5m8 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                        <span className="absolute top-0 right-0 text-xs rounded-full h-3 w-3 flex items-center justify-center text-offwhite text-sm bg-[#F44336]">
                                            {notifications.length}
                                        </span>
                                    </button>
                                    {isNotificationOpen && (
                                        <div className="absolute right-0 mt-2 w-64 bg-offwhite rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className="px-4 py-2 border-b border-gray-600 last:border-b-0 text-white hover:bg-gray-600"
                                                    >
                                                        <p className="text-sm">{notification.message}</p>
                                                        <p className="text-xs text-gray-400">{notification.time}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-gray-400">No notifications</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* User Avatar with Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={toggleDropdown}
                                        className="focus:outline-none"
                                        aria-expanded={isDropdownOpen}
                                        aria-controls="user-dropdown"
                                    >
                                        <img
                                            src="/src/assets/userAvtG.jpg"
                                            alt="User Avatar"
                                            className="h-10 w-10 rounded-full"
                                        />
                                    </button>
                                    {isDropdownOpen && (
                                        <div
                                            id="user-dropdown"
                                            className="absolute right-0 mt-2 w-48 bg-offwhite rounded-lg shadow-lg z-10"
                                        >
                                            {inforUser && (
                                                <div className="px-4 py-2 border-b border-gray-600">
                                                    <p className="text-white text-sm font-medium">
                                                        {inforUser.full_name || 'User'}
                                                    </p>
                                                    <p className="text-gray-400 text-xs capitalize">
                                                        {roleName || 'Role'}
                                                    </p>
                                                </div>
                                            )}

                                            <Link
                                                to={settingsLink}
                                                className="block px-4 py-2 text-white 
                                                bg-transparent
                                                hover:bg-gray-600 hover:text-green-100 
                                                active:bg-gray-800 active:text-green-200 
                                                transition-colors duration-200 ease-in-out"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                Settings
                                            </Link>

                                            <button
                                                onClick={handleLogoutClick}
                                                className="block w-full text-left px-4 py-2 text-white 
                                                bg-transparent
                                                hover:bg-gray-600 hover:text-green-100 
                                                active:bg-gray-800 active:text-green-200 
                                                transition-colors duration-200 ease-in-out"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;