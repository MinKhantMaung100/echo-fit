import React from "react";
import { motion } from "framer-motion";

interface CheckoutModalProps {
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
  buttonName: string;
}

const CheckoutModal = ({
  onSave,
  onClose,
  children,
  buttonName,
}: CheckoutModalProps) => {
  console.log(onClose);
  return (
    <motion.section
      initial={{ height: 0 }}
      animate={{ height: "90%" }}
      exit={{ height: "0%", opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
        bounce: 0.4,
      }}
      className="absolute w-full h-[90%] z-40 bg-white bottom-0 left-0 flex justify-center items-center overflow-hidden border-2 "
    >
      <div className="w-1/2 flex flex-col gap-3 ">
        {children}
        {/* Buttons */}
        <motion.div className="flex flex-col gap-3 w-[60%] m-auto mt-2 overflow-hidden">
          {buttonName !== "none" ? (
            <motion.button
              whileHover="hover"
              className="relative capitalize py-4 overflow-hidden w-full"
              onClick={onSave}
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
                {buttonName}
              </motion.span>
            </motion.button>
          ) : null}

          <motion.button
            className="font-urbanist font-urbanist-italic-bold text-[#246F9E] text-lg uppercase"
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
            onClick={onClose}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CheckoutModal;
