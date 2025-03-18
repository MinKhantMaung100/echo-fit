import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useShoeStore from "@/store/useShoeStore";
import Link from "next/link";

interface QuickShowProps {
  shoeId: string;
  onClose: () => void;
}

const QuickShow = ({ shoeId, onClose }: QuickShowProps) => {
  const { shoes, isLoading, getShoes } = useShoeStore();

  const selectedShoe = shoes.find((shoe) => shoe.id === shoeId);

  useEffect(() => {
    console.log("Loading shoes...");
    getShoes(); // Load shoes when component mounts
  }, []);

  if (isLoading) return <div>Loading shoes...</div>;

  return (
    <motion.section
      className="bg-white w-[22%] h-[90%] ml-auto mr-10 mt-6 relative z-20"
      initial={{ x: 200, opacity: 0 }} // start off-screen right
      animate={{ x: 0, opacity: 1 }} // slide to center
      exit={{ x: 200, opacity: 0 }} // exit to right (optional)
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="w-full h-1/2 bg-[#ECF4F6] relative">
        <img
          src={selectedShoe?.smallImage}
          alt="shoe"
          className="w-40 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-0 bounce-top"
        />
      </div>
      <div className="w-full h-1/2 flex flex-col gap-4 justify-between p-4">
        <h3 className="font-urbanist font-urbanist-italic-semibold text-lg">
          {selectedShoe?.name}
        </h3>

        {/* Description vs primary */}
        <div className="flex flex-col h-full justify-between">
          {/* Image vs Review */}
          <div className="flex">
            <p className="text-sm">
              A state of extreme happiness or elation. It describes feeling so
              joyful and blissful that you're...
            </p>
            {/* <div className="">
              <Image className="w-10" src={Star} alt="review-star" />
              <Image src={Star} alt="review-star" />
              <Image src={Star} alt="review-star" />
              <Image src={Star} alt="review-star" />
              <Image src={Star} alt="review-star" />
            </div> */}
          </div>

          <div className="flex justify-between items-center">
            {/* Primary Use */}
            <div className="flex flex-col">
              <span className="text-base font-medium font-urbanist  font-urbanist-italic-medium">
                Primary Use
              </span>
              <span className="text-xs text-[#999999] font-dm-sans font-dm-sans-regular">
                Road Running, Casual Wear
              </span>
            </div>

            {/* View Details */}
            <div>
              <Link href={"/product-details/" + shoeId}>
                <motion.button
                  className="text-sm font-urbanist font-urbanist-italic-semibold text-[#246F9E] cursor-pointer"
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
                  View Details
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.5 }}
        className="bg-[#ECF4F6] w-6 h-6 rounded-full absolute -bottom-2.5 -right-5 -translate-x-1/2 flex justify-center items-center cursor-pointer"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
    </motion.section>
  );
};

export default QuickShow;
