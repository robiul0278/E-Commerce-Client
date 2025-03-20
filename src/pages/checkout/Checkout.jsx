/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { CreditCard, Package2, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import empty from "../../../public/empty.svg";
import useUserData from '../../hooks/useUserData';
import toast from 'react-hot-toast';
import { LiaSpinnerSolid } from "react-icons/lia";
import { use } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cart = useSelector((state) => state.cart)
  const token = localStorage.getItem("access-token") || "";
  const [userData, ,] = useUserData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const totalPayment = cart.totalPrice + cart.shipping;

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();


  function generateOrderNumber() {
    const prefix = 'ORD'; // You can customize this prefix
    const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    return `${prefix}-${randomNumber.toString().padStart(6, '0')}`; // Format: ORD-000001
  }


  // ************************** Shipping Address
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  // Fetch divisions on mount
  useEffect(() => {
    axios.get("https://bdapis.com/api/v1.2/divisions")
      .then(response => setDivisions(response.data.data || []))
      .catch(error => console.error("Error fetching divisions:", error));
  }, []);

  // Fetch districts when division changes
  useEffect(() => {
    if (selectedDivision) {
      axios.get(`https://bdapis.com/api/v1.2/division/${selectedDivision}`)
        .then(response => setDistricts(response.data.data || []))
        .catch(error => console.error("Error fetching districts:", error));
    } else {
      setDistricts([]);
      setValue("district", ""); // Reset district selection
      setUpazilas([]);
      setValue("upazila", ""); // Reset upazila selection
    }
  }, [selectedDivision, setValue]);

  // Fetch upazilas when district changes
  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://bdapis.com/api/v1.2/district/${selectedDistrict}`)
        .then(response => setUpazilas(response.data.data[0].upazillas || []))
        .catch(error => console.error("Error fetching upazilas:", error));
    } else {
      setUpazilas([]);
      setValue("upazila", "");
    }
  }, [selectedDistrict, setValue]);
  // ************************** Shipping Address



  const onSubmit = async (data) => {
    setLoading(true);
    const orderNumber = generateOrderNumber();

    const purchaseData = {
      orderNumber,
      userName: data.name,
      phoneNumber: data.number,
      email: data.email,
      address: data.address,
      division: data.division,
      district: data.district,
      upazila: data.upazila,
      postalCode: data.postalCode,
      products: cart?.products,
      totalProduct: cart?.totalQuantity,
      totalPayment: totalPayment,
      userId: userData._id,
      status: "Processing",
      date: new Date(),
    }

    console.log(purchaseData);
    try {
      const response = await axios.post(
        "http://localhost:5000/purchase",
        purchaseData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Product purchase successfully!");
        setLoading(false);
        reset();
        navigate("/dashboard/profile")
        // console.log("Product Response:", response);
      } else {
        toast.error("⚠️ Failed to purchase product. Please try again.");
      }
    } catch (error) {
      console.error("Error purchase product:", error);
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
                          {...register('phone', { required: 'Last name is required' })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
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
                          Street Address
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
                          <select
                            {...register("division", { required: "Division is required" })}
                            className="mt-1 block w-full px-3 py-2 rounded-md border  border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <option value="">Select a Division</option>
                            {divisions?.map((div) => (
                              <option key={div.id} value={div?.division}>{div?.division}</option>
                            ))}
                          </select>
                          {errors.division && <p className="text-sm text-red-600">{errors.division.message}</p>}
                        </div>

                        {/* District Select */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">District</label>
                          <select {...register("district", { required: "District is required" })} disabled={!districts.length} className="mt-1 block w-full px-3 py-2 rounded-md border  border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <option value="">Select a District</option>
                            {districts.map((dist) => (
                              <option key={dist.id} value={dist.district}>{dist.district}</option>
                            ))}
                          </select>
                          {errors.district && <p className="text-sm text-red-600">{errors.district.message}</p>}
                        </div>

                        {/* Upazila Select */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Upazila</label>
                          <select
                            {...register("upazila", { required: "Upazila is required" })} disabled={!upazilas.length}
                            className="mt-1 block w-full px-3 py-2 rounded-md border  border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <option value="">Select an Upazila</option>
                            {upazilas?.map((upa) => (
                              <option key={upa.id} value={upa}>{upa}</option>
                            ))}
                          </select>
                          {errors.upazila && <p className="text-sm text-red-600">{errors.upazila.message}</p>}
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
                      disabled={loading}
                    >
                      {loading ? (
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