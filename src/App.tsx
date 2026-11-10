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

    return sortedUsers;
  }, [users, sortOrder, search]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    if (value === "asc" || value === "desc") {
      setSortOrder(value);
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main>
        <Outlet
          context={{
            sortOrder,
            status,
            error,
            handleSearchChange,
            handleSelectChange,
            visibleUsers,
            search,
          }}
        />
      </main>
    </div>
  );
}

export default App;
