// здесь просто отображение фильтрции и сортировки
import type { ChangeEvent } from "react";

type UserControlsProps = {
  search: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: "asc" | "desc";
};

function Controls({
  search,
  handleSearchChange,
  handleSelectChange,
  sortOrder,
}: UserControlsProps) {
  return (
    <div className="search-sort-container">
      <input
        type="search"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search users by name..."
      />
      <div className="select-container">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sortOrder} onChange={handleSelectChange}>
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
}

export default Controls;
