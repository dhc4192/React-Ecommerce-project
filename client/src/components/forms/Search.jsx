import React from "react";

export default function Search({ searchName, setSearchName }) {
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchName(e.target.value.toLowerCase());
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        value={searchName}
        onChange={handleSearch}
      />
    </div>
  );
}
