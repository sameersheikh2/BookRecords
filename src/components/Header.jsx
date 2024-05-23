const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button className="bg-red-500 text-white py-2 px-4 rounded">
        Logout
      </button>
    </header>
  );
};

export default Header;
