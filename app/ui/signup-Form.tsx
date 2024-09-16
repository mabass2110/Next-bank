"use client"

import { Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { EyeFilledIcon } from "../components/eyefilledicon";
import { EyeSlashFilledIcon } from "../components/eyeslashfilledicon";

function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  const validateName = (value: string): boolean => /^[A-Za-z][A-Za-z'-\s]*[A-Za-z]$/.test(value);

  const isEmailInvalid = useMemo(() => {
    return emailValue === "" ? false : !validateEmail(emailValue);
  }, [emailValue]);

  const isNameInvalid = useMemo(() => {
    return nameValue === "" ? false : !validateName(nameValue);
  }, [nameValue]);

  const isLastNameInvalid = useMemo(() => {
    return lastNameValue === "" ? false : !validateName(lastNameValue);
  }, [lastNameValue]);

  const isPasswordInvalid = useMemo(() => {
    return passwordValue === "" || confirmPasswordValue !== passwordValue;
  }, [passwordValue, confirmPasswordValue]);

  const passwordsMatch = passwordValue === confirmPasswordValue && passwordValue !== "";
  const passwordColor = passwordsMatch ? "success" : "danger";

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEmailInvalid || isNameInvalid || isLastNameInvalid || isPasswordInvalid) {
      console.log("Form is invalid");
      return;
    }

    console.log("Form submitted", { nameValue, lastNameValue, emailValue, passwordValue });
    // Handle form submission here
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
              value={nameValue}
              onValueChange={setNameValue}
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
              value={lastNameValue}
              onValueChange={setLastNameValue}
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
              value={emailValue}
              onClear={() => setEmailValue("")}
              onValueChange={setEmailValue}
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
              value={passwordValue}
              onValueChange={setPasswordValue}
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
        </form>
      </div>
    </div>
  );
}

export default SignUp;
