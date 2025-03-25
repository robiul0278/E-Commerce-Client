/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

const SeeItemsModal = ({ onClose, products }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  const grandTotal = products.reduce((sum, product) => sum + product.totalPrice, 0);

  return (
    <dialog 
      ref={modalRef} 
      className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="modal-box p-6 rounded-lg shadow-lg bg-white w-full max-w-2xl relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product List</h2>
        <button 
          onClick={onClose} 
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">Price: BDT {product.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  <p className="text-sm text-gray-800 font-medium">Total: BDT {product.totalPrice}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No products available</p>
          )}
        </div>
        <div className="mt-4 text-right font-bold text-lg text-gray-900">
          Grand Total: BDT {grandTotal}
        </div>
      </div>
    </dialog>
  );
};

export default SeeItemsModal;