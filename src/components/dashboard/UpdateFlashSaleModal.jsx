/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { useGetFlashProductsQuery } from "../../redux/api/api";

const UpdateFlashSaleModal = ({ onClose, register, errors, handleSubmit, handleUpdateFlashSale, control }) => {
  const modalRef = useRef(null);
  const { data: flashData } = useGetFlashProductsQuery('');

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-full max-w-5xl px-6 py-6 rounded-2xl overflow-y-auto max-h-[100vh] space-y-10">
        <h2 className="text-xl text-gray-800 font-bold">Update Flash Sale</h2>

        {/* current startTime EndTime */}
        <div className="mt-6 w-full rounded-2xl bg-gray-50 border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🕒 Current Flash Sale Time</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Time</p>
                <p className="text-base font-medium text-gray-900">
                  {flashData?.data.flashData.startTime
                    ? format(new Date(flashData.data.flashData.startTime), "PPPp")
                    : "N/A"}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v8a2 2 0 002 2h2m5-12v12" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Time</p>
                <p className="text-base font-medium text-gray-900">
                  {flashData?.data.flashData.startTime
                    ? format(new Date(flashData.data.flashData.endTime), "PPPp")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleUpdateFlashSale)} className="mt-8 grid grid-cols-1 gap-6 rounded-2xl bg-gray-50 border border-gray-200 p-6 shadow-sm" method="dialog">

          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>

          {/* Discount */}
          <div>
            <label className="text-gray-800 text-sm block mb-2">Discount</label>
            <input
              type='text'
              placeholder='50'
              {...register("discount", { required: "Discount is required !" })}
              className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm"
              {...register("discount",)}
            />
            {errors.discount && <span className='text-red-500 text-xs'>{errors.discount.message}</span>}
          </div>

          <div className="flex items-center justify-center gap-5">
            {/* Start Time */}
            <div className="flex flex-col">
              <label className="text-gray-800 text-sm block mb-2">Start Time</label>
              <Controller
                name="startTime"
                control={control}
                rules={{ required: "Start time is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      if (!date) return field.onChange(null);
                      const formatted = format(date, "yyyy-MM-dd'T'HH:mm");
                      field.onChange(formatted);
                    }}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="Pp"
                    className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm"
                  />
                )}
              />
              {errors.startTime && <span className='text-red-500 text-xs'>{errors.startTime.message}</span>}
            </div>

            {/* End Time */}
            <div className="flex flex-col">
              <label className="text-gray-800 text-sm block mb-2">End Time</label>
              <Controller
                name="endTime"
                control={control}
                rules={{ required: "End time is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      if (!date) return field.onChange(null);
                      const formatted = format(date, "yyyy-MM-dd'T'HH:mm");
                      field.onChange(formatted);
                    }}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="Pp"
                    className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm"
                  />
                )}
              />
              {errors.endTime && <span className='text-red-500 text-xs'>{errors.endTime.message}</span>}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-6 py-2.5 text-sm"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>


  )
}

export default UpdateFlashSaleModal;