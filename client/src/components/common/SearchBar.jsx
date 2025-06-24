import React from 'react';

const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
      className="w-full sm:max-w-xl mx-auto"
    >
      <div className="flex shadow-md w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder="Search movies..."
          className="flex-grow w-full p-3 bg-white rounded-l-md text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-brand-from to-brand-to text-white px-4 rounded-r-md"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
