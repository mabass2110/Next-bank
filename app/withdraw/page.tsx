"use client";
import { NextPage } from 'next';
import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react';
import { useState } from 'react';

const WithdrawPage: NextPage = () => {
  const [amount, setAmount] = useState<number>(0); // State to hold the withdraw amount
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleWithdraw = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    // Log the request body to check values
    console.log('Request Body:', { amount });

    const response = await fetch('/api/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }), // Send only the amount in the request body
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(`Successfully withdraw ${amount} to your balance.`);
      setAmount(0); // Reset amount after successful withdrawal
      setError(null);
    } else {
      setError(data.error || 'An error occurred during withdrawl.');
      setMessage(null); // Clear previous messages
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="bg-white shadow-md rounded-lg w-full max-w-md">
        <CardBody className="p-6">
          <h3 className="text-2xl font-bold text-gray-800">Withdraw</h3>
          <form className="space-y-4" onSubmit={handleWithdraw}>
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-gray-600">Withdraw Amount</label>
              <Input
                id="amount"
                type="number"
                name="amount"
                required
                placeholder="Enter withdraw amount"
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setAmount(Number(e.target.value))} // Update amount on input change
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Withdraw
            </Button>
          </form>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </CardBody>
        <CardFooter className="p-4 text-gray-600">
          <p>Note: Withdraw processing may take some time.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WithdrawPage;
