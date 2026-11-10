import { useOutletContext } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import type { User } from "../features/users/userTypes";
import UsersList from "../components/usersList";
import UsersGrid from "../components/usersGrid";
import Controls from "../components/userControls";

type UserPageContext = {
  sortOrder: "asc" | "desc";
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
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
    handleSelectChange,
    sortOrder,
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

  function getGreetings() {
    const time = Number(new Date().getHours());

    if (time >= 6 && time < 12) {
      return "Good morning,";
    } else if (time >= 12 && time < 17) {
      return "Good afternoon,";
    } else if (time >= 17 && time < 23) {
      return "Good evening,";
    } else if (time >= 23 || time < 5) {
      return "Good night,";
    } else {
      return "Good day,";
    }
  }

  return (
    <div className="users-page">
      <div className="users-header-container">
        <p className="users-greeting">{getGreetings()}</p>
        <h2 className="users-head">Users List</h2>
        <p className="users-description">
          Search, sort and manage all users in one place
        </p>
      </div>

      <div className="controls-container">
        <Controls
          search={search}
          handleSearchChange={handlePaginatedSearch}
          handleSelectChange={handleSelectChange}
          sortOrder={sortOrder}
        />

        <div className="view-container">
          <button
            className={viewMode === "grid" ? "view-active" : "view-button"}
            onClick={() => setViewMode("grid")}
            aria-label="Grid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          </button>
          <button
            className={viewMode === "list" ? "view-active" : "view-button"}
            onClick={() => setViewMode("list")}
            aria-label="List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 5h.01" />
              <path d="M3 12h.01" />
              <path d="M3 19h.01" />
              <path d="M8 5h13" />
              <path d="M8 12h13" />
              <path d="M8 19h13" />
            </svg>
          </button>
        </div>
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
