'use client';

import { useState, useMemo } from 'react';
import { useUsers } from '@/contexts/UserContext';
import UserCard from '@/components/UserCard';

export default function Home() {
  const { users, isUsingLocalData } = useUsers();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [showNotification, setShowNotification] = useState(true);

  // Get unique locations for filter dropdown
  const uniqueLocations = useMemo(() => {
    const locations = users.map(user => user.location);
    return Array.from(new Set(locations)).sort();
  }, [users]);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(user => user.location === locationFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });

    return sorted;
  }, [users, locationFilter, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <main className="page">
      <div className="container-wide">
        <header className="section">
          <h1 className="heading-xl">
            Fake User Profiles
          </h1>
          <p className="text-muted">
            Browse through 50 randomly generated user profiles powered by Faker.js
          </p>
        </header>

        {/* Local Data Notification */}
        {isUsingLocalData && showNotification && (
          <div className="notification section">
            <div className="flex-start">
              <div className="shrink-0">
                <svg className="icon-sm text-yellow-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-flex">
                <p className="text-sm text-yellow">
                  <span className="text-emphasis">Using Local Data:</span> Unable to fetch from fakerapi.it.
                  Displaying locally generated data using Faker.js library instead.
                </p>
              </div>
              <div className="ml-auto-pl">
                <button
                  onClick={() => setShowNotification(false)}
                  className="inline-flex text-yellow-icon hover-yellow focus-none"
                >
                  <svg className="icon-sm" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Sort Controls */}
        <div className="card section">
          <div className="flex-wrap-gap">
            <div className="flex-1 w-min">
              <label htmlFor="location-filter" className="label">
                Filter by Location
              </label>
              <select
                id="location-filter"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="input"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 w-min">
              <label className="label">
                Sort by Name
              </label>
              <button
                onClick={toggleSortOrder}
                className="w-full-btn btn-blue"
              >
                {sortOrder === 'asc' ? '↑ A-Z' : '↓ Z-A'}
              </button>
            </div>

            <div className="flex-1 w-min">
              <label className="label">
                Results
              </label>
              <div className="badge">
                {filteredAndSortedUsers.length} user{filteredAndSortedUsers.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* User Grid */}
        <div className="scroll-area">
          <div className="grid-cards">
            {filteredAndSortedUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
