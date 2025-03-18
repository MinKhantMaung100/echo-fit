"use client";
import React, { useState } from "react";
import ProductControl from "./product-control";
import { AnimatePresence, motion } from "framer-motion";
import { ControlType } from "@/types/control-type";
import { Button } from "@/components/ui/button";
import ShoppingCart from "@/components/ui/shopping-cart";
import Details from "@/components/ui/details";
import Reviews from "@/components/ui/reviews";
import AddToCart from "@/components/ui/add-to-cart";

interface Review {
  userName: string;
  title: string;
  comment: string;
  image: string | null;
}

interface Shoe {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: number[];
  primaryUse: string[];
  smallImage: string;
  reviews: Review[];
}
interface ShoeControlProps {
  shoe: Shoe | null;
}

const ShoeControl = ({ shoe }: ShoeControlProps) => {
  const [openControl, setOpenControl] = useState<ControlType>("close");

  // Open Control
  const handleOpenControl = (control: ControlType) => {
    console.log("Opening control: ", control);
    setOpenControl(control);
  };

  // Close Control
  const handleCloseControl = () => {
    console.log("Opening control: ", close);
    setOpenControl("close");
  };
  return (
    <>
      <div className="bg-ambe-900 w-full min-h-[40%] py-8 px-16 boder-blue-300 relative">
        {/* Main Area */}
        <div className="flex">
          {/* Shoe Name, Price, & Add to Cart */}
          <div className="w-[60%] flex flex-col">
            <h1 className="text-3xl font-urbanist font-urbanist-italic-semibold leading-12">
              {shoe?.name}
            </h1>
            <p className="text-2xl font-dm-sans font-dm-sans-italic-regular mb-3">
              ${shoe?.price}
            </p>
            <AddToCart />
          </div>

          {/* Size, Review, Details, and AR Try-On */}
          <motion.div
            className="w-[30%] grid grid-cols-2 grid-rows-2 gap-4 perspective-1000 ml-auto justify-end"
            animate={{
              height: openControl !== "close" ? 0 : "auto",
              opacity: openControl !== "close" ? 0 : 1,
            }}
          >
            <ProductControl title="sizes" onOpen={handleOpenControl} />
            <ProductControl title="details" onOpen={handleOpenControl} />

            <ProductControl title="reviews" onOpen={handleOpenControl} />
            <ProductControl title="ar try-on" onOpen={handleOpenControl} />
          </motion.div>

          {openControl === "sizes" && (
            <SizeSelection
              avaliableSizes={shoe?.sizes}
              onClose={handleCloseControl}
            />
          )}
        </div>
      </div>
      {/* Shopping Cart Button */}
      <AnimatePresence>
        {openControl === "cart" ? (
          <motion.button
            whileHover={{
              x: -10,
              y: -10,
              scale: 1.4,
            }}
            className={`absolute top-[54%] right-40 bg-white w-10 h-10 rounded-full flex justify-center items-center shadow-lg group z-[60] cursor-pointer`}
            onClick={handleCloseControl}
          >
            <motion.span
              className="bg group w-full h-full flex justify-center items-center rounded-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="size-6  stroke-my-primary group-hover:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </motion.svg>
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            className={`absolute top-[57%] right-40 bg-white w-10 h-10 rounded-full flex justify-center items-center shadow-lg group cursor-pointer`}
            onClick={() => handleOpenControl("cart")}
            whileHover={{
              x: -10,
              y: -10,
              scale: 1.4,
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="size-5 stroke-my-primary group-hover:stroke-white"
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Shopping Cart */}
      <AnimatePresence>
        {openControl === "cart" ? (
          <ShoppingCart onClose={handleCloseControl} />
        ) : null}
      </AnimatePresence>

      {/* Details */}
      <AnimatePresence>
        {openControl === "details" ? (
          <Details
            name={shoe?.name}
            description={shoe?.description}
            onClose={handleCloseControl}
          />
        ) : null}
      </AnimatePresence>

      {/* Reviews */}
      <AnimatePresence>
        {openControl === "reviews" ? (
          <Reviews
            shoeName={shoe?.name}
            reviews={shoe?.reviews}
            onClose={handleCloseControl}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ShoeControl;

type SizeSelectionProps = {
  avaliableSizes?: number[];
  onClose: () => void;
};

export function SizeSelection({ avaliableSizes, onClose }: SizeSelectionProps) {
  const hoverAnimation = {
    hover: {
      scale: 1.1,
      rotateX: 6,
      rotateY: 6,
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        bounce: 0.4,
      },
    },
  };
  return (
    <motion.section
      initial={{ y: "100%", opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 12,
        bounce: 0.1,
      }}
      className="absolute bg-white w-[32%] h-full right-0 bottom-0 z-30 flex flex-col gap-4 py-8 px-16 "
    >
      <h1 className="text-xl text-my-primary font-urbanist font-urbanist-italic-semibold">
        Select Size (UK)
        <p className="text-sm font-urbanist-italic-medium">Available Sizes</p>
      </h1>

      <div className="flex flex-wrap gap-4 overflow-auto">
        {/* Avaliable Sizes */}
        {avaliableSizes.map((size) => (
          <motion.span
            key={size}
            whileHover="hover"
            variants={hoverAnimation}
            className="block w-[30%] relative"
          >
            <Button
              key={size}
              className="border-2 border-my-primary w-full text-center bg-transparent rounded-none text-lg font-urbanist font-urbanist-italic-semibold text-my-primary shadow-none"
            >
              <motion.div
                className="absolute bottom-0 left-0 w-full bg-my-primary origin-bottom"
                initial={{ height: 0 }}
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

              <motion.p
                className="absolute inset-0 flex justify-center items-center text-xl font-semibold font-urbanist font-urbanist-italic-semibold capitalize"
                variants={{
                  hover: {
                    y: 0,
                    color: "#FFFFFF",
                    transition: { type: "spring", stiffness: 100, damping: 12 },
                  },
                }}
              >
                {size}
              </motion.p>
            </Button>
          </motion.span>
        ))}

        {/* Close Button */}
        <motion.span
          whileHover="hover"
          variants={hoverAnimation}
          className="block w-[30%] relative"
        >
          <Button
            className=" w-full text-center bg-transparent rounded-none text-lg font-urbanist font-urbanist-italic-semibold text-my-primary shadow-none"
            onClick={onClose}
          >
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-my-primary origin-bottom"
              initial={{ height: 0 }}
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
            <motion.p
              className="absolute inset-0 flex justify-center items-center text-xl font-semibold font-urbanist font-urbanist-italic-semibold capitalize"
              variants={{
                hover: {
                  y: 0,
                  color: "#FFFFFF",
                  transition: { type: "spring", stiffness: 100, damping: 12 },
                },
              }}
            >
              Close
            </motion.p>
          </Button>
        </motion.span>
      </div>
    </motion.section>
  );
}
