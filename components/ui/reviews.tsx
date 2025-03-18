import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// import Star from "@/public/star.svg";
import { Button } from "@/components/ui/button";
import Star from "@/public/svg/star.svg";

interface Review {
  userName: string;
  title: string;
  comment: string;
  image: string | null;
}

interface ReviewsProps {
  shoeName: string;
  reviews?: Review[];
  onClose: () => void;
}

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

const Reviews = ({ shoeName, reviews, onClose }: ReviewsProps) => {
  return (
    <motion.section
      initial={{ height: 0 }}
      animate={{ height: "90%" }}
      exit={{ height: 0 }}
      transition={{ type: "spring" }}
      className="absolute bg-white w-full bottom-0 z-50 shadow-lg text-my-primary"
    >
      <div className="flex h-full">
        {/* Image */}
        <div className="w-[60%]">
          {/* <Image
            src={DummyShoe}
            alt="shoe-image"
            className="w-full h-full"
            style={{ objectFit: "contain" }}
          /> */}
        </div>

        {/* Reviews */}
        <div className="w-[40%] flex flex-col justify-between p-8 relative">
          {/* Username, Comments, Stars */}
          <h1 className="font-urbanist font-urbanist-italic-semibold text-3xl">
            {shoeName}
          </h1>

          <div className="relative b-slate-600 flex flex-col gap-6 h-[80%]">
            {/* User Comments */}
            {/* <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-40 "></div> */}

            <div className="absolute bottom-2 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none z-40 flex flex-col gap-10 b-blue-400"></div>

            <div className="h-[98%] overflow-auto">
              {reviews?.map((review, index) => (
                <div className="w-full flex" key={index}>
                  <span className="flex flex-col w-[80%]">
                    <h3 className="text-xl font-urbanist font-urbanist-italic-bold">
                      {review.title}
                    </h3>
                    <p className="text-md">{review.comment}</p>
                    <p className="flex gap-4 font-urbanist font-urbanist-italic-medium opacity-50 mt-2 text-sm">
                      <span>{review.userName}</span>
                      <span>15-02-2025</span>
                    </p>
                  </span>
                  <span className="w-[20%] flex flex-col gap-1 justify-center items-center">
                    <Image src={Star} alt="review-star" />
                    <Image src={Star} alt="review-star" />
                    <Image src={Star} alt="review-star" />
                    <Image src={Star} alt="review-star" />
                    <Image src={Star} alt="review-star" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Go Back Button */}
          <motion.div
            whileHover="hover"
            variants={hoverAnimation}
            className="block relative"
            onClick={onClose}
          >
            <Button className="w-full m-auto mb-1 py-6 rounded-none font-urbanist font-urbanist-italic-semibold text-lg hover:bg-transparent shadow-none bg-transparent">
              <motion.div
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
              <motion.p
                className="absolute inset-0 flex justify-center items-center text-xl font-semibold font-urbanist font-urbanist-italic-semibold capitalize"
                variants={{
                  hover: {
                    y: 0,
                    color: "#0E2B38",
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    },
                  },
                }}
              >
                GO BACK
              </motion.p>
            </Button>
          </motion.div>

          {/* Close Button */}
          <span
            className="absolute bg-transparent shadow-none right-4 top-[-16px] hover:bg-transparent cursor-pointer"
            onClick={onClose}
          >
            <motion.svg
              whileHover={{ scale: 1.6 }}
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M46 23C46 35.7025 35.7025 46 23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0C35.7025 0 46 10.2975 46 23Z"
                fill="#EEEEEE"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.2327 18.2317C18.4465 18.0178 18.7933 18.0178 19.0071 18.2317L23.0008 22.2254L26.9946 18.2317C27.2084 18.0178 27.5552 18.0178 27.769 18.2317C27.9829 18.4455 27.9829 18.7923 27.769 19.0061L23.7753 22.9999L27.769 26.9936C27.9829 27.2074 27.9829 27.5542 27.769 27.768C27.5552 27.9819 27.2084 27.9819 26.9946 27.768L23.0008 23.7743L19.0071 27.768C18.7933 27.9819 18.4465 27.9819 18.2327 27.768C18.0188 27.5542 18.0188 27.2074 18.2327 26.9936L22.2264 22.9999L18.2327 19.0061C18.0188 18.7923 18.0188 18.4455 18.2327 18.2317Z"
                fill="black"
              />
            </motion.svg>
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default Reviews;
