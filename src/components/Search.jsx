const Search = ({ onChange, value }) => {
  return (
    <div className="my-4 flex justify-center">
      <input
        type="text"
        placeholder="Search by author"
        className="m-auto w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
