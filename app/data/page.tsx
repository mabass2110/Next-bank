"use client"
import { Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import { useState } from 'react';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
}

const DataPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const token = ''; // Retrieve the token from your cookie or request header
      const res = await fetch(`/api/data`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Adjust according to your authentication
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'User not found');
      }

      const data = await res.json();
      setUserInfo(data);
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUserInfo(null); // Clear user info on error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="bg-white shadow-md rounded-lg w-full max-w-md">
        <CardBody className="p-6 text-black">
          <h3 className="text-2xl font-bold text-gray-800">User Info</h3>
          {error && <div className="text-red-500">{error}</div>}
          {userInfo ? (
            <>
              <h2>First Name: {userInfo.firstName}</h2>
              <h2>Last Name: {userInfo.lastName}</h2>
              <h2>Email: {userInfo.email}</h2>
              <h2>Balance: {userInfo.balance}</h2>
            </>
          ) : (
            <div>Press the fetch button</div>
          )}
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button onClick={fetchUserData}>Fetch</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataPage;
