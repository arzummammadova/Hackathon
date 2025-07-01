import React, { useState, useEffect } from "react";
import axios from "axios";
import { toastdev } from "@azadev/react-toastdev"
import { BASE_URL } from "../../constants/api";
import Cookies from "js-cookie";

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
      // Save accessToken to cookies for 7 days using js-cookie
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

  return (
    // Added wrapper div for vertical and horizontal centering
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 text-white text-3xl rounded-xl flex items-center justify-center">
          M
        </div>

        <h3 className="text-base font-medium mb-1">
          Otel Rezervation
        </h3>
        <div className="text-lg font-semibold mb-6">MyRoom</div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-6">
          <button
            className={`text-sm font-medium pb-1 ${tab === "email"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
              }`}
            onClick={() => setTab("email")}
          >
            Email Address
          </button>
          <button
            className={`text-sm font-medium pb-1 ${tab === "phone"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
              }`}
            onClick={() => setTab("phone")}
          >
            Phone Number
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={async (e) => {
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
          } catch (err) {
            toastdev.error(err.response?.data?.message, { sound: true, duration: 900, position: 't-center' });
          }
        }}>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange("name")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {tab === "email" ? (
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="tel"
              placeholder="+994 xx xxx xx xx"
              value={form.phone}
              onChange={handleChange("phone")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Verification code"
              value={form.code}
              onChange={handleChange("code")}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="w-20 border border-blue-600 text-blue-600 rounded-lg px-2 py-2 hover:bg-blue-50"
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
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              !validateName(form.name) ||
              (tab === "email" && !validateEmail(form.email)) ||
              (tab === "phone" && !validatePhone(form.phone)) ||
              !validateCode(form.code) ||
              !userId
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Join Now
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-5">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-600 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
