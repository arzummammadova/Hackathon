import { User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { schemaEditProfile } from '../../validation/EditProfileModal';

const EditProfileModal = ({ open, onClose, email, birthdate, address, phone, country, name, bio ,avatar}) => {
  const [activeField, setActiveField] = useState(null);

  // Format the date for the date input (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formik = useFormik({
    initialValues: {
      username: name || '',
      email: email || '',
      phone: phone || '',
      birthdate: formatDate(birthdate) || '',
      adress: address || '', // Note: using adress to match your backend field
      bio: bio || '',
      country: country || '',
      avatar: null
    },
    validationSchema: schemaEditProfile,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put('http://localhost:5000/api/profile', values, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        onClose(values); // Pass the updated values back to the parent
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    },
    enableReinitialize: true, // This will update form values when props change
  });

  // Reset form when modal opens with new data
  useEffect(() => {
    if (open) {
      formik.resetForm({
        values: {
          username: name || '',
          email: email || '',
          phone: phone || '',
          birthdate: formatDate(birthdate) || '',
          adress: address || '',
          bio: bio || '',
          country: country || '',
          avatar: null
        }
      });
    }
  }, [open, name, email, phone, birthdate, address, bio, country]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-400/20 to-blue-500/20 backdrop-blur-sm flex justify-center items-center p-7 z-50">
      <div className="bg-white rounded-sm shadow-xl w-full max-w-[50%] overflow-hidden transform transition-all">
        <div className="gradient p-3 rounded-t-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Profil Məlumatlarım</h2>
            <button 
              onClick={() => onClose(null)} 
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {/* First Column */}
            <div className="space-y-2">
              {/* Username Field */}
              <div className={`transition-all rounded-lg p-1 ${activeField === 'username' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <label className="flex items-center text-md font-medium text-gray-700">
                  <User className="w-3 h-3 text-blue-500 mr-1" />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  {...formik.getFieldProps('username')}
                  onFocus={() => setActiveField('username')}
                  onBlur={() => {
                    formik.handleBlur('username');
                    setActiveField(null);
                  }}
                  className="w-full mt-1 px-2 py-1 text-sm border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-red-400 text-sm">{formik.errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div className={`transition-all rounded-lg p-1 ${activeField === 'email' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <label className="flex items-center text-md font-medium text-gray-700">
                  <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-poçt
                </label>

                <input
                disabled
                  type="email"
                  name="email"
                  {...formik.getFieldProps('email')}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => {
                    formik.handleBlur('email');
                    setActiveField(null);
                  }}
                  className="w-full mt-1 px-2 py-1 text-sm border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent"
                />
                <sub className='text-red-400'>email deyismek olmaz</sub>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-400 text-sm">{formik.errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className={`transition-all rounded-lg p-1 ${activeField === 'phone' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <label className="flex items-center text-md font-medium text-gray-700">
                  <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  {...formik.getFieldProps('phone')}
                  onFocus={() => setActiveField('phone')}
                  onBlur={() => {
                    formik.handleBlur('phone');
                    setActiveField(null);
                  }}
                  className="w-full mt-1 px-2 py-1 text-sm border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-400 text-sm">{formik.errors.phone}</p>
                )}
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-2">
              {/* Birth Date Field */}
              <div className={`transition-all rounded-lg p-1 ${activeField === 'birthdate' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <label className="flex items-center text-md font-medium text-gray-700">
                  <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Doğum tarixi
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={formik.values.birthdate}
                  onChange={formik.handleChange}
                  onFocus={() => setActiveField('birthdate')}
                  onBlur={() => {
                    formik.handleBlur('birthdate');
                    setActiveField(null);
                  }}
                  className="w-full mt-1 px-2 py-1 text-sm border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent"
                />
                {formik.touched.birthdate && formik.errors.birthdate && (
                  <p className="text-red-400 text-sm">{formik.errors.birthdate}</p>
                )}
              </div>

              {/* Address Field */}
              <div className={`transition-all rounded-lg p-1 ${activeField === 'adress' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <label className="flex items-center text-md font-medium text-gray-700">
                  <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Ünvan
                </label>
                <input
                  type="text"
                  name="adress"
                  {...formik.getFieldProps('adress')}
                  onFocus={() => setActiveField('adress')}
                  onBlur={() => {
                    formik.handleBlur('adress');
                    setActiveField(null);
                  }}
                  className="w-full mt-1 px-2 py-1 text-sm border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent"
                />
                {formik.touched.adress && formik.errors.adress && (
                  <p className="text-red-400 text-sm">{formik.errors.adress}</p>
                )}
              </div>

              {/* Bio Field */}
              <div className={`transition-all rounded-lg p-1 ${activeField === 'bio' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <label className="flex items-center text-md font-medium text-gray-700">
                  <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Bio
                </label>
                <input
                  type="text"
                  name="bio"
                  {...formik.getFieldProps('bio')}
                  onFocus={() => setActiveField('bio')}
                  onBlur={() => {
                    formik.handleBlur('bio');
                    setActiveField(null);
                  }}
                  className="w-full mt-1 px-2 py-1 text-sm border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent"
                />
                {formik.touched.bio && formik.errors.bio && (
                  <p className="text-red-400 text-sm">{formik.errors.bio}</p>
                )}
              </div>

              {/* Country Field */}
              <div className={`transition-all rounded-lg p-1 ${activeField === 'country' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <label className="flex items-center text-md font-medium text-gray-700">
                  <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ölkə
                </label>
                <input
                  type="text"
                  name="country"
                  {...formik.getFieldProps('country')}
                  onFocus={() => setActiveField('country')}
                  onBlur={() => {
                    formik.handleBlur('country');
                    setActiveField(null);
                  }}
                  className="w-full mt-1 px-2 py-1 text-sm border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent"
                />
                {formik.touched.country && formik.errors.country && (
                  <p className="text-red-400 text-sm">{formik.errors.country}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={() => onClose(null)}
              className="px-3 py-1 text-md font-medium text-gray-700 bg-gray-100 rounded-xs hover:bg-gray-200 transition-colors"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-md font-medium text-white bg-black rounded-xs"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Yüklənir...' : 'Yadda saxla'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;