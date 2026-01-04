import React, { useState } from "react";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-green-600">
      <div className="w-[350px] bg-zinc-900 p-6 rounded-xl shadow-2xl text-white">
        
        <h1 className="text-2xl font-bold text-center text-green-500 mb-6">
          MyMusic 🎵
        </h1>

        <form className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-md bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {!isLogin && (
            <>
              {!showOtp && (
                <button
                  type="button"
                  onClick={() => setShowOtp(true)}
                  className="w-full bg-green-500 text-black py-2 rounded-md font-semibold hover:bg-green-400 transition"
                >
                  Send OTP
                </button>
              )}

              {showOtp && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-3 rounded-md bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-black py-3 rounded-md font-bold hover:bg-green-400 transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-zinc-400 mt-4">
          {isLogin ? "New to MyMusic?" : "Already have an account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setShowOtp(false);
            }}
            className="text-green-500 cursor-pointer font-semibold"
          >
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
