import { useEffect, useState } from "react";
import Filtering from "../../components/query/Filtering";
import SearchQuery from "../../components/query/SearchQuery";
import Sorting from "../../components/query/Sorting";
import axios from "axios";
import Loading from "../Loading";
import NotFound from "./NotFound";
import ProductsCard from "./ProductsCard";
import Pagination from "../../components/pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  // loading 
  const [loading, setLoading] = useState(false);
  // query 
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  // filtering 
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  // set update Query 
  const [filterBrand, setFilterBrand] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  // pagination 
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      axios.get(`https://gadget-shop-server-bay.vercel.app/all-product?title=${search}&page=${page}&limit=${10}&sort=${sort}&brand=${brand}&category=${category}`)
        .then((res) => {
          // console.log(res.data);
          setProducts(res.data.products);
          setFilterBrand(res.data.brands);
          setFilterCategory(res.data.categories);
          setTotalPage(Math.ceil(res.data.totalProducts / 9));
          setLoading(false);
        })
    }
    fetch();
  }, [search, brand, sort, category, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };

  const handleReset = () => {
    setSearch("");
    setBrand("");
    setCategory("");
    setSort("");
    window.location.reload();
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPage) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  return (
    <div className="bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 shadow-sm rounded-md">
      {/* Page Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
          Product Inventory
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Explore all products available in our store.
        </p>
      </div>

      {/* Search, Sorting, and Main Layout */}
      <div className="space-y-6 px-6">
        {/* Search and Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Bar */}
          <SearchQuery handleSearch={handleSearch} />
          {/* Sorting Dropdown */}
          <Sorting setSort={setSort} />
        </div>

        {/* Main Layout: Filters on the Left, Products on the Right */}
        <div className="grid grid-cols-12 gap-6">
          {/* Filters Section */}
          <div className="col-span-2 ">
            <Filtering
              setBrand={setBrand}
              setCategory={setCategory}
              handleReset={handleReset}
              filterBrand={filterBrand}
              filterCategory={filterCategory}
            />
          </div>
          {/* Products Section */}
          <div className="col-span-10">
            {loading ? (
              <Loading />
            ) : (
              <>
                {products.length === 0 ? (
                  <NotFound />
                ) : (
                  <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 py-6 px-16 gap-6">
                    {products.map((product) => (
                      <ProductsCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* pagination  */}
      <div>
        <Pagination handlePageChange={handlePageChange} page={page} totalPage={totalPage} />
      </div>
    </div>
  )
}

export default Products;