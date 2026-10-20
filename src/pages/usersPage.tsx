import { useOutletContext } from "react-router-dom";
import type { ChangeEvent } from "react";
import type { User } from "../features/users/userTypes";
import UsersList from "../components/usersList";
import Controls from "../components/userControls";

type UserPageContext = {
  setSortOrder: (value: "asc" | "desc") => void;
  setFilter: (value: "all" | "first5") => void;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  visibleUsers: User[];
  search: string;
};

function UsersPage() {
  const {
    status,
    error,
    visibleUsers,
    search,
    handleSearchChange,
    setFilter,
    setSortOrder,
  } = useOutletContext<UserPageContext>();

  if (status === "idle" || status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Controls
        search={search}
        handleSearchChange={handleSearchChange}
        setFilter={setFilter}
        setSortOrder={setSortOrder}
      />
      <UsersList users={visibleUsers} />
    </div>
  );
}

export default UsersPage;
