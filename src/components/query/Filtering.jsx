/* eslint-disable react/prop-types */

const Filtering = ({ product, setSort,setBrand }) => {

  return (
    <div className="space-y-3 p-5">
      <div className="">
        <h1 className="font-bold text-2xl">Filter Your Gadgets</h1>
      </div>
      {/* Filtering Price  */}
      <div className="relative sm:flex-row-reverse">
        <label className="block text-sm text-gray-700 mb-1 font-semibold">Sort By Price</label>
        <select
          onChange={(e) => setSort(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 border border-gray-700 bg-white sm:text-sm"
        >
          <option value="">Default Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Filter By Brand
        </label>
        <select
          onChange={(e) => setBrand(e.target?.value)}
          className="block w-full pl-3 pr-10 py-2 border border-gray-700 bg-white sm:text-sm"
        >
          <option value="">All Brands</option>
          {[...new Set(product?.data?.result.map((item) => item.brand))].map(
            (brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            )
          )}
        </select>
      </div>


      {/* Category Filter */}
      {/* <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Filter By Category</label>
        <select
          onChange={(e) => setSubCategory(e.target?.value)}
          className="block w-full pl-3 pr-10 py-2 border border-gray-700 bg-white sm:text-sm"
        >
          <option value="">All Categories</option>
              {[...new Set(product?.data?.result.map((item) => item.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div> */}
      {/* Category Filter */}
      {/* <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Filter By Category</label>
        <select
          onChange={(e) => setSubCategory(e.target?.value)}
          className="block w-full pl-3 pr-10 py-2 border border-gray-700 bg-white sm:text-sm"
        >
          <option value="">All Categories</option>
              {[...new Set(product?.data?.result.map((item) => item.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div> */}

      {/* Reset Button */}
      {/* <div>
        <button
          type="submit"
          onClick={handleReset}
          className="block w-full pl-3 pr-10 py-2 border bg-gray-100 border-gray-100 sm:text-sm"
        >
          Reset All
        </button>
      </div> */}
    </div>
  );
};

export default Filtering;
