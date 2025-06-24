'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  CubeIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

const adminNavigation = [
  { name: 'Sites', href: '/sites', icon: HomeIcon },
  { name: 'Clients', href: '/clients', icon: UsersIcon },
  { name: 'Blocks', href: '/blocks', icon: CubeIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const clientNavigation = [
  { name: 'My Site', href: '/sites', icon: HomeIcon },
  { name: 'Blocks', href: '/blocks', icon: CubeIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();

  const navigation = profile?.role === 'admin' ? adminNavigation : clientNavigation;

  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          {profile && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {profile.role}
            </span>
          )}
        </div>
        
        {profile?.role === 'client' && profile.assigned_site_id && (
          <div className="px-4 mt-2">
            <p className="text-xs text-gray-400">
              Assigned to Site: {profile.assigned_site_id}
            </p>
          </div>
        )}
        
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 