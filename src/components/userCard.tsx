import type { User } from "../features/users/userTypes";

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </article>
  );
}

export default UserCard;
