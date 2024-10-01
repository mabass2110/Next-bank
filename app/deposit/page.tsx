"use client";

import { NextPage } from 'next';
import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react';
import { useState } from 'react';

const DepositPage: NextPage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeposit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Get the token from storage

    const response = await fetch('/api/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify({ amount }), // Send only the amount
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Deposit successful:', data);
      setMessage(`Successfully added ${amount} to your balance.`);
      setAmount(0); // Reset amount input
      setError(null); // Clear any previous errors
    } else {
      console.error('Error:', data.error);
      setError(data.error || 'An error occurred during deposit.');
      setMessage(null); // Clear previous messages
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="bg-white shadow-md rounded-lg w-full max-w-md">
        <CardBody className="p-6">
          <h3 className="text-2xl font-bold text-gray-800">Deposit</h3>
          <form className="space-y-4" onSubmit={handleDeposit}>
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-gray-600">Amount</label>
              <Input
                id="amount"
                type="number"
                name="amount"
                required
                placeholder="Enter deposit amount"
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Deposit
            </Button>
          </form>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </CardBody>
        <CardFooter className="p-4 text-gray-600">
          <p>Note: Deposit processing may take some time.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DepositPage;
