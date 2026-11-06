import type { User } from "../features/users/userTypes";
import UserCard from "./userCard";

type UsersGridProps = {
  users: User[];
};

function UsersGrid({ users }: UsersGridProps) {
  return (
    <div className="grid-container">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UsersGrid;
