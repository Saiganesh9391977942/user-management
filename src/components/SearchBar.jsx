// SearchBar component — real-time multi-field search input
// TODO: implement full UI

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
