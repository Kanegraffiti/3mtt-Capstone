import React from 'react';

const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="flex shadow-md">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder="Search movies..."
          className="flex-grow p-3 rounded-l text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-brand-from to-brand-to text-white px-4 rounded-r"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
