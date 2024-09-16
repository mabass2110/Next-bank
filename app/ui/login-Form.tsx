"use client";

import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useState, useMemo } from "react";
import { EyeFilledIcon } from "../components/eyefilledicon";
import { EyeSlashFilledIcon } from "../components/eyeslashfilledicon";
import { handleSubmit } from "../login/handlesubmit";

function Login() {
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;
    return !validateEmail(value);
  }, [value]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <Input
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              errorMessage="Please enter a valid email"
              onClear={() => console.log("input cleared")}
              onValueChange={setValue}
              className="w-full max-w-xs text-gray-800" // Ensure text color is visible
            />
          </div>

          <div className="relative mb-6">
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-gray-600" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-gray-600" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="w-full pr-12 text-gray-800" // Ensure text color is visible
              aria-label="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full max-w-xs py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <Link
                href="./login/signup/"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
