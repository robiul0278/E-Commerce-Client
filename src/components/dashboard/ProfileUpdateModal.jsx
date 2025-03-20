/* eslint-disable react/prop-types */
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useUserData from "../../hooks/useUserData";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileUpdateModal = ({ onClose }) => {
    const modalRef = useRef(null);
    const [userData, , refetch] = useUserData();
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const token = localStorage.getItem("access-token");

    const {
        watch,
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.showModal(); // This opens the modal
        }
    }, []);

    // Watch image URL
    const imageUrl = watch("image");


    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "GadgetShop");
        data.append("cloud_name", "dhnkviblq");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dhnkviblq/image/upload", data);
            setValue("image", res.data.secure_url);  // ✅
            setIsUploading(false);
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Failed to upload image. Try again.");
            setIsUploading(false);
        }
    };


    const onSubmit = async (data) => {
        setLoading(true);
        const updateDAta = {
            name: data.name,
            photoURL: data.image
        }

        // await new Promise(resolve => setTimeout(resolve, 1000));
        axios.patch(`http://localhost:5000/update-profile/${userData?._id}`, updateDAta, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    refetch();
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center text-center">
                    <div className="relative group mb-6">
                        <div className="relative w-24 h-24">
                            <img
                                src={imageUrl || `${userData.photoURL}`}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover ring-4 ring-white shadow-sm"
                            />
                            <div className={`absolute inset-0 rounded-full flex items-center justify-center
                  ${isUploading ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0 group-hover:bg-opacity-40'}
                  transition-all duration-200`}>
                                {isUploading ? (
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                ) : (
                                    <label className="cursor-pointer p-2 rounded-full hover:bg-black hover:bg-opacity-50 transition-colors">
                                        <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                    <input
                        {...register('name')}
                        placeholder={userData?.name}
                        className="text-xl font-medium text-gray-900 text-center bg-transparent border-b border-transparent border-gray-400 focus:border-blue-500 focus:outline-none transition-colors pb-1"
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-400 transition-colors"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </form>
            </div>
        </dialog>
    )
}

export default ProfileUpdateModal;