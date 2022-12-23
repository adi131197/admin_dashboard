import React from "react";
import "./Search.css";

const Search = ({ handleSearch }) => {
  return (
    <input
      className="searchbar"
      type="search"
      placeholder="Search by name, email or role.."
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default Search;
