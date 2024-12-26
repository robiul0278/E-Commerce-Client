import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [latestData, setLatestData] = useState(true);
  // loading 
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access-token");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await axios.get(`https://gadget-shop-server-bay.vercel.app/user`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then((res) => {
        setUsers(res.data)
        setLoading(false);
      }).catch((error) => {
        console.error("Error fetching users:", error)
      })
    }
    // Fix the condition to check both userData and token
    if (token) {
      fetchUsers()
    }
  }, [token,latestData])

  const changeUserRole = (id,role) => {
    const userData = {role}
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`https://gadget-shop-server-bay.vercel.app/user/${id}`, userData, {
          headers: {
            authorization: `Bearer ${token}`,
          }
        })
          .then((res) => {
            if (res.data.matchedCount > 0) {
              Swal.fire({
                title: "Role Changed!",
                text: "Your role has been change",
                icon: "success"
              });
              setLatestData(!latestData);
            } else {
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "User not found!",
            });
            }
          })
      }
    });
  }

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://gadget-shop-server-bay.vercel.app/user/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted",
                icon: "success"
              });
              setLatestData(!latestData);
            } else {
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            }
          })
      }
    });
  }

  return (
    <div className="p-6">
      <div className="bg-gray-800 border py-10 px-6  shadow-lg text-white">
        <h1 className="text-3xl font-bold tracking-wider text-center">Manage Users</h1>
        <p className="mt-4 text-sm text-center justify-center mx-auto">
          Effortlessly view, edit, and manage user accounts in one centralized platform.
          Stay in control with streamlined tools to ensure a seamless user experience.
        </p>
      </div>

      <div className="overflow-x-auto font-[sans-serif]">
        <table className="min-w-full bg-white ">
          <thead className="bg-gray-700 whitespace-nowrap">
            <tr className="">
              <th className="p-4 text-left text-sm font-medium text-white">
                Name
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Email
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Role
              </th>
              {/* <th className="p-4 text-left text-sm font-medium text-white">
                Status
              </th> */}
              <th className="p-4 text-left text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>

          {
            loading ? (
              <></>

            ) : (
              users.map((user) => (
                <tbody key={user._id} className="whitespace-nowrap border">
                  <td className="p-4 text-sm">
                    {user?.name}
                  </td>
                  <td className="p-4 text-sm">
                    {user?.email}          </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                  <select
                    value={user?.role || "default"}
                    onChange={(e) => changeUserRole(user._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                  {/* <td className="p-4 text-sm">
                    {user?.status}
                  </td> */}
                  <td className="p-4">
                    <button onClick={() => handleDeleteUser(user?._id)} className="ml-3" title="Delete">
                      <RiDeleteBinLine className="w-5 fill-red-500 hover:fill-red-700 text-xl" />
                    </button>
                  </td>
                </tbody>
              ))
            )
          }
        </table>
      </div>
    </div>
  )
}

export default ManageUser;
