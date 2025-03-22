"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { ControlType } from "@/types/control-type";

type ProductControlProps = {
  title: ControlType;
  shoeId?: string;
  onOpen: (control: ControlType) => void;
  style?: object;
  selectedSize: number;
};

const ProductControl = ({
  title,
  onOpen,
  style,
  selectedSize,
}: ProductControlProps) => {
  //   const [openControl, setOpenControl] = useState<ControlType>(null);

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
    <motion.button
      className="relative w-full h-[6rem] bg-white text-my-primary border-[1.5px] border-my-primary overflow-hidden cursor-pointer"
      whileHover="hover"
      variants={hoverAnimation}
      onClick={() => onOpen(title)}
      style={style}
    >
      {/* Fill animation background */}
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
        className="absolute bottom-4 left-4 z-10 text-xl font-semibold font-urbanist font-urbanist-italic-semibold capitalize"
        variants={{
          hover: {
            y: -20,
            x: 10,
            color: "#FFFFFF",
            transition: { type: "spring", stiffness: 100, damping: 12 },
          },
        }}
      >
        {selectedSize > 0 ? (
          <span className="flex flex-col text-left">
            <label className="text-sm">Size</label>
            <span className="text-2xl">{selectedSize}</span>
            <span className="block w-4 h-4 absolute bg-my-primary -top-7"></span>
          </span>
        ) : (
          title
        )}
      </motion.p>
    </motion.button>
  );
};

export default ProductControl;
