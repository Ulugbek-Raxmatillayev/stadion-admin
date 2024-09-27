import { useEffect, useState } from "react";
import AdminScreen from "..";
import { useNavigate } from "react-router-dom";
import AdminConfirmedMTable from "@/components/custom/AdminConfirmedMTable";
import AdminNotConfirmedMTable from "@/components/custom/AdminNotConfirmedMTable";
import AdminRejectedMTable from "@/components/custom/AdminRejectedMTable";

function Master(): JSX.Element {
  const navigate = useNavigate();
  const [activeTable, setActiveTable] = useState<'confirmed' | 'notConfirmed' | 'rejected'>('confirmed');

  function checkLogin(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  const renderTable = () => {
    switch (activeTable) {
      case 'confirmed':
        return <AdminConfirmedMTable />;
      case 'notConfirmed':
        return <AdminNotConfirmedMTable />;
      case 'rejected':
        return <AdminRejectedMTable />;
      default:
        return null;
    }
  };

  return (
    <AdminScreen pageName="Master">
      <div className="mb-4">
        <button
          className={`${
            activeTable === 'confirmed' ? 'bg-gray-700 text-white' : 'bg-gray-400 text-black'
          } border hover:bg-gray-700 rounded-md font-semibold py-2 px-4`}
          onClick={() => setActiveTable('confirmed')}
        >
          Confirmed Masters
        </button>
        <button
          className={`${
            activeTable === 'notConfirmed' ? 'bg-gray-700 text-white' : 'bg-gray-400 text-black'
          } border hover:bg-gray-400 rounded-md font-semibold py-2 px-4 ml-2`}
          onClick={() => setActiveTable('notConfirmed')}
        >
          Not Confirmed Masters
        </button>
        <button
          className={`${
            activeTable === 'rejected' ? 'bg-gray-700 text-white' : 'bg-gray-400 text-black'
          } border hover:bg-gray-400 rounded-md font-semibold py-2 px-4 ml-2`}
          onClick={() => setActiveTable('rejected')}
        >
          Rejected Masters
        </button>
      </div>

      {renderTable()}
    </AdminScreen>
  );
}

export default Master;
