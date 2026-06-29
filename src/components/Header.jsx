// Header component — top-bar with app branding and "Add User" CTA
// TODO: implement full UI

const Header = ({ onAddUser }) => {
  return (
    <header>
      <h1>User Management Dashboard</h1>
      <button onClick={onAddUser}>+ Add User</button>
    </header>
  );
};

export default Header;
