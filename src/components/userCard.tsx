import type { User } from "../features/users/userTypes";

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  return (
    <article className="user-card">
      <div className="user-block">
        <div className="user-icon"></div>
        <div className="user-text-container">
          <div className="user-username-container">
            <h2>{user.name}</h2>
            <p>{user.username}</p>
          </div>
          <p className="user-email">{user.email}</p>
        </div>
      </div>
    </article>
  );
}

export default UserCard;
