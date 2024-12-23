/* eslint-disable react/prop-types */

const Pagination = ({handlePageChange, page,totalPage}) => {
  return (
    <ul className="flex space-x-5 justify-center items-center font-[sans-serif]">
<button
  onClick={() => handlePageChange(page - 1)}
  className={`flex items-center justify-center shrink-0 border ${
    page === 1 ? "cursor-not-allowed opacity-50" : "hover:border-blue-500 cursor-pointer"
  } w-9 h-9 rounded-md`}
  // disabled={page === 1}
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-400" viewBox="0 0 55.753 55.753">
    <path
      d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
      data-original="#000000"
    />
  </svg>
</button>
<li>
 <h4 className="font-semibold">page</h4>
</li>

    <li
      className="flex items-center justify-center shrink-0 bg-blue-500  border hover:border-blue-500 border-blue-500 cursor-pointer text-base font-bold text-white px-[13px] h-9 rounded-md">
      {page}
    </li>
    <li>
 <h4 className="font-semibold">of ...{totalPage}</h4>
</li>
    <button
  onClick={() => handlePageChange(page + 1)}
  className={`flex items-center justify-center shrink-0 border ${
    page === totalPage ? "cursor-not-allowed opacity-50" : "hover:border-blue-500 cursor-pointer"
  } w-9 h-9 rounded-md`}
  // disabled={page === totalPage}
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-400 rotate-180" viewBox="0 0 55.753 55.753">
    <path
      d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
      data-original="#000000"
    />
  </svg>
</button>

  </ul>
  )
}

export default Pagination