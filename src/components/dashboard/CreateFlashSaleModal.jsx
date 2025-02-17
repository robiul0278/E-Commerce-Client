/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

const CreateFlashSaleModal = ({ onClose, register, errors, handleSubmit, handleCreateFlashSale, loading }) => {
    const modalRef = useRef(null);

    useEffect(() => {
      if (modalRef.current) {
        modalRef.current.showModal(); // This opens the modal
      }
    }, []);
  return (
    <dialog ref={modalRef} className="modal">
    <div className="modal-box">
    <h2 className="text-xl text-gray-800 font-bold">Create Flash Sale</h2>
        
      <form onSubmit={handleSubmit(handleCreateFlashSale)} className="mt-8 grid grid-cols-1 gap-6" method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button  onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <div>
              <label className="text-gray-800 text-sm block mb-2">Discount</label>
              <input
                type='text'
                placeholder='50'
                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                {...register("discount", { required: "Discount is required !" })}
              />
              {errors.discount && <span className='text-red-500 text-xs'>{errors.discount.message}</span>}
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Start Time</label>
              <input
                type='datetime-local'
                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                {...register("startTime", { required: "Time is required !" })}
              />
              {errors.startTime && <span className='text-red-500 text-xs'>{errors.startTime.message}</span>}
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">End Time</label>
              <input
                type='datetime-local'
                className="w-full rounded py-2.5 px-4 border border-gray-300 text-sm"
                {...register("endTime", { required: "Time is required !" })}
              />
              {errors.endTime && <span className='text-red-500 text-xs'>{errors.endTime.message}</span>}
            </div>
            <button
              // type="submit"

              disabled={loading}
              className={`text-white w-max bg-blue-400 hover:bg-blue-500 tracking-wide text-sm px-4 py-2.5 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Create...
                </>
              ) : "Create"}
            </button>
      </form>
    </div>
  </dialog>
  )
}

export default CreateFlashSaleModal;