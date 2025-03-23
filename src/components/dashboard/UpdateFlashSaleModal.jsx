/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

const UpdateFlashSaleModal = ({ onClose, register2, errors2, handleSubmit2, handleUpdateFlashSale }) => {
    const modalRef = useRef(null);

    useEffect(() => {
      if (modalRef.current) {
        modalRef.current.showModal(); // This opens the modal
      }
    }, []);
  return (
    <dialog ref={modalRef} className="modal">
    <div className="modal-box">
    <h2 className="text-xl text-gray-800 font-bold">Update Flash Sale</h2>
      <form onSubmit={handleSubmit2(handleUpdateFlashSale)} className="mt-8 grid grid-cols-1 gap-6" method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button  onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <div>
              <label className="text-gray-800 text-sm block mb-2">Discount</label>
              <input
                type='text'
                placeholder='50'
                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                {...register2("discount", { required: "Discount is required !" })}
              />
              {errors2.discount && <span className='text-red-500 text-xs'>{errors2.discount.message}</span>}
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Start Time</label>
              <input
                type='datetime-local'
                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                {...register2("startTime", { required: "Time is required !" })}
              />
              {errors2.startTime && <span className='text-red-500 text-xs'>{errors2.startTime.message}</span>}
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">End Time</label>
              <input
                type='datetime-local'
                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                {...register2("endTime", { required: "Time is required !" })}
              />
              {errors2.endTime && <span className='text-red-500 text-xs'>{errors2.endTime.message}</span>}
            </div>
            <button
              type="submit"
              className={`text-white w-max bg-blue-400 hover:bg-blue-500 tracking-wide text-sm px-4 py-2.5 flex items-center justify-center`}
            >

                  Update...
            </button>
      </form>
    </div>
  </dialog>
  )
}

export default UpdateFlashSaleModal;