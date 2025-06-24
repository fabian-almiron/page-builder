'use client';

import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex h-16 flex-shrink-0 items-center justify-between bg-white px-4 shadow">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome to Dashboard
          {profile && (
            <span className="ml-2 text-sm font-normal text-gray-600">
              ({profile.role} view)
            </span>
          )}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        {profile && (
          <>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{profile.full_name}</div>
                <div className="text-gray-500">{profile.email}</div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
} 