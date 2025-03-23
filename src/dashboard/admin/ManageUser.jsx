import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Search } from "lucide-react";
import { useDeleteUserMutation, useGetAllUserQuery, useUpdateUserRoleMutation } from "../../redux/api/api";

const ManageUser = () => {
  const { data: allUser, isLoading } = useGetAllUserQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();


    const changeUserRole = async (id, role) => {
      const options = {id, role}
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then(async (result) => {  // Marked as async
            if (result.isConfirmed) {
                try {
                    const response = await updateUserRole(options).unwrap();
                    if (response.success) {
                        Swal.fire({
                            title: "Updated!",
                            text: "Your role has been changed!.",
                            icon: "success",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: `Failed to delete the product.${error}}`,
                        icon: "error",
                    });
                }
            }
        });
    };

    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {  // Marked as async
            if (result.isConfirmed) {
                try {
                    const response = await deleteUser(id).unwrap();
                    if (response.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your user has been deleted!.",
                            icon: "success",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: `Failed to delete the product.${error}}`,
                        icon: "error",
                    });
                }
            }
        });
    };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl font-semibold text-gray-900">Manage User</h1>
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
                    type="text"
                    placeholder="Search orders..."
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
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="flex item-center  px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!isLoading ? <>
                    {allUser?.data?.map((user) => {
                      return (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 whitespace-nowrap text-sm font-medium text-blue-600">
                            <img src={user?.photoURL} alt="profile" className="h-14 w-14 rounded-full object-cover bg-gray-300" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <select
                              value={user?.role || "default"}
                              onChange={(e) => changeUserRole(user._id, e.target.value)}
                              className="border rounded p-1"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td className="flex item-center px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleDeleteUser(user?._id)} className="ml-3" title="Delete">
                              <RiDeleteBinLine className="w-5 fill-red-500 hover:fill-red-700 text-xl" />
                            </button>
                          </td>
                        </tr>
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
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">5</span> of{' '}
                    <span className="font-medium">1,234</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ManageUser;
