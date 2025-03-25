import { useForm } from 'react-hook-form';
import { CreditCard, Package2, Truck } from 'lucide-react';
import { useSelector } from 'react-redux';
import empty from "../../../public/empty.svg";
import { LiaSpinnerSolid } from "react-icons/lia";
import useAuth from '../../hooks/useAuth';
import { useCreateOrderMutation, useGetMyUserDataQuery } from '../../redux/api/api';
import Swal from 'sweetalert2';

const Checkout = () => {
  const cart = useSelector((state) => state.cart)
  const { user } = useAuth();
  const { data: userData } = useGetMyUserDataQuery(user?.email);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const totalPayment = cart.totalPrice + cart.shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  function generateOrderNumber() {
    const prefix = 'ORD'; // You can customize this prefix
    const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    return `${prefix}-${randomNumber.toString().padStart(6, '0')}`; // Format: ORD-000001
  }

  const onSubmit = async (data) => {
    const orderNumber = generateOrderNumber();

    const purchaseData = {
      orderNumber,
      userName: data.name,
      phoneNumber: data.number,
      email: data.email,
      address: data.address,
      division: data.division,
      district: data.district,
      upazilla: data.upazilla,
      postalCode: data.postalCode,
      products: cart?.products,
      totalProduct: cart?.totalQuantity,
      totalPayment: totalPayment,
      userId: userData?.data?._id,
      status: "processing",
      payment: "pending"
    }
      ;
    try {
      const response = await createOrder(purchaseData).unwrap();
      if (response.success) {
        Swal.fire({
          title: "Success!",
          text: "Your order has been successfully!.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error?.data);
      Swal.fire({
        title: "Error!",
        text: `${error?.data?.message}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Checkout</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product Summary */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Package2 className="w-5 h-5" />
                    Order Summary
                  </h3>

                  {/* Product Details */}
                  <div className='overflow-auto'>
                    {cart.products.length > 0 ? (
                      cart.products.map((item, index) => (
                        <div key={index} className="flex gap-4 mb-2 pb-2 border-b border-gray-200">
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={item?.image}
                              alt="img"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.totalPrice.toFixed(2)}৳</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center">
                        <img src={empty} alt="empty wishlist" className="p-28" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{cart?.totalPrice.toFixed(2)}৳</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      {/* <span className="font-medium">{cart.shipping.toFixed(2)}৳</span> */}
                      <span className="font-medium">
                        {cart?.totalPrice > 0 ? <>{cart.shipping.toFixed(2)}৳</> : <>0.00৳</>}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        {/* <span className="font-semibold">{totalPayment.toFixed(2)}৳</span> */}
                        <span className="font-semibold">
                          {cart?.totalPrice > 0 ? <>{totalPayment.toFixed(2)}৳</> : <>0.00৳</>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Delivery
                  </h3>
                  <p className="text-gray-600">Estimated delivery: 3-5 business days</p>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Personal Information */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder='Name'
                          {...register('name', { required: 'First name is required' })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="number"
                          placeholder='0123456789'
                          {...register('number', { required: 'Last name is required' })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.number && (
                          <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>
                        )}
                      </div>

                      <div className="">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder='email address'
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder='your address'
                          {...register('address', { required: 'Address is required' })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Division</label>
                          <input
                            type="text"
                            placeholder='division'
                            {...register('division', { required: 'Address is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />

                          {errors.division && <p className="text-sm text-red-600">{errors.division.message}</p>}
                        </div>

                        {/* District Select */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">District</label>
                          <input
                            type="text"
                            placeholder='district'
                            {...register('district', { required: 'Address is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          {errors.district && <p className="text-sm text-red-600">{errors.district.message}</p>}
                        </div>

                        {/* Upazila Select */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Upazila</label>
                          <input
                            type="text"
                            placeholder='upazilla'
                            {...register('upazilla', { required: 'Address is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          {errors.upazilla && <p className="text-sm text-red-600">{errors.upazilla.message}</p>}
                        </div>
                        <div className="md:col-span-1">
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                            Postal Code
                          </label>
                          <input
                            type="number"
                            placeholder='123456'
                            {...register('postalCode', { required: 'Postal code is required' })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          {errors.postalCode && (
                            <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                          )}
                        </div>


                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                          Card Number
                        </label>
                        <input
                          type="text"
                          {...register('cardNumber', {
                            required: 'Card number is required',
                            pattern: {
                              // value: /^[0-9]{16}$/,
                              message: 'Please enter a valid card number',
                            },
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            {...register('expiryDate', {
                              required: 'Expiry date is required',
                              pattern: {
                                // value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                                message: 'Please enter a valid date (MM/YY)',
                              },
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="MM/YY"
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                            CVV
                          </label>
                          <input
                            type="text"
                            {...register('cvv', {
                              required: 'CVV is required',
                              pattern: {
                                // value: /^[0-9]{3,4}$/,
                                message: 'Please enter a valid CVV',
                              },
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="123"
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#49B2FF] text-white py-2 px-4 rounded-md hover:bg-[#2c84c2] focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <LiaSpinnerSolid />
                          Purchasing...
                        </>
                      ) : (
                        "Complete Purchase"
                      )}
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout