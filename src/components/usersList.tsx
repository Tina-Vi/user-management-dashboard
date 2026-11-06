import type { User } from "../features/users/userTypes";
import UserCard from "./userCard";

type UsersListProps = {
  users: User[];
};

function UsersList({ users }: UsersListProps) {
  return (
    <div className="flex-container">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UsersList;
