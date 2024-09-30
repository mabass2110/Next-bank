"use client"
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { EyeFilledIcon } from "../components/eyefilledicon";
import { EyeSlashFilledIcon } from "../components/eyeslashfilledicon";

function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [message, setMessage] = useState('');

  const router = useRouter();
  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  const validateName = (value: string): boolean => /^[A-Za-z][A-Za-z'-\s]*[A-Za-z]$/.test(value);

  const isEmailInvalid = useMemo(() => {
    return email === "" ? false : !validateEmail(email);
  }, [email]);

  const isNameInvalid = useMemo(() => {
    return firstName === "" ? false : !validateName(firstName);
  }, [firstName]);

  const isLastNameInvalid = useMemo(() => {
    return lastName === "" ? false : !validateName(lastName);
  }, [lastName]);

  const isPasswordInvalid = useMemo(() => {
    return password === "" || confirmPasswordValue !== password;
  }, [password, confirmPasswordValue]);

  const passwordsMatch = password === confirmPasswordValue && password !== "";
  const passwordColor = passwordsMatch ? "success" : "danger";
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (response.ok){
      setMessage("Sign up successful!");
      return router.push("/login");
    }

    else{
      const data = await response.json();
      setMessage(data.error); 
    }

  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <Input
              isInvalid={isNameInvalid}
              isClearable
              label="First Name"
              variant="bordered"
              placeholder="Enter your first name"
              color={isNameInvalid ? "danger" : "success"}
              errorMessage="Please enter a valid name"
              value={firstName}
              onValueChange={setFirstName}
              className="w-full max-w-xs text-gray-800"
            />
          </div>

          <div className="relative mb-6">
            <Input
              isInvalid={isLastNameInvalid}
              isClearable
              label="Last Name"
              variant="bordered"
              placeholder="Enter your last name"
              color={isLastNameInvalid ? "danger" : "success"}
              errorMessage="Please enter a valid name"
              value={lastName}
              onValueChange={setLastName}
              className="w-full max-w-xs text-gray-800"
            />
          </div>

          <div className="relative mb-6">
            <Input
              isInvalid={isEmailInvalid}
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Enter your email"
              color={isEmailInvalid ? "danger" : "success"}
              errorMessage="Please enter a valid email"
              value={email}
              onClear={() => setEmail("")}
              onValueChange={setEmail}
              className="w-full max-w-xs text-gray-800"
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
              value={password}
              onValueChange={setPassword}
              color={passwordColor}
              className="w-full pr-12 text-gray-800"
              aria-label="Password"
            />
          </div>

          <div className="relative mb-6">
            <Input
              label="Confirm Password"
              variant="bordered"
              placeholder="Confirm your password"
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
              value={confirmPasswordValue}
              onValueChange={setConfirmPasswordValue}
              color={passwordColor}
              className="w-full pr-12 text-gray-800"
              aria-label="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className="w-full max-w-xs py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
