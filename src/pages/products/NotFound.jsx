
const NotFound = () => {
  return (
    <div className="flex w-full items-center justify-center bg-gray-100">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">Product Not Found</h2>
      <p className="text-gray-500 mt-2">
        Sorry, the product you are looking for doesnt exist or has been removed.
      </p>
      <div className="mt-6">
        <a
          href="/"
          className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Back to Home
        </a>
      </div>

    </div>
  </div>
  )
}

export default NotFound;