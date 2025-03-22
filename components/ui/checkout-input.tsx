import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import VisaCard from "@/public/png/visa.png";
import MasterCard from "@/public/png/master.png";

type openedMoalProps =
  | "email"
  | "shipping methods"
  | "ship to"
  | "payment methods"
  | "close";

interface CheckoutInputProps {
  title: openedMoalProps;
  link: string;
  style: string;
  cardType: string;
  value: string | null;
  onOpen: (modalName: openedMoalProps) => void;
}

const CheckoutInput = ({
  title,
  link,
  style,
  onOpen,
  value,
  cardType,
}: CheckoutInputProps) => {
  return (
    <article
      className={clsx(
        style,
        "b-blue-300 p-2 flex flex-col gap-1 border-[1.5px] border-my-primary text-my-primary"
      )}
    >
      <span className="flex justify-between gap-2">
        <label
          htmlFor="email"
          className={`font-urbanist font-urbanist-italic-semibold text-lg capitalize ${
            value ? "text-gray-300 text-base" : "text-my-primary text-lg"
          }`}
        >
          {title}
        </label>
        <motion.button
          whileHover={{
            scale: 1.2,
            rotateX: 8,
            rotateY: 8,
            zIndex: 10,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 12,
            },
          }}
          className="text-xs font-dm-sans font-dm-sans-semibold text-[#246F9E] underline capitalize"
          onClick={() => onOpen(title)}
        >
          {link}
        </motion.button>
      </span>

      <div
        className={`font-dm-sans font-dm-sans-italic-semibold ${
          value ? "py-4 text-lg" : "py-8"
        }`}
      >
        {value ? (
          <p>{value}</p>
        ) : (
          <p className="w-full h-[2px] bg-[radial-gradient(circle,_#000_2px,_transparent_3px)] bg-repeat-x bg-[length:10px_2px]"></p>
        )}
      </div>

      {/* <input className="w-full" type="text" /> */}
    </article>
  );
};

export default CheckoutInput;
