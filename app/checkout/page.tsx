"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CheckoutInput from "@/components/ui/checkout-input";
import CheckoutModal from "@/components/ui/checkout-modal";
import CollectIcon from "@/public/png/collect.png";
import PickUpIcon from "@/public/png/pickup.png";
import Payment from "@/components/ui/payment/payment";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
// import ShoeImage from "@/public/shoe-1.png";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import {
  formatCardNumber,
  detectCardType,
  formatExpiryDate,
} from "@/lib/payment-utils";

type openedMoalProps =
  | "email"
  | "shipping methods"
  | "ship to"
  | "payment methods"
  | "close";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const { getTotal, getTotalPrice } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalQuantity = getTotal();

  const [openedModal, setOpenedModal] = useState<openedMoalProps>("close");
  const [email, setEmail] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);
  const [fullname, setFullname] = useState(null);

  console.log(items);
  const handleOpenedModal = (modalName: openedMoalProps) => {
    setOpenedModal(modalName);
  };

  const handleCloseOpenedModal = () => {
    console.log("on close ");
    setOpenedModal("close");
  };
  console.log(openedModal);
  const handleEmail = (email) => {
    setEmail(email);
  };

  const handleShippingMethod = (method) => {
    setShippingMethod(method);
  };

  const handleFullname = (name) => {
    setFullname(name);
  };

  const handleShipTo = (shipTo) => {
    setAddress(shipTo);
  };

  const handlePayment = (method) => {
    setPayment(method);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="b-red-200 flex h-screen">
      <div className="w-1/2 flex flex-col px-14 py-20">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-urbanist font-urbanist-italic-semibold text-my-primary">
            Checkout
          </h1>

          {/* Inputs */}
          <div className="w-full h-fit b-blue-300">
            <div className="flex ">
              <CheckoutInput
                title="email"
                link="switch account"
                style="w-1/2"
                onOpen={handleOpenedModal}
                value={email}
              />

              <CheckoutInput
                title="shipping methods"
                link="choose"
                style="w-1/2"
                onOpen={handleOpenedModal}
                value={shippingMethod}
              />
            </div>

            <CheckoutInput
              title="ship to"
              link="Fill/Change Address"
              style="w-full"
              onOpen={handleOpenedModal}
              value={address}
            />

            <CheckoutInput
              title="payment methods"
              link="choose payment"
              style="w-full"
              onOpen={handleOpenedModal}
              value={payment}
            />
          </div>
        </div>

        {/* Buttons */}
        <motion.div className="flex flex-col gap-3 b-yellow-200 mt-8">
          <motion.button
            whileHover="hover"
            className="relative capitalize py-4 overflow-hidden"
          >
            <motion.span
              className="absolute bottom-0 left-0 w-full bg-my-primary origin-bottom"
              initial={{ height: "100%" }}
              variants={{
                hover: {
                  height: "0%",
                  transition: {
                    duration: 0.35,
                    ease: [0.33, 1, 0.68, 1], // Custom easing for smoother feel
                  },
                },
              }}
            />
            <motion.span
              variants={{
                hover: {
                  y: 0,
                  color: "#164055",
                  scale: 1.4,
                  rotateX: 8,
                  rotateY: 8,
                  zIndex: 10,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  },
                },
              }}
              className="relative text-lg font-urbanist font-urbanist-italic-bold uppercase text-white z-20 block"
            >
              Pay Now
            </motion.span>
          </motion.button>
          <motion.button
            className="w-fit m-auto font-urbanist font-urbanist-italic-bold text-[#246F9E] text-lg uppercase"
            initial={{ opacity: 0.3 }}
            whileHover={{
              opacity: 1,
              scale: 1.4,
              rotateX: 6,
              rotateY: 6,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
              },
            }}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>

      <div className="w-1/2 bg-[#F1F9FB] px-14 py-20">
        <h1 className="text-4xl font-urbanist font-urbanist-italic-semibold text-my-primary pl-6">
          Items in the Cart
        </h1>

        {/* Item in Cart */}
        <div className="p-6 h-[90%] overflow-auto flex flex-col gap-10">
          {/* Cart Details */}
          {items.map((item) => {
            return (
              <div
                className="flex justify-between text-my-primary"
                key={item.id}
              >
                <div className="flex justify-center items-center gap-4">
                  {/* <Image src={ShoeImage} alt="shoe" className="w-[6rem]" /> */}
                  <img
                    src={`${item?.image}`}
                    alt="shoes"
                    className="w-24 relative z-32 scale-x-[-1]"
                  />
                  <div className="" key={item.id}>
                    <h3 className="font-dm-sans font-dm-sans-italic-bold text-md">
                      {item?.name}
                    </h3>
                    <p className="font-dm-sans font-dm-sans-italic-medium text-[14px]">
                      Size - {item?.size} UK
                    </p>
                  </div>
                </div>
                {/* Price */}
                <p className="font-dm-sans font-dm-sans-italic-medium text-lg">
                  ${item.price}
                </p>
              </div>
            );
          })}

          {/* Code */}
          <div className="">
            <span className="flex gap-4 w-full">
              <Input
                type="text"
                placeholder="Discount code or gift card"
                className="w-[80%] py-6 bg-white font-dm-sans font-dm-sans-italic-medium text-my-primary border-none shadow-none rounded-none"
              />
              <Button className="w-[20%] font-urbanist font-urbanist-italic-semibold uppercase py-6 bg-my-primary text-white rounded-none">
                apply
              </Button>
            </span>
          </div>

          {/* total */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between font-dm-sans font-dm-sans-medium text-my-primary">
              <p>Subtotal {mounted ? totalQuantity || 0 : "..."} items</p>
              <p>${mounted ? totalPrice || 0 : "..."}</p>
            </div>

            <div className="flex justify-between font-dm-sans font-dm-sans-medium text-my-primary">
              <p>Shipping</p>
              <p>FREE</p>
            </div>

            <div className="flex justify-between font-dm-sans font-dm-sans-semibold text-xl text-my-primary">
              <p>Total</p>
              <p>${mounted ? totalPrice || 0 : "..."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opened Modals */}
      <AnimatePresence>
        {openedModal === "email" ? (
          <EmailModal onEmail={handleEmail} onClose={handleCloseOpenedModal} />
        ) : null}

        {openedModal === "ship to" ? (
          <ShipToModal
            onShipTo={handleShipTo}
            onClose={handleCloseOpenedModal}
          />
        ) : null}

        {openedModal === "shipping methods" ? (
          <ShippingModal
            onShipping={handleShippingMethod}
            onClose={handleCloseOpenedModal}
          />
        ) : null}

        {openedModal === "payment methods" ? (
          <PaymentModal
            onPayment={handlePayment}
            onClose={handleCloseOpenedModal}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default CheckoutPage;

export const EmailModal = ({ onEmail, onClose }) => {
  const [email, setEmail] = useState("");

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSave = () => {
    // Validate email
    if (email && email.includes("@") && email.includes(".")) {
      onEmail(email);
      onClose();
    } else {
      // You could add error handling here if needed
      // alert("Please enter a valid email address");
    }
  };

  return (
    <CheckoutModal
      onSave={handleSave}
      onClose={onClose}
      buttonName="CONTINUE WITH THIS ACCOUNT"
    >
      <h3 className="font-urbanist font-urbanist-italic-bold text-2xl text-my-primary text-center">
        Sign In or Create an account
      </h3>

      <p className="text-center font-dm-sans">
        Enter your email to sign in or create an account
      </p>
      <span className="bg-[#F1F6F9] flex flex-col w-[60%] m-auto p-2">
        <label
          htmlFor="sign-email"
          className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
        >
          Email
        </label>
        <Input
          className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
          name="sign-email"
          value={email}
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="user123@example.com"
          autoComplete="off"
          style={{ fontSize: "1rem" }}
        />
      </span>
    </CheckoutModal>
  );
};

export const ShippingModal = ({ onShipping, onClose }) => {
  const [shipping, setShipping] = useState(null);
  const handleShipping = (method) => {
    onShipping(method);
    onClose();
  };
  return (
    <CheckoutModal onClose={onClose} buttonName="none">
      <h3 className="font-urbanist font-urbanist-italic-bold text-3xl text-my-primary text-center w-[60%] m-auto">
        Select One of the Following Shipping Methods
      </h3>

      <p className="font-dm-sans w-[60%] m-auto text-center">
        Please make sure you select correct one.
      </p>

      <div className=" b-red-400 p-4 flex justify-between w-[60%] m-auto">
        <motion.button
          whileHover="hover"
          className="relative block w-32 h-32 bg-[#F1F6F9] font-urbanist font-urbanist-italic-semibold text-my-primary"
          onClick={() => handleShipping("Ship to Address")}
        >
          <svg
            width="37"
            height="39"
            viewBox="0 0 37 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-4 right-4"
          >
            <path
              d="M3.63158 18.1053L1 16.1316L19.4198 1L36.5251 15.4737L33.2356 18.7632"
              stroke="black"
              strokeWidth="0.5"
            />
            <path
              d="M4.28906 18.1051V38.4998H16.1312M4.94696 18.1051L19.4206 6.9209L33.2364 18.1051V38.4998H20.0785"
              stroke="black"
              strokeWidth="0.5"
            />
            <rect
              x="15.7246"
              y="13.75"
              width="7.39474"
              height="6.07895"
              stroke="black"
              strokeWidth="0.5"
            />
            <path
              d="M12.8418 38.5003V26.6582H25.3418V38.5003"
              stroke="black"
              strokeWidth="0.5"
            />
          </svg>
          <motion.span
            className="absolute bottom-0 left-0 w-full bg-my-primary origin-bottom"
            initial={{ height: "0%" }}
            variants={{
              hover: {
                height: "100%",
                transition: {
                  duration: 0.35,
                  ease: [0.33, 1, 0.68, 1], // Custom easing for smoother feel
                },
              },
            }}
          />
          <motion.label
            variants={{
              hover: {
                y: -10,
                x: 20,
                color: "#ffffff",
                scale: 1.2,
                rotateX: -8,
                rotateY: -8,
                zIndex: 10,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
            className="absolute bottom-2 left-2 text-md"
          >
            Ship to <br /> Address
          </motion.label>
        </motion.button>

        <motion.button
          whileHover="hover"
          className="relative block w-32 h-32 bg-[#F1F6F9] font-urbanist font-urbanist-italic-semibold text-my-primary"
          onClick={() => handleShipping("Click & Collect")}
        >
          <Image
            src={CollectIcon}
            alt="icon"
            className="w-12 h-12 absolute top-4 right-3"
          />
          <motion.span
            className="absolute bottom-0 left-0 w-full bg-my-primary origin-bottom"
            initial={{ height: "0%" }}
            variants={{
              hover: {
                height: "100%",
                transition: {
                  duration: 0.35,
                  ease: [0.33, 1, 0.68, 1], // Custom easing for smoother feel
                },
              },
            }}
          />
          <motion.label
            variants={{
              hover: {
                y: -10,
                x: 20,
                color: "#ffffff",
                scale: 1.2,
                rotateX: -8,
                rotateY: -8,
                zIndex: 10,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
            className="absolute bottom-2 left-2 text-md"
          >
            Click & <br /> Collect
          </motion.label>
        </motion.button>

        <motion.button
          whileHover="hover"
          className="relative block w-32 h-32 bg-[#F1F6F9] font-urbanist font-urbanist-italic-semibold text-my-primary"
          onClick={() => handleShipping("Pick Up at Store")}
        >
          <Image
            src={PickUpIcon}
            alt="icon"
            className="w-12 h-12 absolute top-4 right-3"
          />
          <motion.span
            className="absolute bottom-0 left-0 w-full bg-my-primary origin-bottom"
            initial={{ height: "0%" }}
            variants={{
              hover: {
                height: "100%",
                transition: {
                  duration: 0.35,
                  ease: [0.33, 1, 0.68, 1], // Custom easing for smoother feel
                },
              },
            }}
          />
          <motion.label
            variants={{
              hover: {
                y: -10,
                x: 20,
                color: "#ffffff",
                scale: 1.2,
                rotateX: -8,
                rotateY: -8,
                zIndex: 10,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
            className="absolute bottom-2 left-2 text-md text-left"
          >
            Pick Up <br /> Store
          </motion.label>
        </motion.button>
      </div>
    </CheckoutModal>
  );
};

export const ShipToModal = ({ onShipTo, onClose }) => {
  const [formData, setFormData] = useState({
    country: "United Kingdom",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("Form data:", formData);

  const handleSave = () => {
    const address = (
      <>
        {formData.firstname + " " + formData.lastname},<br />
        {formData.address +
          ", " +
          formData.postalCode +
          ", " +
          formData.phoneNumber +
          ", " +
          "United Kingdom."}
      </>
    );

    console.log(address);
    onShipTo(address);
    // onFullname(`${formData.firstname} ${formData.lastname}`);
    onClose();
  };
  return (
    <CheckoutModal
      onSave={handleSave}
      onClose={onClose}
      buttonName="Use this address"
    >
      <h3 className="font-urbanist font-urbanist-italic-bold text-3xl text-my-primary text-left w-[60%] m-auto">
        Add Address
      </h3>

      <p className="font-dm-sans w-[60%] m-auto">
        Enter your address carefull so that you don't make mistake.
      </p>
      <span className="bg-[#F1F6F9] flex flex-col w-[60%] m-auto p-2">
        <label
          htmlFor="sign-email"
          className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
        >
          Coutry/Region
        </label>
        <Select>
          <SelectTrigger className="w-full shadow-none border-none">
            <p
              className="text-my-primary font-dm-sans font-dm-sans-medium"
              style={{ fontSize: "1rem" }}
            >
              United Kingdom
            </p>
            {/* <SelectValue placeholder="Hello" /> */}
          </SelectTrigger>
        </Select>
      </span>

      <div className="w-[60%] flex m-auto gap-3">
        <span className="bg-[#F1F6F9] flex flex-col m-auto p-2">
          <label
            htmlFor=""
            className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
          >
            Firstname
          </label>
          <Input
            className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
            name="firstname"
            type="text"
            placeholder="...."
            autoComplete="off"
            style={{ fontSize: "1rem" }}
            value={formData.firstname}
            onChange={handleChange}
          />
        </span>
        <span className="bg-[#F1F6F9] flex flex-col m-auto p-2">
          <label
            htmlFor=""
            className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
          >
            Lastname
          </label>
          <Input
            className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
            name="lastname"
            type="text"
            placeholder="...."
            autoComplete="off"
            style={{ fontSize: "1rem" }}
            value={formData.lastName}
            onChange={handleChange}
          />
        </span>
      </div>

      <span className="bg-[#F1F6F9] flex flex-col w-[60%]  m-auto p-2">
        <label
          htmlFor=""
          className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
        >
          Address
        </label>
        <Input
          className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
          name="address"
          type="text"
          placeholder="...."
          autoComplete="off"
          style={{ fontSize: "1rem" }}
          value={formData.address}
          onChange={handleChange}
        />
      </span>

      <div className="w-[60%] flex m-auto gap-3">
        <span className="bg-[#F1F6F9] flex flex-col m-auto p-2">
          <label
            htmlFor=""
            className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
          >
            City
          </label>
          <Input
            className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
            name="city"
            type="text"
            placeholder="...."
            autoComplete="off"
            style={{ fontSize: "1rem" }}
            value={formData.city}
            onChange={handleChange}
          />
        </span>
        <span className="bg-[#F1F6F9] flex flex-col m-auto p-2">
          <label
            htmlFor=""
            className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
          >
            Postal Code
          </label>
          <Input
            className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
            name="postalCode"
            type="text"
            placeholder="...."
            autoComplete="off"
            style={{ fontSize: "1rem" }}
            value={formData.postalCode}
            onChange={handleChange}
          />
        </span>
      </div>

      <span className="bg-[#F1F6F9] flex flex-col w-[60%]  m-auto p-2">
        <label
          htmlFor=""
          className="font-urbanist font-urbanist-italic-semibold text-gray-500 text-sm px-3"
        >
          Phone Number
        </label>

        <div className="flex text-base justify-center items-center pl-3">
          <p className="text-base text-my-primary">+44</p>
          <Input
            className="bg-transparent font-dm-sans font-dm-sans-medium border-none shadow-none rounded-none focus:border-none text-my-primary focus-visible:outline-none focus:outline-none"
            name="phoneNumber"
            type="number"
            placeholder="...."
            autoComplete="off"
            style={{ fontSize: "1rem" }}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </span>
    </CheckoutModal>
  );
};

export const PaymentModal = ({ onPayment, onClose }) => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardType, setCardType] = useState<string>("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value);

    const detectedType = detectCardType(value);
    setCardType(detectedType);
  };

  const handleSave = () => {
    const cardEndingInFour =
      cardNumber.length >= 4 ? `****${cardNumber.slice(-4)}` : cardNumber;
    console.log(cardEndingInFour + " " + cardType);
    onPayment(cardType + " " + cardEndingInFour);
    onClose();
  };
  return (
    <CheckoutModal
      onSave={handleSave}
      onClose={onClose}
      buttonName="Use This Payment Method"
    >
      <h3 className="font-urbanist font-urbanist-italic-bold text-3xl text-my-primary text-left w-[60%] m-auto">
        Payment
      </h3>

      <p className="font-dm-sans w-[60%] m-auto text-left text-my-primary">
        Please select enter your card details carefully.
      </p>

      <Payment
        onCardNumber={handleCardNumberChange}
        cardNumber={cardNumber}
        cardType={cardType}
      />
    </CheckoutModal>
  );
};
