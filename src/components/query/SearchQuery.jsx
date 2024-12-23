/* eslint-disable react/prop-types */

const SearchQuery = ({handleSearch}) => {
  return (
    <form onSubmit={handleSearch} className="flex space-x-2">
    <div className="relative flex-grow">
      <input
        type="text"
        name="search"
        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search products..."
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 4a7 7 0 110 14 7 7 0 010-14zm0 0L21 21"
          />
        </svg>
      </div>
    </div>
    <button type="submit"  className="inline-flex items-center px-2 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      Search
    </button>
  </form>
  )
}

export default SearchQuery