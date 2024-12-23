/* eslint-disable react/prop-types */

const Filtering = ({ setCategory, setBrand, handleReset, filterBrand, filterCategory }) => {
  return (
    <div className="space-y-6">
      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
        <select
          onChange={(e) => setBrand(e.target?.value)}
          className="block pl-3 pr-10 py-2 border border-gray-300 bg-white w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">All Brands</option>
          {filterBrand.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          onChange={(e) => setCategory(e.target?.value)}
          className="block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">All Categories</option>
          {filterCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <div>
        <button
          type="submit"
          onClick={handleReset}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export default Filtering;
