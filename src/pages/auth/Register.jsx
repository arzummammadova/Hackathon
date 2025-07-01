import React, { useState, useEffect } from "react";
import axios from "axios";
import { toastdev } from "@azadev/react-toastdev"
import { BASE_URL } from "../../constants/api";
import Cookies from "js-cookie";
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaKey, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const [tab, setTab] = useState("email");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+994",
    code: ""
  });
  const [userId, setUserId] = useState("");
  const [timer, setTimer] = useState(0);
  const [getDisabled, setGetDisabled] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validatePhone = (phone) => {
    return /^\+994\d{9}$/.test(phone);
  };
  const validateCode = (code) => {
    return code && code.length >= 4;
  };
  const validateName = (name) => {
    return name && name.trim().length > 0;
  };

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "phone" && !value.startsWith("+994")) {
      value = "+994";
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const disabled =
    tab === "email"
      ? !(form.name && form.email && form.code)
      : !(form.name && form.phone.length > 4 && form.code);

  const handleGetCode = async () => {
    if (!validateName(form.name)) {
      toastdev.error("Ad boş ola bilməz!", { sound: true, duration: 2000, position: 't-center' });
      return;
    }
    if (tab === "email" && !validateEmail(form.email)) {
      toastdev.error("Düzgün email daxil edin!", { sound: true, duration: 2000, position: 't-center' });
      return;
    }
    if (tab === "phone" && !validatePhone(form.phone)) {
      toastdev.error("Düzgün telefon nömrəsi daxil edin!", { sound: true, duration: 2000, position: 't-center' });
      return;
    }
    try {
      let payload, endpoint;
      if (tab === "email") {
        payload = {
          userName: form.name,
          email: form.email,
        };
        endpoint = "User/send-email-otp";
      } else {
        payload = {
          userName: form.name,
          phoneNumber: form.phone,
        };
        endpoint = "User/send-phone-otp";
      }
      const res = await axios.post(
        BASE_URL + endpoint,
        payload
      );
      setUserId(res.data?.data?.userId);
      setGetDisabled(true);
      setTimer(300); 
      toastdev.success(res.data?.message);
      const token = res.data?.data?.token?.accessToken;
      if (token) {
        Cookies.set("accessToken", token, { expires: 7, path: "/" });
      }
    } catch (err) {
      toastdev.error(err.response?.data?.message, { sound: true, duration: 2000, position: 't-center' });
    }
  };

  useEffect(() => {
    let interval;
    if (getDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setGetDisabled(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [getDisabled, timer]);

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md mx-auto mt-12 bg-white rounded-2xl shadow-2xl p-10 text-center border border-blue-100">
        <div className="text-2xl font-extrabold mb-8 text-blue-900">404 Rooms</div>
        <div className="flex justify-center gap-6 mb-8">
          <button
            className={`text-base font-semibold pb-2 px-2 transition-all duration-200 ${tab === "email" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-blue-500"}`}
            onClick={() => setTab("email")}
          >
            Email Address
          </button>
          <button
            className={`text-base font-semibold pb-2 px-2 transition-all duration-200 ${tab === "phone" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:text-blue-500"}`}
            onClick={() => setTab("phone")}
          >
            Phone Number
          </button>
        </div>
        <form className="space-y-5" onSubmit={async (e) => {
          e.preventDefault();
          // Frontend validation before request
          if (!validateName(form.name)) {
            toastdev.error("Ad boş ola bilməz!", { sound: true, duration: 2000, position: 't-center' });
            return;
          }
          if (tab === "email" && !validateEmail(form.email)) {
            toastdev.error("Düzgün email daxil edin!", { sound: true, duration: 2000, position: 't-center' });
            return;
          }
          if (tab === "phone" && !validatePhone(form.phone)) {
            toastdev.error("Düzgün telefon nömrəsi daxil edin!", { sound: true, duration: 2000, position: 't-center' });
            return;
          }
          if (!validateCode(form.code)) {
            toastdev.error("Kod minimum 4 simvol olmalıdır!", { sound: true, duration: 2000, position: 't-center' });
            return;
          }
          if (!userId) {
            toastdev.error("Əvvəlcə kod alın!", { sound: true, duration: 2000, position: 't-center' });
            return;
          }
          try {
            const res = await axios.post(
              BASE_URL + "User/verify-otp",
              {
                userId: userId,
                otpCode: form.code,
              }
            );
            toastdev.success("Qeydiyyat tamamlandı!", {sound:true, duration:2000, position:'t-center'});
            // Save accessToken to cookies for 7 days using js-cookie
            const token = res.data?.data?.token?.accessToken;
            if (token) {
              Cookies.set("accessToken", token, { expires: 7, path: "/" });
            }
            navigate("/");
          } catch (err) {
            toastdev.error(err.response?.data?.message, { sound: true, duration: 900, position: 't-center' });
          }
        }}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-400 text-lg" />
            <input
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange("name")}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-blue-50"
              disabled={getDisabled}
            />
          </div>
          {tab === "email" ? (
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-blue-400 text-lg" />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange("email")}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-blue-50"
                disabled={getDisabled}
              />
            </div>
          ) : (
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-blue-400 text-lg" />
              <input
                type="tel"
                placeholder="+994 xx xxx xx xx"
                value={form.phone}
                onChange={handleChange("phone")}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-blue-50"
                disabled={getDisabled}
              />
            </div>
          )}
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <FaKey className="absolute left-3 top-3 text-blue-400 text-lg" />
              <input
                type="text"
                placeholder="Verification code"
                value={form.code}
                onChange={handleChange("code")}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-blue-50"
              />
            </div>
            <button
              type="button"
              className={`w-24 border border-blue-600 text-blue-600 rounded-lg px-2 py-2 font-semibold transition-all duration-200 ${getDisabled ? "bg-blue-100 cursor-not-allowed" : "hover:bg-blue-50"}`}
              onClick={handleGetCode}
              disabled={getDisabled}
            >
              {getDisabled ? `${Math.floor(timer/60)}:${(timer%60).toString().padStart(2, '0')}` : "Get"}
            </button>
          </div>
          <button
            type="submit"
            disabled={
              !validateName(form.name) ||
              (tab === "email" && !validateEmail(form.email)) ||
              (tab === "phone" && !validatePhone(form.phone)) ||
              !validateCode(form.code) ||
              !userId
            }
            className={`w-full py-3 rounded-lg text-white text-lg font-bold shadow-md transition-all duration-200 ${
              !validateName(form.name) ||
              (tab === "email" && !validateEmail(form.email)) ||
              (tab === "phone" && !validatePhone(form.phone)) ||
              !validateCode(form.code) ||
              !userId
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Join Now
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-8">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 underline">Terms of Service</a> and{' '}
          <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
        </p>
        <div className="mt-6">
          <p className="text-center text-base text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
