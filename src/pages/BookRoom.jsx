import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toastdev } from '@azadev/react-toastdev';
import { BASE_URL } from '../constants/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

const BookRoom = ({ customerId = 'demo-customer', roomId = 1, serviceId = 1 }) => {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleBook = async () => {
        if (!checkInDate || !checkOutDate) {
            toastdev.error('Tarix aralığını seçin!', { sound: true, duration: 2000 });
            return;
        }
        setLoading(true);
        try {
            await axios.post(
                BASE_URL + 'Reservation',
                {
                    customerId,
                    roomId,
                    checkInDate: checkInDate.toISOString(),
                    checkOutDate: checkOutDate.toISOString(),
                    serviceId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                }
            );
            toastdev.success('Rezervasiya uğurla tamamlandı!', { sound: true, duration: 2000 });
        } catch (err) {
            toastdev.error(
                err.response?.data?.message ||
                (typeof err.response?.data === 'string' ? err.response.data : null) ||
                'Xəta baş verdi!',
                { sound: true, duration: 2000 }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-[#003B95]">Otaq rezerv et</h2>
            <div className="mb-4">
                <label className="block mb-2 font-medium">Giriş tarixi</label>
                <DatePicker
                    selected={checkInDate}
                    onChange={date => setCheckInDate(date)}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={new Date()}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2"
                    placeholderText="Giriş tarixini seçin"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-medium">Çıxış tarixi</label>
                <DatePicker
                    selected={checkOutDate}
                    onChange={date => setCheckOutDate(date)}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate || new Date()}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2"
                    placeholderText="Çıxış tarixini seçin"
                />
            </div>
            <button
                onClick={handleBook}
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white text-lg font-bold shadow-md transition-all duration-200 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#003B95] hover:bg-blue-800'}`}
            >
                {loading ? 'Rezerv edilir...' : 'Book Now'}
            </button>
        </div>
    );
};

export default BookRoom; 