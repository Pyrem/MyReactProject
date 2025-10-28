import Link from 'next/link';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/users/${user.id}`}>
      <div className="card-hover">
        <div className="flex-col-center card-content">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="avatar-sm"
          />
          <h2 className="heading mb-1">
            {user.fullName}
          </h2>
          <p className="text-sm text-emphasis text-blue-600 mb-2">
            {user.jobTitle}
          </p>
          <p className="text-xs text-gray-600 mb-1">
            {user.company}
          </p>
          <p className="text-small flex-center-gap">
            <span className="text-icon">📍</span>
            {user.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
