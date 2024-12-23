/* eslint-disable react/no-unknown-property */
import useAuth from "../../hooks/useAuth"

const Overview = () => {
  const {user} = useAuth();

  return (
    <div className="flex flex-wrap items-center cursor-pointer pb-5">
      <div className="relative">
        <img src={user?.photoURL} className="w-12 h-12 rounded-full border-white" />
        <span className="h-3 w-3 rounded-full bg-green-600 border-2 border-white block absolute bottom-0 right-0"></span>
      </div>

      <div className="ml-4">
        <p className="text-sm text-gray-300">{user?.displayName}</p>
      </div>
    </div>
  )
}

export default Overview