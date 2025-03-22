import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { formatCardNumber } from "@/lib/payment-utils";

const CardNumberInput = () => {
  const [cardNumber, setCardNumber] = useState<string>("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    console.log(value);
    setCardNumber(value);
  };

  return (
    <span className="bg-[#F1F6F9] flex flex-col w-[60%] m-auto p-2">
      <label
        htmlFor="sign-email"
        className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
      >
        Card Number
      </label>
      <Input
        className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
        id="cardNumber"
        value={cardNumber}
        onChange={handleCardNumberChange}
        type="text"
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        inputMode="numeric"
        autoComplete="off"
        style={{ fontSize: "1rem" }}
      />
    </span>
  );
};

export default CardNumberInput;
