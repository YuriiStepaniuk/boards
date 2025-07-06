interface SearchBoardsProps {
  onCreateClick: () => void;
}

const SearchBoards: React.FC<SearchBoardsProps> = ({ onCreateClick }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mb-6 max-w-md mx-auto">
      <div className="flex flex-col flex-grow">
        <label
          htmlFor="search"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Search Boards
        </label>
        <input
          id="search"
          type="text"
          placeholder="Enter board name..."
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="button"
        className="px-5 py-2 mt-6 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
      >
        Load
      </button>
      <button
        type="button"
        onClick={onCreateClick}
        className="px-5 py-2 mt-6 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition"
      >
        Create
      </button>
    </div>
  );
};

export default SearchBoards;
