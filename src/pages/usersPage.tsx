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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;
  const totalPages = Math.ceil(visibleUsers.length / pageSize);

  const pageUsers = visibleUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const startPageIndex = Math.min(
    Math.max(0, currentPage - 2),
    Math.max(0, totalPages - 3),
  );

  const visiblePageNumbers = pageNumbers.slice(
    startPageIndex,
    startPageIndex + 3,
  );

  function handlePaginatedSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPage(1);
    handleSearchChange(event);
  }

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
          handleSearchChange={handlePaginatedSearch}
          setSortOrder={setSortOrder}
        />

        <button onClick={() => setViewMode("grid")}>Grid</button>
        <button onClick={() => setViewMode("list")}>List</button>
      </div>
      <div className="users-container">
        {visibleUsers.length === 0 ? (
          <p className="no-users-text">No users found</p>
        ) : viewMode === "grid" ? (
          <UsersGrid users={pageUsers} />
        ) : (
          <UsersList users={pageUsers} />
        )}
      </div>

      {totalPages > 0 && (
        <div className="pagination-container">
          <button
            className="pagination-arrrows"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            &lt;
          </button>

          {visiblePageNumbers.length > 0 && visiblePageNumbers[0] > 1 && (
            <span>...</span>
          )}

          {visiblePageNumbers.map((page) => (
            <button
              className={
                page === currentPage ? "pagination-active" : "pagination-button"
              }
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          {visiblePageNumbers.length > 0 &&
            visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages && (
              <span>...</span>
            )}

          <button
            className="pagination-arrrows"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
