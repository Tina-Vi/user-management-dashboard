import { useOutletContext } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import type { User } from "../features/users/userTypes";
import UsersList from "../components/usersList";
import UsersGrid from "../components/usersGrid";
import Controls from "../components/userControls";

type UserPageContext = {
  setSortOrder: (value: "asc" | "desc") => void;
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
    setSortOrder,
  } = useOutletContext<UserPageContext>();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (status === "idle" || status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="users-page">
      <div className="controls-container">
        <Controls
          search={search}
          handleSearchChange={handleSearchChange}
          setSortOrder={setSortOrder}
        />

        <button onClick={() => setViewMode("grid")}>Grid</button>
        <button onClick={() => setViewMode("list")}>List</button>
      </div>
      <div className="users-container">
        {viewMode === "grid" ? (
          <UsersGrid users={visibleUsers} />
        ) : (
          <UsersList users={visibleUsers} />
        )}
      </div>
    </div>
  );
}

export default UsersPage;
