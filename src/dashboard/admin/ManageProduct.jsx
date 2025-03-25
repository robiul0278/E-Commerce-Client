import {
  Search,
} from 'lucide-react';
import ManageProductTable from '../../components/dashboard/ManageProductTable';
import { useGetProductsQuery } from '../../redux/api/api';
import { useState } from 'react';
import Pagination from '../../components/pagination';

const ManageProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const {data: allProducts, isLoading} = useGetProductsQuery({searchTerm,limit,page});

  const totalPage = [...Array(allProducts?.data?.meta?.totalPage).keys()].map(i => i + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Manage Products</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search by name..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-4 top-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                    Flash Sale
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!isLoading ? <>
                  {allProducts?.data?.result.map((product) => {
                    return (
                     <ManageProductTable key={product.id} product={product} />
                    );
                  })}
                </> : <>
                    <tr className="animate-pulse">
                      <td className="flex item-center justify-center">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                      </td>
                      <td >
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="flex item-center justify-center">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                      </td>
                      <td >
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                    </tr>
                    <tr className="animate-pulse">
                      <td className="flex item-center justify-center">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                      </td>
                      <td >
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                      <td>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </td>
                    </tr>
                </>}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{allProducts?.data?.result?.length}</span> of{' '}
                  <span className="font-medium">{allProducts?.data?.meta?.total}</span> results
                </p>
              </div>
              <div>
                <Pagination setLimit={setLimit} setPage={setPage} page={page} totalPage={totalPage} limit={limit} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ManageProducts