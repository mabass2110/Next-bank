"use client";
import { signIn } from "next-auth/react";
import { Input } from "@nextui-org/react"; // Updated import from "@nextui-org/input" to "@nextui-org/react"
import Link from "next/link";
import { useEmail } from "../context/context";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { EyeFilledIcon } from "../components/eyefilledicon";
import { EyeSlashFilledIcon } from "../components/eyeslashfilledicon";
import { FaGoogle } from 'react-icons/fa'; // Google icon

function Login() {
  const router = useRouter();
  const { setEmail } = useEmail();
  // State variables
  const [emailF, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (emailF === "") return false;
    return !validateEmail(emailF);
  }, [emailF]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInvalid) {
      setMessage('Please enter a valid email address.');
      return;
    }

    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailF, password }), // Use emailF for email
    });

    const data = await response.json();

    if (response.ok) {
      setEmail(emailF); // Set email context
      router.push("/"); // Redirect after successful sign-in
      setMessage('Sign in successful!');
    } else {
      setMessage(data.error || 'An error occurred during sign-in.');
    }
  };

  const handleSignIn = () =>{ 
    
        signIn("google", { redirect: true , callbackURL: '/'});

      }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
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
              errorMessage={isInvalid ? "Please enter a valid email" : ""}
              onClear={() => setEmailInput('')}
              onValueChange={setEmailInput}
              className="w-full text-gray-800"
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
              className="w-full pr-12 text-gray-800"
              aria-label="Password"
              onValueChange={setPassword}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>

          {/* OAuth Buttons */}
          <div className="flex flex-col mt-4 space-y-2">
            <button
              type="button"
              onClick={handleSignIn}
              className="flex items-center justify-center w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <FaGoogle className="mr-2" />
              Login with Google
            </button>
          </div>

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
          <p className={`text-center mt-4 ${message === 'Sign in successful!' ? 'text-green-500' : 'text-red-500'}`}>
  {message}
</p>

        </form>
      </div>
    </div>
  );
}

export default Login;
