"use client";

import React, { use, useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

const AddToCart = () => {
  const [startCartAni, setStartCartAni] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 0.8 }}
      className="relative bg-slate-500 w-fit"
      whileTap={{ scale: 0.8 }}
    >
      <Button
        className="bg-[#164055] text-lg text-white flex items-center z-20 relative py-8 px-7 gap-2"
        onClick={() => setStartCartAni(true)}
      >
        {/* SVG Cart */}
        <span className="b-red-400 relative">
          <motion.svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            className="relative z-20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              rotate: startCartAni ? [0, -30, 0] : 0,
            }}
            transition={{
              delay: 1,
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <path
              d="M1.47461 1.2998H2.99921C3.56021 1.2998 4.04971 1.6771 4.19491 2.2183L4.61621 3.799M4.61621 3.799C10.7439 3.62728 16.8657 4.30847 22.8058 5.823C21.8994 8.5224 20.8225 11.1448 19.5894 13.6748H7.24961M4.61621 3.799L7.24961 13.6748M7.24961 13.6748C6.37439 13.6748 5.53503 14.0225 4.91616 14.6414C4.29729 15.2602 3.94961 16.0996 3.94961 16.9748H21.2746M5.59961 20.2748C5.59961 20.4936 5.51269 20.7035 5.35797 20.8582C5.20325 21.0129 4.99341 21.0998 4.77461 21.0998C4.55581 21.0998 4.34596 21.0129 4.19125 20.8582C4.03653 20.7035 3.94961 20.4936 3.94961 20.2748C3.94961 20.056 4.03653 19.8462 4.19125 19.6914C4.34596 19.5367 4.55581 19.4498 4.77461 19.4498C4.99341 19.4498 5.20325 19.5367 5.35797 19.6914C5.51269 19.8462 5.59961 20.056 5.59961 20.2748ZM19.6246 20.2748C19.6246 20.4936 19.5377 20.7035 19.383 20.8582C19.2283 21.0129 19.0184 21.0998 18.7996 21.0998C18.5808 21.0998 18.371 21.0129 18.2162 20.8582C18.0615 20.7035 17.9746 20.4936 17.9746 20.2748C17.9746 20.056 18.0615 19.8462 18.2162 19.6914C18.371 19.5367 18.5808 19.4498 18.7996 19.4498C19.0184 19.4498 19.2283 19.5367 19.383 19.6914C19.5377 19.8462 19.6246 20.056 19.6246 20.2748Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>

          <motion.span
            className="absolute left-2 top-[0.2rem] inset-0 b-green-500 w-[0.8rem] h-2"
            // initial={{ height: 0 }}
            // animate={{ height: "100%" }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        </span>

        <motion.svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-[36%] z-10"
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: startCartAni ? [0, -20, 0] : 0,
            rotate: startCartAni ? [0, -10, 0] : 0,
            opacity: startCartAni ? [1, 1, 1] : 0,
            transition: {
              duration: 1.2,
              ease: "easeInOut",
            },
          }}
          transition={{ delay: 1, duration: 1 }}
        >
          <path d="M0.5 0L2.5 9.5H14.5L17.5 1.5L0.5 0Z" fill="#164055" />
        </motion.svg>

        <motion.svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-[36%] z-10"
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: startCartAni ? [0, 24] : 0,
            opacity: startCartAni ? [0, 1] : 0,
          }}
          transition={{
            ease: "easeInOut",
            delay: 1,
            duration: 1,
          }}
        >
          <path d="M0.5 0L2.5 9.5H14.5L17.5 1.5L0.5 0Z" fill="white" />
        </motion.svg>

        <motion.svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-6 left-[37%] z-10"
          initial={{ height: 0 }}
          animate={{ height: startCartAni ? "20%" : 0 }}
          transition={{ type: "spring", delay: 1.4, duration: 1.2 }}
          style={{ transformOrigin: "bottom bottom" }}
        >
          <path d="M0.5 0L2.5 9.5H14.5L17.5 1.5L0.5 0Z" fill="white" />
        </motion.svg>

        {/* Add To Cart Button */}
        <motion.span
          animate={{
            opacity: startCartAni ? 0 : 1,
            width: startCartAni ? 0 : "auto",
          }}
          className="font-urbanist font-urbanist-semibold text-md"
        >
          ADD TO CART
        </motion.span>

        <motion.span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-urbanist font-urbanist-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: startCartAni ? 1 : 0 }}
          transition={{ delay: 2 }}
        >
          {/* Added */}
        </motion.span>
      </Button>

      <motion.svg
        width="13"
        height="7"
        viewBox="0 0 13 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-[50%] z-10"
        initial={{ y: 0, opacity: 0 }}
        animate={{
          y: startCartAni ? [0, -50, 0] : 0,
          opacity: startCartAni ? 1 : 0,
          rotateX: startCartAni ? [0, 30, 0] : 0,
          //   rotateX: startCartAni ? 20 : 0,
        }}
        transition={{ duration: 1 }}
      >
        <path d="M0 0L13 0.5L10 7H2L0 0Z" fill="white" />
      </motion.svg>
    </motion.div>
  );
};

export default AddToCart;
