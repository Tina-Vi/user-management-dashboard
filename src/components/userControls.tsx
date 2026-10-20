// здесь просто отображение фильтрции и сортировки
import type { ChangeEvent } from "react";

type UserControlsProps = {
  search: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setFilter: (value: "all" | "first5") => void;
  setSortOrder: (value: "asc" | "desc") => void;
};

function Controls({
  search,
  handleSearchChange,
  setFilter,
  setSortOrder,
}: UserControlsProps) {
  return (
    <div>
      <input type="search" value={search} onChange={handleSearchChange} />

      <button onClick={() => setFilter("all")}>All users</button>
      <button onClick={() => setFilter("first5")}>First 5 users</button>
      <br />
      <button onClick={() => setSortOrder("asc")}>A-Z</button>
      <button onClick={() => setSortOrder("desc")}>Z-A</button>
    </div>
  );
}

export default Controls;
