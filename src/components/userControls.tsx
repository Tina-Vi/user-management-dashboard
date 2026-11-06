// здесь просто отображение фильтрции и сортировки
import type { ChangeEvent } from "react";

type UserControlsProps = {
  search: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setSortOrder: (value: "asc" | "desc") => void;
};

function Controls({
  search,
  handleSearchChange,
  setSortOrder,
}: UserControlsProps) {
  return (
    <div>
      <input type="search" value={search} onChange={handleSearchChange} />
      <button onClick={() => setSortOrder("asc")}>A-Z</button>
      <button onClick={() => setSortOrder("desc")}>Z-A</button>
    </div>
  );
}

export default Controls;
