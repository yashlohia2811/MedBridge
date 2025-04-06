import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);

            if (image) {
                formData.append('image', image);
            }

            const { data } = await axios.post(
                `${backendUrl}/api/user/update-profile`,
                formData,
                { headers: { token, 'Content-Type': 'multipart/form-data' } }
            );

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return userData && (
        <div className="max-w-lg flex flex-col mx-auto gap-2 text-sm">
            {isEdit ? (
                <label htmlFor='image'>
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 rounded opacity-75' 
                            src={image ? URL.createObjectURL(image) : userData.image} 
                            alt="Profile"
                        />
                        {!image && (
                            <img className='w-10 absolute bottom-12 right-12' 
                                src={assets.upload_icon} 
                                alt="Upload Icon"
                            />
                        )}
                    </div>
                    <input 
                        onChange={(e) => setImage(e.target.files[0])} 
                        type='file' 
                        id='image' 
                        hidden 
                    />
                </label>
            ) : (
                <img className='w-36 rounded' src={userData.image} alt="Profile" />
            )}

            <div className="flex flex-col items-center mb-6">
                {isEdit ? (
                    <input 
                        type="text" 
                        value={userData.name} 
                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none text-center"
                    />
                ) : (
                    <p className="text-xl font-semibold">{userData.name}</p>
                )}
            </div>

            <hr className="mb-4" />

            <div className="space-y-4">
                <div>
                    <p className="text-gray-600 font-medium">Email:</p>
                    <p className="text-gray-800">{userData.email}</p>
                </div>

                <div>
                    <p className="text-gray-600 font-medium">Phone:</p>
                    {isEdit ? (
                        <input 
                            type="text" 
                            value={userData.phone} 
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                        />
                    ) : (
                        <p className="text-gray-800">{userData.phone}</p>
                    )}
                </div>

                <div>
                    <p className="text-gray-600 font-medium">Gender:</p>
                    {isEdit ? (
                        <select 
                            value={userData.gender} 
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <p className="text-gray-800">{userData.gender}</p>
                    )}
                </div>

                <div>
                    <p className="text-gray-600 font-medium">Date of Birth:</p>
                    {isEdit ? (
                        <input 
                            type="date" 
                            value={userData.dob} 
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                        />
                    ) : (
                        <p className="text-gray-800">{userData.dob}</p>
                    )}
                </div>

                <div>
                    <p className="text-gray-600 font-medium">Address:</p>
                    {isEdit ? (
                        <>
                            <input 
                                type="text" 
                                value={userData.address.line1} 
                                onChange={(e) => setUserData(prev => ({ 
                                    ...prev, 
                                    address: { ...prev.address, line1: e.target.value } 
                                }))}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none mb-2" 
                                placeholder="Address Line 1"
                            />
                            <input 
                                type="text" 
                                value={userData.address.line2} 
                                onChange={(e) => setUserData(prev => ({ 
                                    ...prev, 
                                    address: { ...prev.address, line2: e.target.value } 
                                }))}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" 
                                placeholder="Address Line 2"
                            />
                        </>
                    ) : (
                        <p className="text-gray-800">{userData.address.line1}, {userData.address.line2}</p>
                    )}
                </div>
            </div>

            <button 
                onClick={() => isEdit ? updateUserProfileData() : setIsEdit(true)} 
                className="w-full bg-primary text-white py-3 rounded-full text-lg font-medium hover:opacity-90 transition mt-6"
            >
                {isEdit ? 'Save Changes' : 'Edit Profile'}
            </button>
        </div>
    );
};

export default MyProfile;
