import ProfileUpdateModal from '../../../components/dashboard/ProfileUpdateModal';
import useUserData from '../../../hooks/useUserData';
import { LiaEdit } from 'react-icons/lia';
import { useState } from 'react';
import useMyOrder from '../../../hooks/useMyOrder';

const Profile = () => {
  const [userData] = useUserData();
  const [myOrder] = useMyOrder();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={userData?.photoURL || "/profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-md"
              />
              <LiaEdit onClick={() => setIsOpen(true)} size={24} className='absolute right-0 bottom-0 text-gray-500 hover:text-gray-700 transition duration-200 cursor-pointer' />
            </div>
            <h2 className="text-xl font-medium text-gray-900">{userData?.name || "Name"}</h2>
            <p className="text-gray-600">{userData?.email || "Email not provided"}</p>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <p className="text-2xl font-bold text-gray-800">Total Orders</p>
            <p className="text-4xl font-semibold text-gray-600 mt-2">{myOrder?.length || 0}</p>
            <p className="text-sm text-gray-500 mt-2">You have placed {myOrder?.length || 0} orders</p>
          </div>
        </div>

        {/* Modal for Profile Update */}
        {isOpen && (
          <ProfileUpdateModal onClose={() => setIsOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default Profile;
