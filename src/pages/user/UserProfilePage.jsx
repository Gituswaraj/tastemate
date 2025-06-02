import React, { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useAuthStore();
  const [userData, setUserData] = useState({
    profilePhoto: 'https://via.placeholder.com/150',
    fullName: user?.name || 'John Doe',
    username: user?.username || 'johndoe',
    email: user?.email || 'john.doe@example.com',
    phoneNumber: user?.phoneNumber || '+1 (555) 123-4567',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    address: {
      street: user?.address?.street || '123 Main St',
      city: user?.address?.city || 'Anytown',
      state: user?.address?.state || 'CA',
      zip: user?.address?.zip || '90210',
      country: user?.address?.country || 'USA',
    },
  });

  useEffect(() => {
    setUserData({
      profilePhoto: 'https://via.placeholder.com/150',
      fullName: user?.name || 'John Doe',
      username: user?.username || 'johndoe',
      email: user?.email || 'john.doe@example.com',
      phoneNumber: user?.phoneNumber || '+1 (555) 123-4567',
      dateOfBirth: user?.dateOfBirth || '1990-01-01',
      address: {
        street: user?.address?.street || '123 Main St',
        city: user?.address?.city || 'Anytown',
        state: user?.address?.state || 'CA',
        zip: user?.address?.zip || '90210',
        country: user?.address?.country || 'USA',
      },
    });
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData({
        ...userData,
        [parent]: {
          ...userData[parent],
          [child]: value,
        },
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    // In a real application, you would send this data to a backend API
    // In a real application, you would send this data to a backend API
    console.log('Saving data:', userData);
    setUser({ ...user, name: userData.fullName, email: userData.email, username: userData.username, phoneNumber: userData.phoneNumber, dateOfBirth: userData.dateOfBirth, address: userData.address });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // In a real application, you might revert to original data
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>

        {/* User Information Section */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center mb-6">
            <img
              src={userData.profilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mr-6 border-4 border-blue-300"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">{userData.fullName}</h2>
              <p className="text-gray-500">@{userData.username}</p>
              <button
                onClick={() => alert('Upload/Change photo functionality coming soon!')}
                className="mt-2 text-blue-600 hover:underline text-sm"
              >
                Upload/Change Photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.username}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={userData.dateOfBirth}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.dateOfBirth}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address & Location Section */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Address & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Street:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.street"
                  value={userData.address.street}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.address.street}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.city"
                  value={userData.address.city}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.address.city}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">State:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.state"
                  value={userData.address.state}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.address.state}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.zip"
                  value={userData.address.zip}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.address.zip}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address.country"
                  value={userData.address.country}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              ) : (
                <p className="text-gray-800">{userData.address.country}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => alert('Map integration for location coming soon!')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Detect/Pin Current Location (Map Placeholder)
            </button>
            <div className="mt-4 h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
              Map Placeholder
            </div>
          </div>
        </div>

        {/* Order History Preview (Optional) */}
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {/* Mock Order 1 */}
            <div className="border border-gray-200 p-4 rounded-lg">
              <p className="font-semibold">Order #12345 - <span className="text-green-600">Delivered</span></p>
              <p className="text-sm text-gray-600">Date: 2023-10-26</p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                <li>Product A (x1)</li>
                <li>Product B (x2)</li>
              </ul>
            </div>
            {/* Mock Order 2 */}
            <div className="border border-gray-200 p-4 rounded-lg">
              <p className="font-semibold">Order #12346 - <span className="text-yellow-600">Processing</span></p>
              <p className="text-sm text-gray-600">Date: 2023-10-25</p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                <li>Product C (x3)</li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => alert('View all orders functionality coming soon!')}
            className="mt-4 text-blue-600 hover:underline"
          >
            View All Orders
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;