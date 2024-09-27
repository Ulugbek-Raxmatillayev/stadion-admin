import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SideBar = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');

    function handleNavigation(tab:string, path:string) {
        if (activeTab !== tab) {
            setActiveTab(tab);
            navigate(path);
        }
    }

    return (
        <aside id="default-sidebar" className="fixed top-14 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li onClick={() => handleNavigation('dashboard', '/admin/dashboard')}>
                        <a className={`flex items-center p-4 text-gray-900 hover:text-white dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group ${activeTab === 'dashboard' ? 'bg-gray-400' : ''}`}>
                            <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg>
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                    <li onClick={() => handleNavigation('master', '/admin/masters')}>
                        <a className={`flex items-center p-4 px-3 text-gray-900 hover:text-white dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group ${activeTab === 'master' ? 'bg-gray-400' : ''}`}>
                            <svg className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Master</span>
                        </a>
                    </li>
                    <li onClick={() => handleNavigation('client', '/admin/client')}>
                        <a className={`flex items-center p-4 text-gray-900 hover:text-white dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group ${activeTab === 'client' ? 'bg-gray-400' : ''}`}>
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Client</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default SideBar;
