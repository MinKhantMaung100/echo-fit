"use client";

import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import Liner from "@/public/svg/liner.svg";
import DisplayPoster from "@/public/webp/one.png";
import HeroImage from "@/public/webp/hero-image.webp";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ShoeDisplayShelf from "@/components/ui/shoe-display-shelf";
import { AnimatedLoadingSequence } from "@/components/ui/shoe-display-shelf";

export default function Home() {
  const containerRef = useRef(null);

  return (
    <section className="flex flex-col h-screen">
      {/* 3d Model here */}
      <div className="relative w-full min-h-[60%]" ref={containerRef}>
        <ShoeDisplayShelf />
      </div>

      {/* Shoe Preview */}
      <section></section>

      {/* Content */}
      <div className="bg-ambe-100 w-full min-h-[40%] py-8 px-16 flex flex-col justify-between">
        {/* Main Area */}
        <div className="flex items-center">
          <div className="w-[60%]">
            <h1 className="text-4xl font-urbanist font-urbanist-italic-semibold leading-12 text-my-primary b-red-300 w-fit flex flex-col gap-0">
              <span>Try-View-Buy</span>
              <span>Experience Shoes in 3D</span>
            </h1>
            <p className="text-xl pt-2 text-my-primary">
              Step into the Future with EcoFit's Virtual
              <br />
              Shoe Experience.
            </p>
          </div>

          <div className="w-[40%] bg-aber-200 overflow-hidden flex justify-end items-center b-amber-200">
            <Image
              src={HeroImage}
              alt="hero-image.webp"
              className="w-[16rem]"
            />
          </div>
        </div>

        {/* Footer */}
        <div>
          <Image src={Liner} alt="footer-liner-svg" className="w-[14rem]" />
        </div>
      </div>
    </section>
  );
}
