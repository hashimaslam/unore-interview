"use client";

import { useGetTotalAmount } from "@/api/api";
import React from "react";

const TotalAmountContainer = () => {
  const [walletAddress, setWalletAddress] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState<number | null>(null);
  const { mutateAsync } = useGetTotalAmount();
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setWalletAddress(e.target.value);
  };
  const getTotalAmount = async () => {
    const data = await mutateAsync({
      walletAddress,
    });
    setTotalAmount(data.totalAmount);
  };
  return (
    <div className="mb-4">
      <p className="text-[16px] mb-2 text-gray-500">
        Enter wallet address to get the total withdraw amount
      </p>

      <div className="flex gap-2">
        <input
          type="string"
          className=" border-gray-400 rounded-md border-2 px-2 py-1"
          placeholder="Enter wallet address"
          onChange={handleInput}
        ></input>
        <button
          className="px-2 py-1 bg-slate-700 rounded text-gray-300"
          onClick={getTotalAmount}
        >
          Submit
        </button>
      </div>
      <div className="font-semibold text-gray-700 mt-2">
        {totalAmount !== null ? `$${totalAmount}` : null}
      </div>
    </div>
  );
};

export default TotalAmountContainer;
