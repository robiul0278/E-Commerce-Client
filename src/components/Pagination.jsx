/* eslint-disable react/prop-types */
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagination = ({handlePageChange, page,totalPage}) => {
  return (
    <ul className="flex space-x-5 justify-center items-center font-[sans-serif]">
<button
  onClick={() => handlePageChange(page - 1)}
  className={`flex items-center justify-center shrink-0 border ${
    page === 1 ? "cursor-not-allowed opacity-50" : "hover:border-[#49B2FF] hover:text-[#49B2FF] cursor-pointer"
  } w-9 h-9 rounded-md`}
  // disabled={page === 1}
>
<IoIosArrowBack />
</button>
<li>
 <h4 className="font-semibold">page</h4>
</li>

    <li
      className="flex items-center justify-center shrink-0 bg-[#49B2FF]  border hover:border-[#49B2FF] border-[#49B2FF] cursor-pointer text-base font-bold text-white px-[13px] h-9 rounded-md">
      {page}
    </li>
    <li>
 <h4 className="font-semibold">of ...{totalPage}</h4>
</li>
    <button
  onClick={() => handlePageChange(page + 1)}
  className={`flex items-center justify-center shrink-0 border ${
    page === totalPage ? "cursor-not-allowed opacity-50" : "hover:border-[#49B2FF] hover:text-[#49B2FF] cursor-pointer"
  } w-9 h-9 rounded-md`}
  // disabled={page === totalPage}
>
<IoIosArrowForward />
</button>

  </ul>
  )
}

export default Pagination