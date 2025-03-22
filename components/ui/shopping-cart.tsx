import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
// import ShoeOne from "@/public/shoe-1.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

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

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const itemsPerSlide = 5;

interface ShoppingCartProps {
  onClose: () => void;
}

const ShoppingCart = ({ onClose }: ShoppingCartProps) => {
  const items = useCartStore((state) => state.items);
  const { addItem, decreaseItem, removeItem, getTotalPrice, getTotal } =
    useCartStore();

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [index, setIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCart = () => {
    setOpenCart(!openCart);
  };

  const handleNext = () => {
    if (containerRef.current) {
      setIndex((prev) => prev + itemsPerSlide);
      //   containerRef.current.scrollTo({
      //     left: "100%",
      //     behavior: "smooth",
      //   });
      console.log("clicked");
    }
  };

  const handleIncrease = (item) => {
    addItem(item);
  };

  const handleDecrease = (id) => {
    decreaseItem(id);
  };

  const handleRemove = (id) => {
    removeItem(id);
  };

  return (
    <>
      <motion.section
        initial={{ height: 0 }}
        animate={{ height: "43%" }}
        exit={{ opacity: 0, height: 0, transition: { duration: 0.4 } }}
        transition={{ type: "spring" }}
        className="absolute bg-white w-full h-full bottom-0 z-50 shadow-lg text-my-primary py-8 px-16"
      >
        <div className="flex h-full">
          {/* Shoe Name, Price, & Add to Cart */}
          <div className="w-[70%] flex flex-col gap-4">
            <div className="b-red-500 flex justify-between items-center">
              <h1 className="text-3xl font-urbanist font-urbanist-italic-semibold leading-12 text-my-primary">
                Shopping Cart
              </h1>

              {/* Next/Prev */}
              <div className="flex gap-2">
                {/* <- */}
                <motion.button whileHover={{ x: 4, y: -20, scale: 1.6 }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="size-6 stroke-my-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </motion.button>
                {/* -> */}
                <motion.button
                  className="group rounded-full overflow-hidden flex flex-col justify-center items-center"
                  onClick={handleNext}
                  whileHover={{ x: -10, y: -20, scale: 1.6 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Container Slide */}
            <div
              className="b-yellow-300 overflow-auto scroll-smooth w-full"
              ref={containerRef}
            >
              {/* Slider Slide */}
              <motion.div
                animate={{
                  x: -index * (128 + 40),
                }}
                className="flex gap-10"
                ref={sliderRef}
              >
                {/* Cart Shoe */}
                {items.length > 0 ? (
                  items.map((item) => (
                    <span
                      ref={sliderRef}
                      className="flex flex-col shrink-0"
                      key={item}
                    >
                      <div className="relative">
                        <h1 className="absolute font-dm-sans font-dm-sans-italic-bold text-[4rem] bottom-0 left-2 h-fit text-gray-300">
                          {item?.quantity}
                        </h1>
                        <img
                          src={`${item?.image}`}
                          alt="shoes"
                          className="w-32 relative z-32 scale-x-[-1]"
                        />
                      </div>

                      <div className="flex flex-col font-dm-sans font-dm-sans-italic-medium text-center text-sm">
                        <h3>{item?.name}</h3>
                        <label>Size - {item?.size} UK</label>
                        <label>${item.price}</label>
                        <span className="flex justify-center gap-1">
                          {/* Decrease */}
                          <motion.button
                            className="relative cursor-pointer"
                            whileHover={{ scale: 1.6 }}
                            onClick={() => handleDecrease(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="#164055"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </motion.button>

                          {/* Increase */}
                          <motion.button
                            className="relative cursor-pointer"
                            whileHover={{ scale: 1.6 }}
                            onClick={() => handleIncrease(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="#164055"
                              className="size-6 relative z-20 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </motion.button>
                        </span>

                        {/* Remove */}
                        <motion.button
                          className="hover:bg-transparent shadow-none rounded-none flex justify-center w-fit m-auto cursor-pointer"
                          whileHover={{ scale: 0.8 }}
                          onClick={() => handleRemove(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#0E2B38"
                            className="size-4 opacity-50"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </span>
                  ))
                ) : (
                  <p className="font-urbanist font-urbanist-italic-semibold">
                    There is no item in the cart.
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          <div className="w-[30%] flex flex-col py-4 px-10 justify-between">
            <h1 className="text-3xl font-urbanist font-urbanist-italic-semibold ">
              Order Summary
            </h1>
            <span>{getTotal()} Items</span>

            <div className="flex justify-between">
              <label className="text-lg">Order Total</label>
              <span className="font-dm-sans-bold tex-lg">
                ${getTotalPrice()}
              </span>
            </div>

            <motion.div className="flex flex-col justify-center items-center gap-4 cursor-pointe">
              <motion.div
                whileHover="hover"
                variants={hoverAnimation}
                className="w-full relative"
              >
                <Link href="/checkout">
                  <Button className="w-full rounded-none font-urbanist font-urbanist-italic-semibold text-lg hover:bg-transparent shadow-none  p-6 cursor-pointer bg-transparent">
                    <motion.div
                      className="absolute bottom-0 left-0 w-full origin-bottom"
                      initial={{ height: "100%", backgroundColor: "#164055" }}
                      variants={{
                        hover: {
                          height: "0%",
                          transition: {
                            duration: 0.5,
                            ease: [0.33, 1, 0.68, 1], // Custom easing for smoother feel
                          },
                        },
                      }}
                    />
                    <motion.p
                      className="absolute inset-0 flex justify-center items-center text-lg font-semibold font-urbanist font-urbanist-italic-semibold"
                      variants={{
                        hover: {
                          y: 0,
                          color: "#164055",
                          transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 12,
                          },
                        },
                      }}
                    >
                      Check Out Now
                    </motion.p>
                  </Button>
                </Link>
              </motion.div>

              <motion.button
                className="font-urbanist font-urbanist-italic-semibold text-[#246F9E] text-lg cursor-pointer"
                onClick={onClose}
                initial={{ opacity: 0.3 }}
                whileHover={{
                  opacity: 1,
                  y: 0,
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
        </div>
      </motion.section>
    </>
  );
};

export default ShoppingCart;
