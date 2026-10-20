import "./css/App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  selectAllUsers,
  selectUsersError,
  selectUsersStatus,
  selectAddedUsers,
} from "./features/users/usersSelectors";
import { useState, useEffect, useMemo } from "react";
import { fetchUsers } from "./features/users/usersSlice";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebarMenu";

function App() {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectAllUsers);
  const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);
  const addedUsers = useAppSelector(selectAddedUsers);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [filter, setFilter] = useState<"all" | "first5">("all");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  useEffect(() => {
    try {
      localStorage.setItem("addedUsers", JSON.stringify(addedUsers));
    } catch (error) {
      console.error("Failed to save users:", error);
    }
  }, [addedUsers]);

  const visibleUsers = useMemo(() => {
    const searchedUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(search.trim().toLowerCase());
    });

    const sortedUsers = [...searchedUsers].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return filter === "first5" ? sortedUsers.slice(0, 5) : sortedUsers;
  }, [users, sortOrder, filter, search]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main>
        <Outlet
          context={{
            setSortOrder,
            setFilter,
            status,
            error,
            handleSearchChange,
            visibleUsers,
            search,
          }}
        />
      </main>
    </div>
  );
}

export default App;

// пусть тут на всякий будет
/*<div>
      /*<h1>User Management Dashboard</h1>

      <input type="search" value={search} onChange={handleSearchChange} />

      <button onClick={() => setFilter("all")}>All users</button>
      <button onClick={() => setFilter("first5")}>First 5 users</button>
      <br />
      <button onClick={() => setSortOrder("asc")}>A-Z</button>
      <button onClick={() => setSortOrder("desc")}>Z-A</button>

      <UserForm />
      {visibleUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <UsersList users={visibleUsers} />
      )}
    </div>*/
