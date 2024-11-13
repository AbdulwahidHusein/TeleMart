import WebApp from '@twa-dev/sdk'


export default function Profile() {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mt-4 transition-colors duration-200">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-3xl font-bold">
              JD
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">John Doe</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">john.doe@example.com</p>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Order History</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't placed any orders yet.</p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Settings</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-blue-500 dark:text-blue-400 hover:underline">Edit Profile</button>
              </li>
              <li>
                <button className="text-blue-500 dark:text-blue-400 hover:underline">Change Password</button>
              </li>
              <li>
                <button className="text-blue-500 dark:text-blue-400 hover:underline">Notification Preferences</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }