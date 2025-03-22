import React, { useState } from "react";
import CheckoutInput from "@/components/ui/checkout-input";
import CheckoutModal from "@/components/ui/checkout-modal";
import { Input } from "@/components/ui/input";
import {
  formatCardNumber,
  detectCardType,
  formatExpiryDate,
} from "@/lib/payment-utils";
import Image from "next/image";
import AllCardTypes from "@/public/png/card-types.png";
import VisaCard from "@/public/png/visa.png";
import MasterCard from "@/public/png/master.png";

const Payment = ({ cardNumber, cardType, onCardNumber }) => {
  console.log("payment is being re-rednered.");

  return (
    <>
      <CardTypeInput />
      <CardNumberInput
        cardNumber={cardNumber}
        cardType={cardType}
        onCardNumber={onCardNumber}
      />

      <div className="w-[60%] flex m-auto gap-3">
        <CardExpiryDateInput />
        <CardCvvInput />
      </div>

      <span className="bg-[#F1F6F9] flex flex-col w-[60%]  m-auto p-2">
        <label
          htmlFor=""
          className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
        >
          Name on Card
        </label>
        <Input
          className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
          name=""
          type="text"
          placeholder="John"
          autoComplete="off"
          style={{ fontSize: "1rem" }}
        />
      </span>
    </>
  );
};

export default Payment;

const CardNumberInput = ({ onCardNumber, cardNumber, cardType }) => {
  console.log(cardNumber);
  return (
    <span className="relative bg-[#F1F6F9] flex flex-col w-[60%] m-auto p-2">
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
        onChange={onCardNumber}
        type="text"
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        inputMode="numeric"
        autoComplete="off"
        style={{ fontSize: "1rem" }}
      />
      {cardType ? (
        <Image
          src={cardType === "visa" ? VisaCard : MasterCard}
          alt="card-type"
          className="absolute bottom-1 right-4 w-12"
        />
      ) : null}
    </span>
  );
};

const CardTypeInput = () => {
  return (
    <span className="bg-[#F1F6F9] flex flex-col w-[60%] m-auto p-2">
      <label
        htmlFor="card-type"
        className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
      >
        Card Type
      </label>
      <div className="relative">
        <Input
          className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
          id="card-type"
          type="text"
          placeholder="....."
          readOnly
          value="Credit or debit Card"
          autoComplete="off"
          style={{ fontSize: "1rem" }}
        />
        <Image
          src={AllCardTypes}
          alt="card-types"
          className="absolute bottom-[0.4rem] right-4 w-24"
        />
      </div>
    </span>
  );
};

const CardExpiryDateInput = () => {
  const [expiryDate, setExpiryDate] = useState<string>("");
  // Handle expiry date change
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatExpiryDate(e.target.value);
    setExpiryDate(value);
  };
  return (
    <span className="bg-[#F1F6F9] flex flex-col m-auto p-2">
      <label className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3">
        Expiry Date
      </label>
      <Input
        className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
        id="expiryDate"
        type="text"
        value={expiryDate}
        onChange={handleExpiryChange}
        placeholder="MM/YY"
        autoComplete="off"
        style={{ fontSize: "1rem" }}
      />
    </span>
  );
};

const CardCvvInput = () => {
  const [cvv, setCvv] = useState<string>("");
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 3));
  };
  return (
    <span className="bg-[#F1F6F9] flex flex-col m-auto p-2">
      <label className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3">
        Security Code
      </label>
      <Input
        className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
        id="cvv"
        type="password"
        value={cvv}
        onChange={handleCvvChange}
        placeholder="***"
        autoComplete="off"
        style={{ fontSize: "1rem" }}
      />
    </span>
  );
};
