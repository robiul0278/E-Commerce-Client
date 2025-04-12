/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { format } from "date-fns";

const CreateFlashSaleModal = ({ onClose, register, errors, handleSubmit, handleCreateFlashSale, control }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box w-full max-w-5xl px-6 py-6 rounded-2xl overflow-y-auto max-h-[100vh] space-y-10">
        {/* current startTime EndTime */}
        <div className="mt-6 w-full rounded-2xl bg-gray-50 border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">🕒 Create Flash Sale Time</h3>
        </div>

        <form onSubmit={handleSubmit(handleCreateFlashSale)} className="mt-8 grid grid-cols-1 gap-6 rounded-2xl bg-gray-50 border border-gray-200 p-6 shadow-sm" method="dialog">

          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>

          {/* Discount */}
          <div>
            <label className="text-gray-800 text-sm block mb-2">Discount</label>
            <input
              type='text'
              placeholder='50'
              className="w-full rounded-lg py-2.5 px-4 border border-gray-300 text-sm"
              {...register("discount", { required: "Discount is required !" })}
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
              Create
            </button>
          </div>
        </form>
      </div>
    </dialog>


  )
}

export default CreateFlashSaleModal;