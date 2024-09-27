import { useEffect, useState } from "react";
import AdminScreen from "..";
import { useNavigate } from "react-router-dom";
import AdminConfirmedMTable from "@/components/custom/AdminConfirmedMTable";
import AdminNotConfirmedMTable from "@/components/custom/AdminNotConfirmedMTable";

function Master(): JSX.Element {
  const navigate = useNavigate();
  const [showConfirmed, setShowConfirmed] = useState(true);

  function checkLogin(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AdminScreen pageName="Master">
      <div className="mb-4">
        <button
          className={`${
            showConfirmed ? 'bg-gray-700 text-white' : 'bg-gray-400 text-black'
          } border hover:bg-gray-700 rounded-md font-semibold py-2 px-4`}
          onClick={() => setShowConfirmed(true)}
        >
          Confirmed Masters
        </button>
        <button
          className={`${
            !showConfirmed ? 'bg-gray-700 text-white' : 'bg-gray-400 text-black'
          } border hover:bg-gray-400 rounded-md font-semibold py-2 px-4 ml-2`}
          onClick={() => setShowConfirmed(false)}
        >
          Not Confirmed Masters
        </button>
      </div>

      {showConfirmed ? <AdminConfirmedMTable /> : <AdminNotConfirmedMTable />}
    </AdminScreen>
  );
}

export default Master;
