'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUsers } from '@/contexts/UserContext';
import Link from 'next/link';

export default function UserProfile() {
  const params = useParams();
  const router = useRouter();
  const { getUser } = useUsers();
  const userId = params.id as string;
  const user = getUser(userId);

  if (!user) {
    return (
      <main className="page center">
        <div className="text-center">
          <h1 className="heading-lg">User Not Found</h1>
          <p className="text-muted mb-6">The user you're looking for doesn't exist.</p>
          <Link href="/" className="btn-blue">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex-center-gap btn-link"
        >
          <span>←</span> Back to Users
        </button>

        {/* Profile Card */}
        <div className="card-fancy">
          {/* Header Section */}
          <div className="hero-gradient">
            <div className="flex items-center gap-lg">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="avatar-lg"
              />
              <div>
                <h1 className="heading-lg mb-2">{user.fullName}</h1>
                <p className="text-blue-100 text-lg">{user.jobTitle}</p>
                <p className="text-blue-200 mt-1">{user.company}</p>
              </div>
            </div>
          </div>

          {/* Body Section */}
          <div className="p-8">
            {/* Bio */}
            <section className="section">
              <h2 className="heading">About</h2>
              <p className="text-muted leading-relaxed">{user.bio}</p>
            </section>

            {/* Contact Information */}
            <section className="section">
              <h2 className="heading">Contact Information</h2>
              <div className="grid-2col info-labels">
                <div className="flex-start gap-3">
                  <span className="text-icon icon-lg">📧</span>
                  <div className="contact-group">
                    <p>Email</p>
                    <a href={`mailto:${user.email}`} className="text-link">
                      {user.email}
                    </a>
                  </div>
                </div>
                <div className="flex-start gap-3">
                  <span className="text-icon icon-lg">📱</span>
                  <div className="contact-group">
                    <p>Phone</p>
                    <a href={`tel:${user.phone}`}>
                      {user.phone}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Location Information */}
            <section className="section">
              <h2 className="heading">Location</h2>
              <div className="space-y info-labels">
                <div className="flex-start gap-3">
                  <span className="text-icon icon-lg">📍</span>
                  <div className="text-content">
                    <p>Address</p>
                    <p>{user.address}</p>
                    <p>
                      {user.city}, {user.state} {user.zipCode}
                    </p>
                    <p>{user.country}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Details */}
            <section>
              <h2 className="heading">Additional Details</h2>
              <div className="info-grid data-display">
                <div className="flex-between">
                  <span className="text-muted text-emphasis">User ID:</span>
                  <span className="font-mono text-sm">{user.id}</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted text-emphasis">Full Location:</span>
                  <span>{user.location}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
